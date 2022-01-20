package leads

import (
	"domain-server/internal/logger"
	"domain-server/internal/models"
	"domain-server/internal/repositories/leads"
	"domain-server/internal/services"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/globalsign/mgo/bson"
)

type Handlers interface {
	AddLead(c *gin.Context)
	UpdateLeads(c *gin.Context)
	DeleteLead(c *gin.Context)
	GetLeadsOfSite(c *gin.Context)
	SendUnsendedLeadsToCrm(c *gin.Context)
	GetLeadsList(c *gin.Context)
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
	leads := map[string]interface{}{}
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
	ID        string `json:"id"`
	Url       string `json:"url"`
	Name      string `json:"name"`
	Phone     string `json:"phone"`
	Text      string `json:"text"`
	UserAgent string `json:"uagent"`
	SendCrm   bool   `json:"sended_crm"`
}

func (s *leadsHandlers) UpdateLeads(c *gin.Context) {
	input := updateLeadsInput{}
	err := c.BindJSON(&input)
	if err != nil {
		s.logger.GetInstance().Errorf("error unmarshaling incoming json %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}

	fmt.Println(input)

	errN := s.repository.UpdateLead(models.Lead{
		ID:    bson.ObjectIdHex(input.ID),
		Url:   input.Url,
		Name:  input.Name,
		Phone: input.Phone,
		Text:  input.Text,
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

func (dh *leadsHandlers) GetLeadsList(c *gin.Context) {
	input := models.PaginationListInput{}
	err := c.BindJSON(&input)
	fmt.Println(input)
	if err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}

	leads, cursor, err := dh.repository.GetLeadsListWithPaginationAndFiltered(input.Search, input.Cursor, input.ItemsCnt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"leads":  leads,
		"cursor": cursor,
	})
}

func (s *leadsHandlers) SendUnsendedLeadsToCrm(c *gin.Context) {
	sendLeads(s.services, s.repository, s.logger)
	c.JSON(http.StatusOK, gin.H{"paylod": "ok"})
}

func sendLeads(services *services.Services, repositories leads.Repository, logger logger.Log) {
	leads, err := repositories.GetUnsendedLeads()
	if err != nil {
		logger.GetInstance().Errorf("error getting leads %s", err)
		return
	}
	for _, lead := range leads {

		if err := services.Portal.SendLeadToCrm(lead); err != nil {
			logger.GetInstance().Errorf("error sending leads %s", err)
			return
		}
		if err := repositories.MarkLeadAsSended(lead); err != nil {
			logger.GetInstance().Errorf("error updating lead %s", err)
			return
		}
	}

}
