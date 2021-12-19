package locations

import (
	"domain-server/internal/logger"
	"domain-server/internal/repositories/locations"
	"domain-server/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handlers interface {
	GetLocationsList(c *gin.Context)
	UpdateLocations(c *gin.Context)
}

type locationsHandlers struct {
	repository locations.Repository
	services   *services.Services
	logger     logger.Log
}

func New(repository locations.Repository, services *services.Services, logger logger.Log) Handlers {
	return &locationsHandlers{
		repository: repository,
		services:   services,
		logger:     logger,
	}
}

func (ch *locationsHandlers) GetLocationsList(c *gin.Context) {

}

func (ch *locationsHandlers) UpdateLocations(c *gin.Context) {
	locations, err := ch.services.Portal.GetAllCitiesLocations()
	if err != nil {
		ch.logger.GetInstance().Errorf("error getting locations from portal %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"payload": "error updating locations"})
	}

	if errn := ch.repository.UpdateLocations(locations); errn != nil {
		ch.logger.GetInstance().Errorf("error updating locations  %s", errn)
		c.JSON(http.StatusInternalServerError, gin.H{"payload": "error updating locations"})
	}
	c.JSON(http.StatusOK, gin.H{"payload": "locations successfully updated"})
}
