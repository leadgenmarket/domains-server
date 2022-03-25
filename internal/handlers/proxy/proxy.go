package proxy

import (
	"domain-server/internal/logger"
	"domain-server/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handlers interface {
	ProxyRequest(c *gin.Context)
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

type ProxyRequest struct {
	Url  string      `json:"url" binding:"required"`
	Data interface{} `json:"data" binding:"required"`
}

func (s *handlers) ProxyRequest(c *gin.Context) {
	proxyRequest := ProxyRequest{}
	if err := c.ShouldBind(&proxyRequest); err != nil {
		s.logger.GetInstance().Errorf("error binding json %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}

	resp, err := s.services.Proxy.ProxyRequest(proxyRequest.Url, proxyRequest.Data)
	if err != nil {
		s.logger.GetInstance().Errorf("error proxying request %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, resp)
}
