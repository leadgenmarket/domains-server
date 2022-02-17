package domains

import (
	"domain-server/internal/config"
	"domain-server/internal/logger"
	"domain-server/internal/models"
	"domain-server/internal/repositories/cities"
	"domain-server/internal/repositories/domains"
	"domain-server/internal/repositories/locations"
	organization "domain-server/internal/repositories/organizations"
	"domain-server/internal/repositories/prices"
	templates "domain-server/internal/repositories/template"
	"domain-server/internal/repositories/titles"
	"domain-server/internal/services"
	"domain-server/internal/utils"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
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
	DomainsModerationChange(c *gin.Context)
	DomainsGetCityByUrl(c *gin.Context)
	CopyDomain(c *gin.Context)
}

type domainsHandlers struct {
	repository        domains.Repository
	repoLoc           locations.Repository
	cityRepo          cities.Repository
	pricesRepo        prices.Repository
	titlesRepo        titles.Repository
	templatesRepo     templates.Repository
	organizationsRepo organization.Repository
	services          *services.Services
	logger            logger.Log
	cfg               *config.Config
}

func New(repository domains.Repository, repoLoc locations.Repository, cityRepo cities.Repository, pricesRepo prices.Repository, titlesRepo titles.Repository, templatesRepo templates.Repository, organizationsRepo organization.Repository, services *services.Services, logger logger.Log, cfg *config.Config) Handlers {
	return &domainsHandlers{
		repository:        repository,
		repoLoc:           repoLoc,
		cityRepo:          cityRepo,
		pricesRepo:        pricesRepo,
		titlesRepo:        titlesRepo,
		templatesRepo:     templatesRepo,
		organizationsRepo: organizationsRepo,
		logger:            logger,
		services:          services,
		cfg:               cfg,
	}
}

type DomainSettings struct {
	Facebook     string `json:"facebook"`
	Yandex       string `json:"yandex"`
	Google       string `json:"google"`
	Mail         string `json:"mail"`
	Marquiz      string `json:"marquiz"`
	Qoopler      bool   `json:"qoopler"`
	Roistat      bool   `json:"roistat" form:"roistat"`
	TemplateHTML string `json:"template_html" form:"template_html"`
	//
	SubTitleItems   string                   `bson:"sub_title_items" json:"sub_title_items"`
	PhoneStepTitle  string                   `bson:"phone_step_title" json:"phone_step_title"`
	FooterTitle     string                   `bson:"footer_title" json:"footer_title"`
	Phone           string                   `bson:"phone" json:"phone"`
	AdvantagesTitle string                   `bson:"advantages_title" form:"advantages_title"`
	Advantages      []map[string]interface{} `bson:"advantages" form:"advantages"`
	PhotosTitle     string                   `bson:"photos_title" form:"photos_title"`
	Photos          map[string]string        `bson:"photos" form:"photos"`
	PlansTitle      string                   `bson:"plans_title" form:"plans_title"`
	Plans           []map[string]interface{} `bson:"plans" form:"plans"`
	ScriptTmpl      TamplateSettings         `json:"scripts"`
}

type TamplateSettings struct {
	IP             string                 `json:"ip"`
	Domain         models.Domain          `json:"domain"`
	City           models.City            `json:"city"`
	Location       []models.Location      `json:"locations"`
	Prices         map[string]interface{} `json:"prices"`
	Title          string                 `json:"title"`
	SubTitle       string                 `json:"sub_title"`
	Rayon          string                 `json:"rayon"`
	MainColor      string                 `json:"main_color"`
	SecondaryColor string                 `json:"secondary_color"`
	Organization   models.Organization    `json:"organization"`
}

