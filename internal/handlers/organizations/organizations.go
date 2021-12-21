package organizations

import (
	"domain-server/internal/logger"
	"domain-server/internal/models"
	organization "domain-server/internal/repositories/organizations"
	"domain-server/internal/services"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/globalsign/mgo/bson"
)

type Handlers interface {
	AddOrganization(c *gin.Context)
	UpdateOrganizations(c *gin.Context)
	DeleteOrganization(c *gin.Context)
	GetOrganization(c *gin.Context)
	GetOrganizations(c *gin.Context)
}

type organizationHandlers struct {
	repository organization.Repository
	services   *services.Services
	logger     logger.Log
}

func New(repository organization.Repository, services *services.Services, logger logger.Log) Handlers {
	return &organizationHandlers{
		repository: repository,
		services:   services,
		logger:     logger,
	}
}

func (s *organizationHandlers) AddOrganization(c *gin.Context) {
	organization := models.Organization{}
	err := c.BindJSON(&organization)
	if err != nil {
		s.logger.GetInstance().Errorf("error unmarshaling incoming json %s", err)
		c.JSON(http.StatusBadRequest, err)
		return
	}

	organizationRes, err := s.repository.AddOrganization(organization)
	if err != nil {
		s.logger.GetInstance().Errorf("error adding organization to db %s", err)
		c.JSON(http.StatusBadRequest, err)
		return
	}
	c.JSON(http.StatusOK, organizationRes)
}

type updateOrganizationsInput struct {
	ID      string `json:"id"`
	Name    string `bson:"name"`
	Address string `bson:"address"`
}

func (s *organizationHandlers) UpdateOrganizations(c *gin.Context) {
	input := updateOrganizationsInput{}
	err := c.BindJSON(&input)
	if err != nil {
		s.logger.GetInstance().Errorf("error unmarshaling incoming json %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}

	errN := s.repository.UpdateOrganization(models.Organization{
		ID:      bson.ObjectIdHex(input.ID),
		Name:    input.Name,
		Address: input.Address,
	})
	if errN != nil {
		s.logger.GetInstance().Errorf("error updating organization %s", errN)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"payload": "success"})

}

func (s *organizationHandlers) DeleteOrganization(c *gin.Context) {
	input := c.Param("id")
	errN := s.repository.DeleteOrganization(input)
	if errN != nil {
		s.logger.GetInstance().Errorf("error deleting organization %s", errN)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"payload": "success"})
}

func (s *organizationHandlers) GetOrganization(c *gin.Context) {
	input := c.Param("id")
	organization, err := s.repository.GetOrganizationById(input)
	if err != nil {
		s.logger.GetInstance().Errorf("error getting organization %s", err)
		c.JSON(http.StatusBadRequest, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, organization)
}

func (s *organizationHandlers) GetOrganizations(c *gin.Context) {
	organizations, err := s.repository.GetOrganizations()
	fmt.Println(organizations)
	if err != nil {
		s.logger.GetInstance().Errorf("error getting organizations list %s", err)
		c.JSON(http.StatusBadRequest, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, organizations)
}
