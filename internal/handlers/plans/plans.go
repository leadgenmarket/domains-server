package plans

import (
	"domain-server/internal/logger"
	"domain-server/internal/services"

	"github.com/gin-gonic/gin"
)

type Handlers interface {
	AddPlans(c *gin.Context)
	UpdatePlans(c *gin.Context)
	DeletePlans(c *gin.Context)
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

func (s *handlers) AddPlans(c *gin.Context) {

}

func (s *handlers) UpdatePlans(c *gin.Context) {

}

func (s *handlers) DeletePlans(c *gin.Context) {

}