func (dh *domainsHandlers) GetTemplate(c *gin.Context) {
	domainSettings := DomainSettings{}
	result := map[string]interface{}{}
	domainName := strings.Split(c.Request.Host, ":")[0]
	if domainName == dh.cfg.AdminUrl {
		handleAdminInterface(c, c.Request.URL.Path)
		return
	}
	err := dh.services.CommonStorage.Get(c, domainName, &domainSettings)
	needToCache := true
	if err == nil {
		needToCache = false
	} else {
		domain, err := dh.repository.FindDomainByUrl(domainName)
		if err != nil {
			dh.logger.GetInstance().Errorf("error unmarshaling incoming json %s", err)
			c.JSON(http.StatusBadRequest, err)
			return
		}
		domainSettings.ScriptTmpl.City, err = dh.cityRepo.GetCityById(domain.CityID)
		if err != nil {
			dh.logger.GetInstance().Errorf("error getting city %s", err)
			c.JSON(http.StatusBadRequest, err)
			return
		}

		if domain.Moderation {
			domainSettings.Yandex = domain.Yandex
			settings := convertForTemplate(domainSettings)
			pickModerationTemplate(c, domainSettings.ScriptTmpl.City.Name, settings)
			return
		}

		domainSettings.ScriptTmpl.Domain = domain
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

		domainSettings.ScriptTmpl.Location, err = dh.repoLoc.GetRaionsOfTheCity(domain.CityID.Hex())
		if err != nil {
			dh.logger.GetInstance().Errorf("error getting locations of the city %s", err)
			c.JSON(http.StatusBadRequest, err)
			return
		}

		domainSettings.ScriptTmpl.Prices, err = dh.pricesRepo.GetPricesOfTheCity(domain.CityID)
		if err != nil {
			dh.logger.GetInstance().Errorf("error getting city %s", err)
			c.JSON(http.StatusBadRequest, err)
			return
		}
		domainSettings.ScriptTmpl.MainColor = domain.MainColor
		domainSettings.ScriptTmpl.SecondaryColor = domain.SecondaryColor
		domainSettings.Yandex = domain.Yandex
		domainSettings.Google = domain.Google
		domainSettings.Mail = domain.Mail
		domainSettings.Marquiz = domain.Marquiz
		domainSettings.Facebook = domain.Facebook
		domainSettings.Qoopler = domain.Qoopler
		domainSettings.Roistat = domain.Roistat
		domainSettings.ScriptTmpl.SubTitle = domain.SubTitle
		domainSettings.SubTitleItems = domain.SubTitleItems
		domainSettings.PhoneStepTitle = domain.PhoneStepTitle
		domainSettings.FooterTitle = domain.FooterTitle
		domainSettings.Phone = domain.Phone
		domainSettings.AdvantagesTitle = domain.AdvantagesTitle
		domainSettings.Advantages = domain.Advantages
		domainSettings.PhotosTitle = domain.PhotosTitle
		domainSettings.Photos = domain.Photos
		domainSettings.PlansTitle = domain.PlansTitle
		domainSettings.Plans = domain.Plans

		if domain.OrganizationID != "" {
			organization, err := dh.organizationsRepo.GetOrganizationById(domain.OrganizationID.Hex())
			if err == nil {
				domainSettings.ScriptTmpl.Organization = organization
			}
		}
		template, _ := dh.templatesRepo.FindTemplateByID(domain.TemplateID.Hex())
		domainSettings.TemplateHTML = template.Path
	}

	//если бот, то включаем ему шаблон
	userAgent := strings.ToLower(c.Request.Header.Get("User-Agent"))

	if strings.Contains(userAgent, "yandex.com/bots") {
		settings := convertForTemplate(domainSettings)
		pickModerationTemplate(c, domainSettings.ScriptTmpl.City.Name, settings)
		return
	}

	domainSettings.ScriptTmpl.IP = c.ClientIP()
	domainSettings.ScriptTmpl.Rayon = c.Param("rayon")
	k := c.Request.URL.Query().Get("k")
	var title string
	if k != "" || domainSettings.ScriptTmpl.Rayon != "" {
		if err := dh.services.CommonStorage.Get(c, fmt.Sprintf("%s_%s_%s", domainSettings.ScriptTmpl.Domain.CityID, domainSettings.ScriptTmpl.Rayon, k), &title); err != nil {
			title, err = dh.titlesRepo.GetTitleForDomain(domainSettings.ScriptTmpl.Domain.CityID, domainSettings.ScriptTmpl.Rayon, k)
			if err != nil {
				dh.logger.GetInstance().Errorf("error getting title for domain %s", err)
			}
			dh.services.CommonStorage.Set(c, fmt.Sprintf("%s_%s_%s", domainSettings.ScriptTmpl.Domain.CityID, domainSettings.ScriptTmpl.Rayon, k), title, time.Minute*1440)
		}
	}
	domainSettings.ScriptTmpl.Title = title

	if needToCache {
		errC := dh.services.CommonStorage.Set(c, domainName, domainSettings, dh.cfg.CacheDuration)
		if errC != nil {
			dh.logger.GetInstance().Errorf("error saving cache %s", errC)
		}
	}
	settings := convertForTemplate(domainSettings)
	if domainName == "dominator-test.leadactiv.ru" {
		//тестовая площадка
		c.HTML(http.StatusOK, "test.html", settings)
	}

	c.HTML(http.StatusOK, domainSettings.TemplateHTML, settings)
}

