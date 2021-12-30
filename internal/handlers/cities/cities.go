package cities

import (
	"domain-server/internal/logger"
	"domain-server/internal/repositories/cities"
	"domain-server/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handlers interface {
	GetCitiesList(c *gin.Context)
}

type citiesHandlers struct {
	repository cities.Repository
	services   *services.Services
	logger     logger.Log
}

func New(repository cities.Repository, services *services.Services, logger logger.Log) Handlers {
	return &citiesHandlers{
		repository: repository,
		services:   services,
		logger:     logger,
	}
}

func (ch *citiesHandlers) GetCitiesList(c *gin.Context) {
	cities, err := ch.repository.GetAllCities()
	if err != nil {
		ch.logger.GetInstance().Errorf("error getting cities from portal %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"payload": "error updating cities"})
	}
	c.JSON(http.StatusOK, cities)
}
