package jks

import (
	"domain-server/internal/logger"
	"domain-server/internal/models"
	"domain-server/internal/repositories/jk"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handlers interface {
	GetFilteredJKList(c *gin.Context)
}

type jksHandlers struct {
	repository jk.Repository
	logger     logger.Log
}

func New(repository jk.Repository, logger logger.Log) Handlers {
	return &jksHandlers{
		repository: repository,
		logger:     logger,
	}
}

func (s *jksHandlers) GetFilteredJKList(c *gin.Context) {
	jkFilter := models.JKFilter{}
	err := c.BindJSON(&jkFilter)
	if err != nil {
		s.logger.GetInstance().Errorf("error unmarshaling incoming json %s", err)
		c.JSON(http.StatusBadRequest, err)
		return
	}
	fmt.Println(jkFilter)
	jkList, err := s.repository.GetJKListByParams(jkFilter)
	if err != nil {
		s.logger.GetInstance().Errorf("error getting filtered list %s", err)
		c.JSON(http.StatusInternalServerError, err)
		return
	}
	c.JSON(http.StatusOK, jkList)
}