func convertForTemplate(domainSettings DomainSettings) map[string]interface{} {
	settings := map[string]interface{}{}
	settings["yandex"] = domainSettings.Yandex
	settings["facebook"] = domainSettings.Facebook
	settings["google"] = domainSettings.Google
	settings["mail"] = domainSettings.Mail
	settings["marquiz"] = domainSettings.Marquiz
	settings["qoopler"] = domainSettings.Qoopler
	settings["roistat"] = domainSettings.Roistat
	settings["main_color"] = domainSettings.ScriptTmpl.MainColor
	settings["secondary_color"] = domainSettings.ScriptTmpl.SecondaryColor
	settings["scripts"] = utils.ScriptForTemplate(domainSettings.ScriptTmpl)

	return settings
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
	input := models.PaginationListInput{}
	err := c.BindJSON(&input)
	fmt.Println(input)
	if err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}

	domains, cursor, err := dh.repository.GetDomainsListWithPaginationAndFiltered(input.Search, input.Cursor, input.ItemsCnt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"domains": domains,
		"cursor":  cursor,
	})
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

func (dh *domainsHandlers) DeleteDomain(c *gin.Context) {
	ID := c.Param("id")
	errN := dh.repository.DeleteDomainById(ID)
	if errN != nil {
		dh.logger.GetInstance().Errorf("error deleting domain %s", errN)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"payload": "success"})
}

func (dh *domainsHandlers) FindDomainByID(c *gin.Context) {
	id := c.Param("id")
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
	SubTitle       string `form:"sub_title"`
	CityID         string `form:"city_id"`
	OrganizationID string `form:"organization_id"`
	MainColor      string `form:"main_color"`
	SecondaryColor string `form:"secondary_color"`
	Yandex         string `bson:"yandex" form:"yandex"`
	Google         string `bson:"google" form:"google"`
	Mail           string `bson:"mail" form:"mail"`
	Facebook       string `bson:"facebook" form:"facebook"`
	Marquiz        string `bson:"marquiz" form:"marquiz"`
	Qoopler        bool   `bson:"qoopler" form:"qoopler"`
	Roistat        bool   `bson:"roistat" form:"roistat"`
	Steps          string `bson:"steps" form:"steps"`

	//
	SubTitleItems   string `bson:"sub_title_items" form:"sub_title_items"`
	Phone           string `bson:"phone" form:"phone"`
	PhoneStepTitle  string `bson:"phone_step_title" form:"phone_step_title"`
	FooterTitle     string `bson:"footer_title" form:"footer_title"`
	AdvantagesTitle string `bson:"advantages_title" form:"advantages_title"`
	Advantages      string `bson:"advantages" form:"advantages"`
	PhotosTitle     string `bson:"photos_title" form:"photos_title"`
	Photos          string `bson:"photos" form:"photos"`
	PlansTitle      string `bson:"plans_title" form:"plans_title"`
	Plans           string `bson:"plans" form:"plans"`
}

