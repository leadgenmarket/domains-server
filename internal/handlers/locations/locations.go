package locations

import (
	"domain-server/internal/logger"
	"domain-server/internal/repositories/cities"
	"domain-server/internal/repositories/locations"
	"domain-server/internal/repositories/prices"
	"domain-server/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handlers interface {
	GetLocationsList(c *gin.Context)
	GetRaionsOfTheCity(c *gin.Context)
	UpdatePrices(c *gin.Context)
}

type locationsHandlers struct {
	repository       locations.Repository
	repositoryCities cities.Repository
	repositoryPrices prices.Repository
	services         *services.Services
	logger           logger.Log
}

func New(repository locations.Repository, repositoryCities cities.Repository, repositoryPrices prices.Repository, services *services.Services, logger logger.Log) Handlers {
	return &locationsHandlers{
		repository:       repository,
		repositoryCities: repositoryCities,
		repositoryPrices: repositoryPrices,
		services:         services,
		logger:           logger,
	}
}

func (ch *locationsHandlers) GetLocationsList(c *gin.Context) {
	price, _ := ch.services.Portal.GetCitiesPrices()
	c.JSON(http.StatusOK, price)
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

func (ch *locationsHandlers) UpdatePrices(c *gin.Context) {
	RayonUpdatePrices(ch.services, ch.repositoryPrices, ch.repositoryCities, ch.logger)
}

func RayonUpdatePrices(services *services.Services, repositories prices.Repository, repositoryCities cities.Repository, logger logger.Log) {
	prices, _ := services.Portal.GetCitiesPrices()
	pricesIn := []map[string]interface{}{}
	for _, price := range prices {
		city, _ := repositoryCities.GetCityByPortalId(price["portal_city_id"].(string))
		price["_id"] = city.ID
		pricesIn = append(pricesIn, price)
	}

	repositories.AddPrices(pricesIn)
}
