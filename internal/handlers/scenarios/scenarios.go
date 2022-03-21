package scenarios

import (
	"domain-server/internal/logger"
	"domain-server/internal/models"
	"domain-server/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handlers interface {
	AddScenario(c *gin.Context)
	UpdateScenario(c *gin.Context)
	GetAllScenarios(c *gin.Context)
}

type scenariosHandlers struct {
	services *services.Services
	logger   logger.Log
}

func New(services *services.Services, logger logger.Log) Handlers {
	return &scenariosHandlers{
		services: services,
		logger:   logger,
	}
}

func (s *scenariosHandlers) AddScenario(c *gin.Context) {
	scenario := models.Scenario{}
	err := c.BindJSON(&scenario)
	if err != nil {
		s.logger.GetInstance().Errorf("error unmarshaling incoming json %s", err)
		c.JSON(http.StatusBadRequest, err)
		return
	}

	id, err := s.services.Scenarios.AddScenario(scenario)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error adding scenario"})
	}
	c.JSON(http.StatusOK, id)
}

func (s *scenariosHandlers) UpdateScenario(c *gin.Context) {
	// спрогать тоже
	c.JSON(http.StatusOK, gin.H{"payload": "not implemented yet"})
}

func (s *scenariosHandlers) GetAllScenarios(c *gin.Context) {
	scenariosList, err := s.services.Scenarios.GetAllScenarios()
	if err != nil {
		s.logger.GetInstance().Errorf("error getting scenarios %s", err)
		c.JSON(http.StatusBadRequest, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, scenariosList)
}
