package locations

import (
	"domain-server/internal/logger"
	"domain-server/internal/models"
	"domain-server/internal/repositories/cities"
	"domain-server/internal/repositories/locations"
	"domain-server/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handlers interface {
	GetLocationsList(c *gin.Context)
	UpdateLocations(c *gin.Context)
	GetRaionsOfTheCity(c *gin.Context)
}

type locationsHandlers struct {
	repository       locations.Repository
	repositoryCities cities.Repository
	services         *services.Services
	logger           logger.Log
}

func New(repository locations.Repository, repositoryCities cities.Repository, services *services.Services, logger logger.Log) Handlers {
	return &locationsHandlers{
		repository:       repository,
		repositoryCities: repositoryCities,
		services:         services,
		logger:           logger,
	}
}

func (ch *locationsHandlers) GetLocationsList(c *gin.Context) {

}

func (ch *locationsHandlers) UpdateLocations(c *gin.Context) {
	locations, err := ch.services.Portal.GetAllCitiesLocations()
	if err != nil {
		ch.logger.GetInstance().Errorf("error getting locations from portal %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"payload": "error updating locations"})
		return
	}
	cities, err := ch.repositoryCities.GetAllCities()
	if err != nil {
		ch.logger.GetInstance().Errorf("error getting locations from portal %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"payload": "error updating locations"})
		return
	}
	locationsInsert := []models.Location{}
	for _, location := range locations {
		for _, city := range cities {
			if city.PortalID == location.PortalCityID {
				location.CityID = city.ID
				locationsInsert = append(locationsInsert, location)
				break
			}
		}
	}
	if errn := ch.repository.UpdateLocations(locationsInsert); errn != nil {
		ch.logger.GetInstance().Errorf("error updating locations  %s", errn)
		c.JSON(http.StatusInternalServerError, gin.H{"payload": "error updating locations"})
	}
	c.JSON(http.StatusOK, gin.H{"payload": "locations successfully updated"})
}

func (ch *locationsHandlers) GetRaionsOfTheCity(c *gin.Context) {
	id := c.Param("id")

	raions, err := ch.repository.GetRaionsOfTheCity(id)
	if err != nil {
		ch.logger.GetInstance().Errorf("error getting raions of the city %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"payload": "error getting raions of the city"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"payload": raions})
}
