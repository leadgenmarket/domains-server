package scenarios

import (
	"domain-server/internal/logger"
	"domain-server/internal/models"
	"domain-server/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/globalsign/mgo/bson"
)

type Handlers interface {
	AddScenario(c *gin.Context)
	UpdateScenario(c *gin.Context)
	GetAllScenarios(c *gin.Context)
	DeleteScenario(c *gin.Context)
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

func (s *scenariosHandlers) DeleteScenario(c *gin.Context) {
	id := c.Param("id")
	err := s.services.Scenarios.DeleteScenario(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error deliting scenario"})
	}
	c.JSON(http.StatusOK, gin.H{"paylod": "success"})
}

type ScenarioInput struct {
	ID                  string   `bson:"_id" json:"id"`
	Name                string   `bson:"name" json:"name"`
	ScriptTemplate      string   `bson:"script_template" json:"script_template"`
	PhonesList          []string `bson:"phones_list" json:"phones_list"`
	SuccessStatus       int      `bson:"success_status" json:"success_status"`
	DiscardStatus       int      `bson:"discard_status" json:"discard_status"`
	CallsFinishedStatus int      `bson:"calls_finished_status" json:"calls_finished_status"`
	AddDay              bool     `bson:"add_day" json:"add_day"`
}

func (s *scenariosHandlers) UpdateScenario(c *gin.Context) {
	scenarioInput := ScenarioInput{}
	err := c.BindJSON(&scenarioInput)
	if err != nil {
		s.logger.GetInstance().Errorf("error unmarshaling incoming json %s", err)
		c.JSON(http.StatusBadRequest, err)
		return
	}
	scenario := models.Scenario{
		ID:                  bson.ObjectIdHex(scenarioInput.ID),
		Name:                scenarioInput.Name,
		ScriptTemplate:      scenarioInput.ScriptTemplate,
		PhonesList:          scenarioInput.PhonesList,
		SuccessStatus:       scenarioInput.SuccessStatus,
		DiscardStatus:       scenarioInput.DiscardStatus,
		CallsFinishedStatus: scenarioInput.CallsFinishedStatus,
		AddDay:              scenarioInput.AddDay,
	}

	err = s.services.Scenarios.UpdateScenario(scenario)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error updating scenario"})
	}
	c.JSON(http.StatusOK, gin.H{"payload": "scenario successfully updated"})
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