func (dh *domainsHandlers) AddDomainWithSettings(c *gin.Context) {
	domainInput := DomainInput{}
	if err := c.ShouldBind(&domainInput); err != nil {
		dh.logger.GetInstance().Errorf("error binding json %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	fmt.Println(domainInput)
	form, err := c.MultipartForm()
	if err != nil {
		dh.logger.GetInstance().Errorf("error getting background image %s", err)
		return
	}
	files := form.File["file"]
	fileName := ""
	if len(files) > 0 {
		fileName, err = dh.services.MultipartImages.ResizeAndSaveMultipartImage(files[0], 1280, 0)
		if err != nil {
			dh.logger.GetInstance().Errorf("error saving background image %s", err)
			return
		}
	}
	domain := models.Domain{
		Url:             domainInput.URL,
		TemplateID:      bson.ObjectIdHex(domainInput.TemplateID),
		CityID:          bson.ObjectIdHex(domainInput.CityID),
		OrganizationID:  bson.ObjectIdHex(domainInput.OrganizationID),
		MainColor:       domainInput.MainColor,
		SecondaryColor:  domainInput.SecondaryColor,
		Yandex:          domainInput.Yandex,
		Google:          domainInput.Google,
		Mail:            domainInput.Mail,
		Facebook:        domainInput.Facebook,
		Marquiz:         domainInput.Marquiz,
		Qoopler:         domainInput.Qoopler,
		Roistat:         domainInput.Roistat,
		SubTitle:        domainInput.SubTitle,
		SubTitleItems:   domainInput.SubTitleItems,
		PhoneStepTitle:  domainInput.PhoneStepTitle,
		FooterTitle:     domainInput.FooterTitle,
		Phone:           domainInput.Phone,
		AdvantagesTitle: domainInput.AdvantagesTitle,
		PhotosTitle:     domainInput.PhotosTitle,
		PlansTitle:      domainInput.PlansTitle,
	}

	//Advantages - надо сопоставить json и конвертированные файлы
	//photos - просто сохранить список файлов []string
	//plans - надо сопоставить

	//advantages_photos[]
	//plan_photos[]
	//photos[]

	if domainInput.Advantages != "" {
		advantages := []map[string]interface{}{}
		err := json.Unmarshal([]byte(domainInput.Advantages), &advantages)
		if err != nil {
			dh.logger.GetInstance().Errorf("error unmarshaling steps json %s", err)
			c.JSON(http.StatusBadRequest, err)
			return
		}
		advantagesFiles, err := dh.services.MultipartImages.ResizeAndSaveMultipartImagesList(form.File["advantages_photos[]"], 115, 115)
		if err != nil {
			dh.logger.GetInstance().Errorf("error saving advantages image %s", err)
			return
		}
		for _, advantage := range advantages {
			for oldName, newName := range advantagesFiles {
				if advantage["image"] == oldName {
					advantage["image"] = newName
					break
				}
			}

		}
		domain.Advantages = advantages
	}

	if domainInput.Plans != "" {
		plans := []map[string]interface{}{}
		err := json.Unmarshal([]byte(domainInput.Plans), &plans)
		if err != nil {
			dh.logger.GetInstance().Errorf("error unmarshaling steps json %s", err)
			c.JSON(http.StatusBadRequest, err)
			return
		}
		plansFiles, err := dh.services.MultipartImages.ResizeAndSaveMultipartImagesList(form.File["plan_photos[]"], 500, 0)
		if err != nil {
			dh.logger.GetInstance().Errorf("error saving plans images %s", err)
			return
		}
		for _, plan := range plans {
			for oldName, newName := range plansFiles {
				if plan["image"] == oldName {
					plan["image"] = newName
					break
				}
			}

		}
		domain.Plans = plans
	}

	if photosInput := form.File["photos[]"]; len(photosInput) > 0 {
		photosMinFiles, err := dh.services.MultipartImages.ResizeAndSaveMultipartImagesList(form.File["photos[]"], 441, 294)
		if err != nil {
			dh.logger.GetInstance().Errorf("error creating thumbinals for images %s", err)
			return
		}
		photosMaxFiles, err := dh.services.MultipartImages.ResizeAndSaveMultipartImagesList(form.File["photos[]"], 1280, 0)
		if err != nil {
			dh.logger.GetInstance().Errorf("error creating big images %s", err)
			return
		}
		resultPhotos := map[string]string{}
		for oldThumbName, newThumbName := range photosMinFiles {
			for oldBigName, newBigName := range photosMaxFiles {
				if oldThumbName == oldBigName {
					resultPhotos[newThumbName] = newBigName
					break
				}
			}
		}
		domain.Photos = resultPhotos
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
	dh.services.CommonStorage.DeleteKey(c, domain.Url)
	c.JSON(http.StatusOK, gin.H{"message": "added/updated domain, restarting server"})
	dh.logger.GetInstance().Info("added new domain, restarting server")
	go func() {
		time.Sleep(2 * time.Second)
		os.Exit(1) //докер контейнер перезгарузитcя и новый домен попадет в whitelist
	}()

}

type moderationInput struct {
	ID         string `json:"id" form:"id"`
	Moderation bool   `json:"moderation"`
}

func (dh *domainsHandlers) DomainsModerationChange(c *gin.Context) {
	moderationInput := moderationInput{}
	if err := c.ShouldBind(&moderationInput); err != nil {
		dh.logger.GetInstance().Errorf("error binding json %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": err})
		return
	}
	url, err := dh.repository.UpdateDomainsModeration(moderationInput.ID, moderationInput.Moderation)
	if err != nil {
		dh.logger.GetInstance().Errorf("error updating domains moderation %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": err})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "domains modeartion updated"})
	dh.services.CommonStorage.DeleteKey(c, url) //удаляем кэш
}

