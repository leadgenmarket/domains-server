package leads

import (
	"domain-server/internal/logger"
	"domain-server/internal/models"
	"domain-server/internal/repositories/leads"
	"domain-server/internal/services"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/globalsign/mgo/bson"
)

type Handlers interface {
	AddLead(c *gin.Context)
	UpdateLeads(c *gin.Context)
	DeleteLead(c *gin.Context)
	GetLeadsOfSite(c *gin.Context)
}

type leadsHandlers struct {
	repository leads.Repository
	services   *services.Services
	logger     logger.Log
}

func New(repository leads.Repository, services *services.Services, logger logger.Log) Handlers {
	return &leadsHandlers{
		repository: repository,
		services:   services,
		logger:     logger,
	}
}

func (s *leadsHandlers) AddLead(c *gin.Context) {
	leads := models.Lead{}
	err := c.BindJSON(&leads)
	if err != nil {
		s.logger.GetInstance().Errorf("error unmarshaling incoming json %s", err)
		c.JSON(http.StatusBadRequest, err)
		return
	}

	leadsRes, err := s.repository.AddLead(leads)
	if err != nil {
		s.logger.GetInstance().Errorf("error adding leads to db %s", err)
		c.JSON(http.StatusBadRequest, err)
		return
	}
	c.JSON(http.StatusOK, leadsRes)
}

type updateLeadsInput struct {
	ID          string    `json:"id"`
	Url         string    `bson:"url"`
	Name        string    `bson:"name"`
	Phone       string    `bson:"phone"`
	Text        string    `bson:"text"`
	UserAgent   string    `bson:"uagent"`
	SendCrm     bool      `bson:"sended_crm"`
	CrmSendTime time.Time `bson:"crm_send_time"`
	CreatedAt   time.Time `bson:"created_at"`
}

func (s *leadsHandlers) UpdateLeads(c *gin.Context) {
	input := updateLeadsInput{}
	err := c.BindJSON(&input)
	if err != nil {
		s.logger.GetInstance().Errorf("error unmarshaling incoming json %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}

	errN := s.repository.UpdateLead(models.Lead{
		ID:        bson.ObjectIdHex(input.ID),
		Url:       input.Url,
		Name:      input.Name,
		Phone:     input.Phone,
		Text:      input.Text,
		UserAgent: input.UserAgent,
		SendCrm:   input.SendCrm,
	})
	if errN != nil {
		s.logger.GetInstance().Errorf("error updating leads %s", errN)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"payload": "success"})

}

func (s *leadsHandlers) DeleteLead(c *gin.Context) {
	input := c.Param("id")
	errN := s.repository.DeleteLead(input)
	if errN != nil {
		s.logger.GetInstance().Errorf("error deleting leads %s", errN)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"payload": "success"})
}

func (s *leadsHandlers) GetLeadsOfSite(c *gin.Context) {
	input := c.Param("url")
	leads, err := s.repository.GetLeadsOfSite(input)
	if err != nil {
		s.logger.GetInstance().Errorf("error getting leads %s", err)
		c.JSON(http.StatusBadRequest, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, leads)
}