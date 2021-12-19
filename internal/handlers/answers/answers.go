package answers

import (
	"domain-server/internal/logger"
	"domain-server/internal/models"
	answer "domain-server/internal/repositories/answers"
	"domain-server/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/globalsign/mgo/bson"
)

type Handlers interface {
	AddAnswer(c *gin.Context)
	UpdateAnswer(c *gin.Context)
	DeleteAnswer(c *gin.Context)
	GetQuestionAnswers(c *gin.Context)
}

type answerHandlers struct {
	repository answer.Repository
	services   *services.Services
	logger     logger.Log
}

func New(repository answer.Repository, services *services.Services, logger logger.Log) Handlers {
	return &answerHandlers{
		repository: repository,
		services:   services,
		logger:     logger,
	}
}

func (s *answerHandlers) AddAnswer(c *gin.Context) {
	answer := models.Answer{}
	err := c.BindJSON(&answer)
	if err != nil {
		s.logger.GetInstance().Errorf("error unmarshaling incoming json %s", err)
		c.JSON(http.StatusBadRequest, err)
		return
	}

	answerRes, err := s.repository.AddAnswer(answer)
	if err != nil {
		s.logger.GetInstance().Errorf("error adding answer to db %s", err)
		c.JSON(http.StatusBadRequest, err)
		return
	}
	c.JSON(http.StatusOK, answerRes)
}

type updateAnswersInput struct {
	ID        string `json:"id"`
	Title     string `bson:"title"`
	SendParam string `bson:"send_param"`
}

func (s *answerHandlers) UpdateAnswer(c *gin.Context) {
	input := updateAnswersInput{}
	err := c.BindJSON(&input)
	if err != nil {
		s.logger.GetInstance().Errorf("error unmarshaling incoming json %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}

	errN := s.repository.UpdateAnswer(models.Answer{
		ID:        bson.ObjectIdHex(input.ID),
		Title:     input.Title,
		SendParam: input.SendParam,
	})
	if errN != nil {
		s.logger.GetInstance().Errorf("error updating answer %s", errN)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"payload": "success"})

}

func (s *answerHandlers) DeleteAnswer(c *gin.Context) {
	input := c.Param("id")
	errN := s.repository.DeleteAnswer(input)
	if errN != nil {
		s.logger.GetInstance().Errorf("error deleting answer %s", errN)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"payload": "success"})
}

func (s *answerHandlers) GetQuestionAnswers(c *gin.Context) {
	input := c.Param("id")
	answer, err := s.repository.GetQuestionAnswers(input)
	if err != nil {
		s.logger.GetInstance().Errorf("error getting answer %s", err)
		c.JSON(http.StatusBadRequest, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, answer)
}