func (dh *domainsHandlers) DomainsGetCityByUrl(c *gin.Context) {
	//для wantresult нужно
	url := c.Param("url")

	domain, err := dh.repository.FindDomainByUrl(url)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	city, err := dh.cityRepo.GetCityById(domain.CityID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"city": city.PortalID})
}

type CpDomainInput struct {
	ID     string `json:"id" form:"id"`
	URL    string `json:"url"`
	Yandex string `json:"yandex"`
}

func (dh *domainsHandlers) CopyDomain(c *gin.Context) {
	domainInput := CpDomainInput{}
	if err := c.ShouldBind(&domainInput); err != nil {
		dh.logger.GetInstance().Errorf("error binding json %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error binding json"})
		return
	}
	domain, err := dh.repository.CopyDomain(domainInput.ID, domainInput.URL, domainInput.Yandex)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error copying domain"})
		return
	}
	c.JSON(http.StatusOK, domain)
	go func() {
		time.Sleep(2 * time.Second)
		os.Exit(1) //докер контейнер перезгарузитcя и новый домен попадет в whitelist
	}()
}

func handleAdminInterface(c *gin.Context, path string) {
	if fileExists(path) {
		c.File(path)
		return
	}
	settings := map[string]interface{}{}
	c.HTML(http.StatusOK, "index.html", settings)
}

func fileExists(filename string) bool {
	info, err := os.Stat(filename)
	if os.IsNotExist(err) {
		return false
	}
	return !info.IsDir()
}

func pickModerationTemplate(c *gin.Context, cityName string, settings map[string]interface{}) {
	switch cityName {
	case "Москва":
		c.HTML(http.StatusOK, "moderation_1.html", settings)
	case "Санкт-Петербург":
		c.HTML(http.StatusOK, "spb.html", settings)
	case "Краснодар":
		c.HTML(http.StatusOK, "krd.html", settings)
	default:
		c.HTML(http.StatusOK, "moderation_2.html", settings)
	}
}
