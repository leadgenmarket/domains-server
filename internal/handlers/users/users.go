package users

import (
	"domain-server/internal/logger"
	"domain-server/internal/models"
	"domain-server/internal/repositories/users"
	"domain-server/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/globalsign/mgo/bson"
)

type Handlers interface {
	AddUser(c *gin.Context)
	UpdateUsers(c *gin.Context)
	DeleteUser(c *gin.Context)
	GetUsersList(c *gin.Context)
}

type usersHandlers struct {
	repository users.Repository
	services   *services.Services
	logger     logger.Log
}

func New(repository users.Repository, services *services.Services, logger logger.Log) Handlers {
	return &usersHandlers{
		repository: repository,
		services:   services,
		logger:     logger,
	}
}

func (s *usersHandlers) AddUser(c *gin.Context) {
	users := models.User{}
	err := c.BindJSON(&users)
	if err != nil {
		s.logger.GetInstance().Errorf("error unmarshaling incoming json %s", err)
		c.JSON(http.StatusBadRequest, err)
		return
	}

	usersRes, err := s.repository.AddUser(users)
	if err != nil {
		s.logger.GetInstance().Errorf("error adding users to db %s", err)
		c.JSON(http.StatusBadRequest, err)
		return
	}
	c.JSON(http.StatusOK, usersRes)
}

type updateUsersInput struct {
	ID    string `json:"id"`
	Name  string `bson:"name"`
	Login string `bson:"login"`
	Pass  string `bson:"pass"`
	Role  string `bson:"role"`
}

func (s *usersHandlers) UpdateUsers(c *gin.Context) {
	input := updateUsersInput{}
	err := c.BindJSON(&input)
	if err != nil {
		s.logger.GetInstance().Errorf("error unmarshaling incoming json %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}

	errN := s.repository.UpdateUser(models.User{
		ID:    bson.ObjectIdHex(input.ID),
		Name:  input.Name,
		Pass:  input.Pass,
		Login: input.Login,
		Role:  input.Role,
	})
	if errN != nil {
		s.logger.GetInstance().Errorf("error updating users %s", errN)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"payload": "success"})

}

func (s *usersHandlers) DeleteUser(c *gin.Context) {
	input := c.Param("id")
	errN := s.repository.DeleteUser(input)
	if errN != nil {
		s.logger.GetInstance().Errorf("error deleting users %s", errN)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"payload": "success"})
}

func (s *usersHandlers) GetUsersList(c *gin.Context) {
	id := c.Param("id")
	users, err := s.repository.GetUserById(id)
	if err != nil {
		s.logger.GetInstance().Errorf("error getting users %s", err)
		c.JSON(http.StatusBadRequest, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, users)
}
