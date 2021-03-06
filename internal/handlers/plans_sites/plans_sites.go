package plans_sites

import (
	"domain-server/internal/logger"
	"domain-server/internal/models"
	"domain-server/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handlers interface {
	AddPlansSite(c *gin.Context)
	UpdatePlansSite(c *gin.Context)
	DeletePlansSite(c *gin.Context)
	GetPlansSites(c *gin.Context)
	GetPlansSiteDetailInfo(c *gin.Context)
}

type handlers struct {
	services *services.Services
	logger   logger.Log
}

func New(services *services.Services, logger logger.Log) Handlers {
	return &handlers{
		services: services,
		logger:   logger,
	}
}

func (s *handlers) AddPlansSite(c *gin.Context) {
	input := models.PlansSiteInput{}
	err := c.BindJSON(&input)
	if err != nil {
		s.logger.GetInstance().Errorf("error unmarshaling incoming json %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	plansSite := models.CreatePlansSiteFromInput(input)
	err = s.services.PlansSite.AddPlansSite(plansSite)
	if err != nil {
		s.logger.GetInstance().Errorf("error adding new plans site %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"payload": "success", "id": plansSite.ID.Hex()})
}

func (s *handlers) UpdatePlansSite(c *gin.Context) {
	input := models.PlansSiteInput{}
	err := c.BindJSON(&input)
	if err != nil {
		s.logger.GetInstance().Errorf("error unmarshaling incoming json %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	plansSite := models.CreatePlansSiteFromInput(input)
	err = s.services.PlansSite.UpdatePlansSite(plansSite)
	if err != nil {
		s.logger.GetInstance().Errorf("error adding new plans site %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"payload": "success"})
}

func (s *handlers) DeletePlansSite(c *gin.Context) {
	id := c.Param("id")
	err := s.services.PlansSite.DeletePlansSite(id)
	if err != nil {
		s.logger.GetInstance().Errorf("error deleting plans site %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"payload": "success"})
}

func (s *handlers) GetPlansSites(c *gin.Context) {
	sites, err := s.services.PlansSite.GetPlansSites()
	if err != nil {
		s.logger.GetInstance().Errorf("error adding new plans site %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, sites)
}

func (s *handlers) GetPlansSiteDetailInfo(c *gin.Context) {
	id := c.Param("id")
	site, plans, err := s.services.PlansSite.GetPlansSiteDetailInfo(id)
	if err != nil {
		s.logger.GetInstance().Errorf("error deleting plans site %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"site":    site,
		"plans":   plans,
		"payload": "success",
	})
}
