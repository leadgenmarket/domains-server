package auth

import (
	"domain-server/internal/logger"
	"domain-server/internal/repositories/users"
	"domain-server/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handlers interface {
	SignIn(c *gin.Context)
}

type authHandlers struct {
	repository users.Repository
	services   *services.Services
	logger     logger.Log
}

func New(repository users.Repository, services *services.Services, logger logger.Log) Handlers {
	return &authHandlers{
		repository: repository,
		services:   services,
		logger:     logger,
	}
}

type inputAuth struct {
	Login string `json:"login" binding:"required"`
	Pass  string `json:"pass" binding:""`
}

func (s *authHandlers) SignIn(c *gin.Context) {
	var input inputAuth
	if err := c.BindJSON(&input); err != nil {
		s.logger.GetInstance().Error("bad credetinals")
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"payload": "check request params"})
		return
	}
	user, err := s.repository.CheckUserCredetinals(input.Login, input.Pass)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"payload": "bad users credetinals"})
		return
	}
	token, err := s.services.TokenManager.GenerateToken(user)
	if err != nil {
		s.logger.GetInstance().Error("error generating token")
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"payload": "error"})
		return
	}
	refreshToken, err := s.services.TokenManager.GenerateToken(user)
	if err != nil {
		s.logger.GetInstance().Error("error generating refresh")
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"payload": "error"})
		return
	}
	errC := s.services.Cookie.SetCookies(c, token, refreshToken)
	if errC != nil {
		s.logger.GetInstance().Error("error settting token to cookies")
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"payload": "error"})
		return
	}
	c.JSON(http.StatusOK, user)
}
