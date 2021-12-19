package settings

import (
	"domain-server/internal/logger"
	"domain-server/internal/models"
	"domain-server/internal/repositories/settings"
	"domain-server/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/globalsign/mgo/bson"
)

type Handlers interface {
	AddSettings(c *gin.Context)
	UpdateSettings(c *gin.Context)
	DeleteSettings(c *gin.Context)
	GetDomainsSettings(c *gin.Context)
}

type settingsHandlers struct {
	repository settings.Repository
	services   *services.Services
	logger     logger.Log
}

func New(repository settings.Repository, services *services.Services, logger logger.Log) Handlers {
	return &settingsHandlers{
		repository: repository,
		services:   services,
		logger:     logger,
	}
}

func (s *settingsHandlers) AddSettings(c *gin.Context) {
	settings := models.Settings{}
	err := c.BindJSON(&settings)
	if err != nil {
		s.logger.GetInstance().Errorf("error unmarshaling incoming json %s", err)
		c.JSON(http.StatusBadRequest, err)
		return
	}

	settingsRes, err := s.repository.AddSettings(settings)
	if err != nil {
		s.logger.GetInstance().Errorf("error adding settings to db %s", err)
		c.JSON(http.StatusBadRequest, err)
		return
	}
	c.JSON(http.StatusOK, settingsRes)
}

type updateSettingsInput struct {
	ID             string        `json:"id"`
	CityID         string        `bson:"city_id" json:"city_id" binding:"required"`
	Background     string        `bson:"background" json:"background"`
	MainColor      string        `bson:"main_color" json:"main_color"`
	SecondaryColor string        `bson:"secondary_color" json:"secondary_color"`
	Yandex         string        `bson:"yandex" json:"yandex"`
	Google         string        `bson:"google" json:"google"`
	Mail           string        `bson:"mail" json:"mail"`
	Roistat        string        `bson:"roistat" json:"roistat"`
	Marquiz        string        `bson:"marquiz" json:"marquiz"`
	Steps          []models.Step `bson:"steps"`
	OrganizationID string        `bson:"organization_id" json:"organization_id"`
}

func (s *settingsHandlers) UpdateSettings(c *gin.Context) {
	input := updateSettingsInput{}
	err := c.BindJSON(&input)
	if err != nil {
		s.logger.GetInstance().Errorf("error unmarshaling incoming json %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}

	errN := s.repository.UpdateSettings(models.Settings{
		ID:             bson.ObjectIdHex(input.ID),
		CityID:         input.CityID,
		Background:     input.Background,
		MainColor:      input.MainColor,
		SecondaryColor: input.SecondaryColor,
		Yandex:         input.Yandex,
		Google:         input.Google,
		Mail:           input.Mail,
		Roistat:        input.Roistat,
		Marquiz:        input.Marquiz,
		Steps:          input.Steps,
		OrganizationID: input.OrganizationID,
	})
	if errN != nil {
		s.logger.GetInstance().Errorf("error updating settings %s", errN)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"payload": "success"})

}

func (s *settingsHandlers) DeleteSettings(c *gin.Context) {
	input := c.Param("id")
	errN := s.repository.DeleteSettings(input)
	if errN != nil {
		s.logger.GetInstance().Errorf("error deleting settings %s", errN)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"payload": "success"})
}

func (s *settingsHandlers) GetDomainsSettings(c *gin.Context) {
	input := c.Param("id")
	settings, err := s.repository.GetSettingsById(input)
	if err != nil {
		s.logger.GetInstance().Errorf("error getting settings %s", err)
		c.JSON(http.StatusBadRequest, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, settings)
}
