package prices

import (
	"domain-server/internal/logger"
	"domain-server/internal/repositories/cities"
	"domain-server/internal/repositories/prices"
	"domain-server/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handlers interface {
	UpdatePrices(c *gin.Context)
}

type pricesHandlers struct {
	repository prices.Repository
	repoCity   cities.Repository
	services   *services.Services
	logger     logger.Log
}

func New(repository prices.Repository, repoCity cities.Repository, services *services.Services, logger logger.Log) Handlers {
	return &pricesHandlers{
		repository: repository,
		repoCity:   repoCity,
		services:   services,
		logger:     logger,
	}
}

func (ch *pricesHandlers) UpdatePrices(c *gin.Context) {
	prices, _ := ch.services.Portal.GetCitiesPrices()
	pricesIn := []map[string]interface{}{}
	for _, price := range prices {
		city, _ := ch.repoCity.GetCityByPortalId(price["portal_city_id"].(string))
		price["_id"] = city.ID
		pricesIn = append(pricesIn, price)
	}

	ch.repository.AddPrices(pricesIn)
	c.JSON(http.StatusOK, pricesIn)
}
