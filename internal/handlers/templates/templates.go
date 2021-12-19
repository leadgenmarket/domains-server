package templates

import (
	"domain-server/internal/logger"
	"domain-server/internal/models"
	templates "domain-server/internal/repositories/template"
	"domain-server/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/globalsign/mgo/bson"
)

type Handlers interface {
	AddTemplate(c *gin.Context)
	UpdateTemplates(c *gin.Context)
	DeleteTemplate(c *gin.Context)
	GetTemplatesList(c *gin.Context)
}

type templatesHandlers struct {
	repository templates.Repository
	services   *services.Services
	logger     logger.Log
}

func New(repository templates.Repository, services *services.Services, logger logger.Log) Handlers {
	return &templatesHandlers{
		repository: repository,
		services:   services,
		logger:     logger,
	}
}

func (s *templatesHandlers) AddTemplate(c *gin.Context) {
	templates := models.Template{}
	err := c.BindJSON(&templates)
	if err != nil {
		s.logger.GetInstance().Errorf("error unmarshaling incoming json %s", err)
		c.JSON(http.StatusBadRequest, err)
		return
	}

	templatesRes, err := s.repository.AddTemplate(templates)
	if err != nil {
		s.logger.GetInstance().Errorf("error adding templates to db %s", err)
		c.JSON(http.StatusBadRequest, err)
		return
	}
	c.JSON(http.StatusOK, templatesRes)
}

type updateTemplatesInput struct {
	ID   string `json:"id"`
	Name string `bson:"name"`
	Path string `bson:"path"`
}

func (s *templatesHandlers) UpdateTemplates(c *gin.Context) {
	input := updateTemplatesInput{}
	err := c.BindJSON(&input)
	if err != nil {
		s.logger.GetInstance().Errorf("error unmarshaling incoming json %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}

	errN := s.repository.UpdateTemplate(models.Template{
		ID:   bson.ObjectIdHex(input.ID),
		Name: input.Name,
		Path: input.Path,
	})
	if errN != nil {
		s.logger.GetInstance().Errorf("error updating templates %s", errN)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"payload": "success"})

}

func (s *templatesHandlers) DeleteTemplate(c *gin.Context) {
	input := c.Param("id")
	errN := s.repository.DeleteTemplate(input)
	if errN != nil {
		s.logger.GetInstance().Errorf("error deleting templates %s", errN)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"payload": "success"})
}

func (s *templatesHandlers) GetTemplatesList(c *gin.Context) {
	templates, err := s.repository.GetTemplatesList()
	if err != nil {
		s.logger.GetInstance().Errorf("error getting templates %s", err)
		c.JSON(http.StatusBadRequest, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, templates)
}
