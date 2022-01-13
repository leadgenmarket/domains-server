package locations

import (
	"domain-server/internal/logger"
	"domain-server/internal/repositories/cities"
	"domain-server/internal/repositories/jk"
	"domain-server/internal/repositories/locations"
	"domain-server/internal/repositories/prices"
	"domain-server/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handlers interface {
	GetLocationsList(c *gin.Context)
	GetRaionsOfTheCity(c *gin.Context)
	UpdatePortalInfo(c *gin.Context)
}

type locationsHandlers struct {
	repository       locations.Repository
	repositoryCities cities.Repository
	repositoryPrices prices.Repository
	repositoryJK     jk.Repository
	services         *services.Services
	logger           logger.Log
}

func New(repository locations.Repository, repositoryCities cities.Repository, repositoryPrices prices.Repository, repositoryJK jk.Repository, services *services.Services, logger logger.Log) Handlers {
	return &locationsHandlers{
		repository:       repository,
		repositoryCities: repositoryCities,
		repositoryPrices: repositoryPrices,
		repositoryJK:     repositoryJK,
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

func (ch *locationsHandlers) UpdatePortalInfo(c *gin.Context) {
	RayonUpdatePrices(ch.services, ch.repositoryPrices, ch.repositoryCities, ch.logger)
	JKsUpdate(ch.services, ch.repositoryJK, ch.repositoryCities, ch.logger)
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

func JKsUpdate(services *services.Services, repository jk.Repository, repoCity cities.Repository, logger logger.Log) {
	repository.DropDB()
	citiesList, err := repoCity.GetAllCities()
	if err != nil {
		logger.GetInstance().Errorf("error getting jks from portal %s", err)
		return
	}
	jkList, err := services.Portal.GetJkListAlt(citiesList)
	if err != nil {
		logger.GetInstance().Errorf("error getting jks from portal %s", err)
		return
	}
	for _, jk := range jkList {
		jkS, err := repository.GetJKByPortalId(jk.Portal_ID)
		if err == nil {
			//если жк уже есть в базе, то обновляем его
			jk.ID = jkS.ID
			err := repository.UpdateJK(jk)
			if err != nil {
				logger.GetInstance().Errorf("error updating jk jks %s", err)
				return
			}
		} else {
			//если нету в базу, то добавляем
			err := repository.AddJK(jk)
			if err != nil {
				logger.GetInstance().Errorf("error adding jks %s", err)
				return
			}
		}
	}
}
