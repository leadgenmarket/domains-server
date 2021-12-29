package domains

import (
	"domain-server/internal/logger"
	"domain-server/internal/models"
	"domain-server/internal/repositories/cities"
	"domain-server/internal/repositories/domains"
	"domain-server/internal/repositories/locations"
	"domain-server/internal/repositories/prices"
	"domain-server/internal/repositories/titles"
	"domain-server/internal/services"
	"domain-server/internal/utils"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/globalsign/mgo/bson"
)

type Handlers interface {
	GetTemplate(c *gin.Context)
	CreateDomain(c *gin.Context)
	GetDomainsList(c *gin.Context)
	UpdateDomain(c *gin.Context)
	DeleteDomain(c *gin.Context)
	FindDomainByID(c *gin.Context)
	AddDomainWithSettings(c *gin.Context)
}

type domainsHandlers struct {
	repository domains.Repository
	repoLoc    locations.Repository
	cityRepo   cities.Repository
	pricesRepo prices.Repository
	titlesRepo titles.Repository
	services   *services.Services
	logger     logger.Log
}

func New(repository domains.Repository, repoLoc locations.Repository, cityRepo cities.Repository, pricesRepo prices.Repository, titlesRepo titles.Repository, services *services.Services, logger logger.Log) Handlers {
	return &domainsHandlers{
		repository: repository,
		repoLoc:    repoLoc,
		cityRepo:   cityRepo,
		pricesRepo: pricesRepo,
		titlesRepo: titlesRepo,
		logger:     logger,
		services:   services,
	}
}

func (dh *domainsHandlers) GetTemplate(c *gin.Context) {
	result := map[string]interface{}{}
	domainName := strings.Split(c.Request.Host, ":")[0]
	domain, err := dh.repository.FindDomainByUrl(domainName)
	if err != nil {
		dh.logger.GetInstance().Errorf("error unmarshaling incoming json %s", err)
		c.JSON(http.StatusBadRequest, err)
		return
	}

	result["domain"] = domain
	for _, step := range domain.Steps {
		if step["type"] == "raions" {
			locations, err := dh.repoLoc.GetRaionsOfTheCity(domain.CityID.Hex())
			if err != nil {
				dh.logger.GetInstance().Errorf("error getting locations %s", err)
				c.JSON(http.StatusBadRequest, err)
				return
			}
			result["locations"] = locations
			break
		}
	}
	result["city"], err = dh.cityRepo.GetCityById(domain.CityID)
	if err != nil {
		dh.logger.GetInstance().Errorf("error getting city %s", err)
		c.JSON(http.StatusBadRequest, err)
		return
	}

	result["prices"], err = dh.pricesRepo.GetPricesOfTheCity(domain.CityID)
	if err != nil {
		dh.logger.GetInstance().Errorf("error getting city %s", err)
		c.JSON(http.StatusBadRequest, err)
		return
	}

	result["ip"] = c.ClientIP()

	rayon := c.Param("rayon")
	k := c.Request.URL.Query().Get("k")
	title, err := dh.titlesRepo.GetTitleForDomain(domain.CityID, rayon, k)
	if err != nil {
		dh.logger.GetInstance().Errorf("error getting title for domain %s", err)
	}

	result["title"] = title
	if rayon != "" {
		result["rayon"] = rayon
	}

	settings := gin.H{
		"scripts": utils.ScriptForTemplate(result),
	}

	if domain.Yandex != "" {
		settings["yandex"] = domain.Yandex
	}

	if domain.Google != "" {
		settings["google"] = domain.Google
	}

	if domain.Mail != "" {
		settings["mail"] = domain.Mail
	}

	if domain.Marquiz != "" {
		settings["marquiz"] = domain.Marquiz
	}

	c.HTML(http.StatusOK, "blue_template.html", settings)

	//c.JSON(http.StatusOK, result)
}

func (dh *domainsHandlers) CreateDomain(c *gin.Context) {
	domain := models.Domain{}
	err := c.BindJSON(&domain)
	if err != nil {
		dh.logger.GetInstance().Errorf("error unmarshaling incoming json %s", err)
		c.JSON(http.StatusBadRequest, err)
		return
	}
	domainRes, err := dh.repository.AddDomain(domain)
	if err != nil {
		dh.logger.GetInstance().Errorf("error adding domain to db %s", err)
		c.JSON(http.StatusBadRequest, err)
		return
	}
	c.JSON(http.StatusOK, domainRes)
}

func (dh *domainsHandlers) GetDomainsList(c *gin.Context) {
	domains, err := dh.repository.GetAllDomains()
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
		return
	}
	c.JSON(http.StatusOK, domains)
}

type updateDomainInput struct {
	ID         string `json:"id"`
	Url        string `json:"url"`
	TemplateID string `json:"template_id"`
	SettingsID string `json:"settings_id"`
}

