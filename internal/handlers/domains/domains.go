package domains

import (
	"domain-server/internal/logger"
	"domain-server/internal/models"
	"domain-server/internal/repositories/domains"
	"domain-server/internal/services"
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
	services   *services.Services
	logger     logger.Log
}

func New(repository domains.Repository, services *services.Services, logger logger.Log) Handlers {
	return &domainsHandlers{
		repository: repository,
		logger:     logger,
		services:   services,
	}
}

func (dh *domainsHandlers) GetTemplate(c *gin.Context) {
	domain := strings.Split(c.Request.Host, ":")[0]
	if domain != "127.0.0.1" {
		c.HTML(http.StatusOK, "aivazovskiy.html", nil)
		return
	} else {
		c.JSON(200, gin.H{
			"host": domain,
		})
	}
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
		domain.ID = bson.ObjectId(domainInput.ID)
		//тут надо оставить CreatedBy старым
	}

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

	// Id
	//CreatedBy:  bson.ObjectId(c.Param("user_id")), ставим - если новая заявка
	//Steps:          json.Unmarshal(domainInput.Steps),
}

/*
{
  "url": "url домена",
  "template_id": "61c1e39931e51cb588d44c56",
  "city_id": "61c20cee31e51ce17385b12a",
  "organization_id": "61c2119e31e51cea5ecd07e6",
  "main_color": "FF00000",
  "secondary_color": "FF00000",
  "yandex": "yandex_id",
  "google": "google_id",
  "mail": "mail_id",
  "roistat": "roistat_id",
  "marquiz": "marquiz_id",
  "qoopler": "y",
  "steps": [
    {
      "title": "Шаг 1",
      "type": "text",
      "answers": [
        "Ответ - 1",
        "Ответ - 2",
        "Ответ - 3",
        "Ответ - 4"
      ]
    },
    {
      "title": "Шаг - 2",
      "type": "text",
      "answers": [
        "Ответ - 1",
        "Ответ - 2",
        "Ответ - 3",
        ""
      ]
    },
    {
      "title": "Slider",
      "type": "slider",
      "answers": [
        ""
      ],
      "from": "100000000",
      "to": "2000000000",
      "step": "10000"
    }
  ]
}

*/
