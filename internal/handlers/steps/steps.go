package steps

import (
	"domain-server/internal/logger"
	"domain-server/internal/models"
	"domain-server/internal/repositories/steps"
	"domain-server/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/globalsign/mgo/bson"
)

type Handlers interface {
	AddStep(c *gin.Context)
	UpdateSteps(c *gin.Context)
	DeleteStep(c *gin.Context)
	GetDomainsStep(c *gin.Context)
}

type stepsHandlers struct {
	repository steps.Repository
	services   *services.Services
	logger     logger.Log
}

func New(repository steps.Repository, services *services.Services, logger logger.Log) Handlers {
	return &stepsHandlers{
		repository: repository,
		services:   services,
		logger:     logger,
	}
}

func (s *stepsHandlers) AddStep(c *gin.Context) {
	steps := models.Step{}
	err := c.BindJSON(&steps)
	if err != nil {
		s.logger.GetInstance().Errorf("error unmarshaling incoming json %s", err)
		c.JSON(http.StatusBadRequest, err)
		return
	}

	stepsRes, err := s.repository.AddStep(steps)
	if err != nil {
		s.logger.GetInstance().Errorf("error adding steps to db %s", err)
		c.JSON(http.StatusBadRequest, err)
		return
	}
	c.JSON(http.StatusOK, stepsRes)
}

type updateStepsInput struct {
	ID           string          `json:"id"`
	DomainID     string          `bson:"domain_id"`
	Question     string          `bson:"question"`
	SendQuestion string          `bson:"send_question"`
	Type         string          `bson:"type"`
	Order        int             `bson:"order"`
	Answers      []models.Answer `bson:"answers"`
}

func (s *stepsHandlers) UpdateSteps(c *gin.Context) {
	input := updateStepsInput{}
	err := c.BindJSON(&input)
	if err != nil {
		s.logger.GetInstance().Errorf("error unmarshaling incoming json %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}

	errN := s.repository.UpdateStep(models.Step{
		ID:           bson.ObjectIdHex(input.ID),
		DomainID:     input.DomainID,
		Question:     input.Question,
		SendQuestion: input.SendQuestion,
		Type:         input.Type,
		Order:        input.Order,
		Answers:      input.Answers,
	})
	if errN != nil {
		s.logger.GetInstance().Errorf("error updating steps %s", errN)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"payload": "success"})

}

func (s *stepsHandlers) DeleteStep(c *gin.Context) {
	input := c.Param("id")
	errN := s.repository.DeleteStep(input)
	if errN != nil {
		s.logger.GetInstance().Errorf("error deleting steps %s", errN)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"payload": "success"})
}

func (s *stepsHandlers) GetDomainsStep(c *gin.Context) {
	input := c.Param("id")
	steps, err := s.repository.GetDomainSteps(input)
	if err != nil {
		s.logger.GetInstance().Errorf("error getting steps %s", err)
		c.JSON(http.StatusBadRequest, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, steps)
}