func (dh *domainsHandlers) UpdateDomain(c *gin.Context) {
	domainIn := updateDomainInput{}
	err := c.BindJSON(&domainIn)
	if err != nil {
		dh.logger.GetInstance().Errorf("error unmarshaling incoming json %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}

	errN := dh.repository.UpdateDomain(models.Domain{
		ID:        bson.ObjectIdHex(domainIn.ID),
		Url:       domainIn.Url,
		UpdatedAt: time.Now(),
	})

	if errN != nil {
		dh.logger.GetInstance().Errorf("error updating domain %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"payload": "success"})
}

type deleteDomainInput struct {
	ID string `json:"id"`
}

func (dh *domainsHandlers) DeleteDomain(c *gin.Context) {
	domainIn := deleteDomainInput{}
	err := c.BindJSON(&domainIn)
	if err != nil {
		dh.logger.GetInstance().Errorf("error unmarshaling incoming json %s", err)
		return
	}
	errN := dh.repository.DeleteDomainById(domainIn.ID)
	if errN != nil {
		dh.logger.GetInstance().Errorf("error deleting domain %s", errN)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"payload": "success"})
}

func (dh *domainsHandlers) FindDomainByID(c *gin.Context) {
	id := c.Param("id")
	fmt.Println(id)
	domain, err := dh.repository.FindDomainByID(id)
	if err != nil {
		dh.logger.GetInstance().Errorf("requesting domain not found %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, domain)
}

type DomainInput struct {
	ID             string `form:"id"`
	URL            string `form:"url"`
	TemplateID     string `form:"template_id"`
	CityID         string `form:"city_id"`
	OrganizationID string `form:"organization_id"`
	MainColor      string `form:"main_color"`
	SecondaryColor string `form:"secondary_color"`
	Yandex         string `bson:"yandex" form:"yandex"`
	Google         string `bson:"google" form:"google"`
	Mail           string `bson:"mail" form:"mail"`
	Roistat        string `bson:"roistat" form:"roistat"`
	Marquiz        string `bson:"marquiz" form:"marquiz"`
	Qoopler        bool   `bson:"qoopler" form:"qoopler"`
	Steps          string `bson:"steps" form:"steps"`
}

func (dh *domainsHandlers) AddDomainWithSettings(c *gin.Context) {
	domainInput := DomainInput{}
	if err := c.ShouldBind(&domainInput); err != nil {
		dh.logger.GetInstance().Errorf("error binding json %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	form, err := c.MultipartForm()
	if err != nil {
		dh.logger.GetInstance().Errorf("error getting background image %s", err)
	}
	files := form.File["file"]
	fileName := ""
	for _, file := range files {
		fileInstance, _ := file.Open()
		fileBytes, _ := ioutil.ReadAll(fileInstance)
		filename, _ := dh.services.FileStore.SaveFileToStore(fileBytes, file.Filename)
		if err != nil {
			dh.logger.GetInstance().Errorf("error saving background image %s", err)
			c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
			return
		}
		fileName = filename
	}
	domain := models.Domain{
		Url:            domainInput.URL,
		TemplateID:     bson.ObjectIdHex(domainInput.TemplateID),
		CityID:         bson.ObjectIdHex(domainInput.CityID),
		OrganizationID: domainInput.OrganizationID,
		MainColor:      domainInput.MainColor,
		SecondaryColor: domainInput.SecondaryColor,
		Yandex:         domainInput.Yandex,
		Google:         domainInput.Google,
		Mail:           domainInput.Mail,
		Roistat:        domainInput.Roistat,
		Marquiz:        domainInput.Marquiz,
		Qoopler:        domainInput.Qoopler,
	}

	if fileName != "" {
		domain.Background = fileName
	}

	if domainInput.Steps != "" {
		steps := []map[string]interface{}{}
		err := json.Unmarshal([]byte(domainInput.Steps), &steps)
		if err != nil {
			dh.logger.GetInstance().Errorf("error unmarshaling steps json %s", err)
			c.JSON(http.StatusBadRequest, err)
			return
		}
		fmt.Println(steps)
		domain.Steps = steps
	}

	if domainInput.ID != "" {
		domain.ID = bson.ObjectIdHex(domainInput.ID)
		//тут надо оставить CreatedBy старым !!! поменять
		domain.CreatedBy = bson.ObjectIdHex(c.GetString("user_id"))
		err := dh.repository.UpdateDomain(domain)
		dh.logger.GetInstance().Info(domain)
		if err != nil {
			dh.logger.GetInstance().Errorf("error adding domain to db %s", err)
			c.JSON(http.StatusBadRequest, err)
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "updated successfuly"})
	} else {
		domain.ID = bson.NewObjectId()
		domain.CreatedBy = bson.ObjectIdHex(c.GetString("user_id"))
		dh.logger.GetInstance().Info(domain)
		domainRes, err := dh.repository.AddDomain(domain)

		if err != nil {
			dh.logger.GetInstance().Errorf("error adding domain to db %s", err)
			c.JSON(http.StatusBadRequest, err)
			return
		}
		c.JSON(http.StatusOK, domainRes)
	}

}
