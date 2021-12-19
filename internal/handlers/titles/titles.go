package titles

import (
	"domain-server/internal/logger"
	"domain-server/internal/models"
	"domain-server/internal/repositories/titles"
	"domain-server/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/globalsign/mgo/bson"
)

type Handlers interface {
	AddTitle(c *gin.Context)
	UpdateTitles(c *gin.Context)
	DeleteTitle(c *gin.Context)
	GetTitlesList(c *gin.Context)
}

type titlesHandlers struct {
	repository titles.Repository
	services   *services.Services
	logger     logger.Log
}

func New(repository titles.Repository, services *services.Services, logger logger.Log) Handlers {
	return &titlesHandlers{
		repository: repository,
		services:   services,
		logger:     logger,
	}
}

func (s *titlesHandlers) AddTitle(c *gin.Context) {
	titles := models.Title{}
	err := c.BindJSON(&titles)
	if err != nil {
		s.logger.GetInstance().Errorf("error unmarshaling incoming json %s", err)
		c.JSON(http.StatusBadRequest, err)
		return
	}

	titlesRes, err := s.repository.AddTitle(titles)
	if err != nil {
		s.logger.GetInstance().Errorf("error adding titles to db %s", err)
		c.JSON(http.StatusBadRequest, err)
		return
	}
	c.JSON(http.StatusOK, titlesRes)
}

type updateTitlesInput struct {
	ID    string `json:"id"`
	Title string `bson:"title"`
}

func (s *titlesHandlers) UpdateTitles(c *gin.Context) {
	input := updateTitlesInput{}
	err := c.BindJSON(&input)
	if err != nil {
		s.logger.GetInstance().Errorf("error unmarshaling incoming json %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}

	errN := s.repository.UpdateTitle(models.Title{
		ID:    bson.ObjectIdHex(input.ID),
		Title: input.Title,
	})
	if errN != nil {
		s.logger.GetInstance().Errorf("error updating titles %s", errN)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"payload": "success"})

}

func (s *titlesHandlers) DeleteTitle(c *gin.Context) {
	input := c.Param("id")
	errN := s.repository.DeleteTitle(input)
	if errN != nil {
		s.logger.GetInstance().Errorf("error deleting titles %s", errN)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"payload": "success"})
}

func (s *titlesHandlers) GetTitlesList(c *gin.Context) {
	titles, err := s.repository.GetTitlesList()
	if err != nil {
		s.logger.GetInstance().Errorf("error getting titles %s", err)
		c.JSON(http.StatusBadRequest, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, titles)
}
