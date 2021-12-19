package domains

import (
	"domain-server/internal/logger"
	"domain-server/internal/models"
	"domain-server/internal/repositories/domains"
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
	FindDomainByURL(c *gin.Context)
}

type domainsHandlers struct {
	repository domains.Repository
	logger     logger.Log
}

func New(repository domains.Repository, logger logger.Log) Handlers {
	return &domainsHandlers{
		repository: repository,
		logger:     logger,
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

func (dh *domainsHandlers) FindDomainByURL(c *gin.Context) {
	url := c.Param("url")
	domain, err := dh.repository.FindDomainByUrl(url)
	if err != nil {
		dh.logger.GetInstance().Errorf("requesting domain not found %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, domain)
}
