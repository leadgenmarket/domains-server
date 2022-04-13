package template_prices

import (
	"domain-server/internal/logger"
	"domain-server/internal/models"
	"domain-server/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/globalsign/mgo/bson"
)

type Handlers interface {
	GetTemplatesPricesList(c *gin.Context)
	UpdateTemplatePrices(c *gin.Context)
	GetTemplatePriceByCityID(c *gin.Context)
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

func (s *handlers) GetTemplatesPricesList(c *gin.Context) {
	prices, err := s.services.TempltePrices.GetTemplatePrices()
	if err != nil {
		s.logger.GetInstance().Errorf("error adding templates to db %s", err)
		c.JSON(http.StatusBadRequest, err)
		return
	}
	c.JSON(http.StatusOK, prices)
}

type updateTemplatePricesInput struct {
	Prices []TemplatePrice `json:"prices"`
}

type TemplatePrice struct {
	ID       string `bson:"_id" json:"id"`
	CityID   string `bson:"city_id" json:"city_id"`
	MinPrice int    `bson:"min_price" json:"min_price"`
	MaxPrice int    `bson:"max_price" json:"max_price"`
}

func (s *handlers) UpdateTemplatePrices(c *gin.Context) {
	input := updateTemplatePricesInput{}
	err := c.BindJSON(&input)
	if err != nil {
		s.logger.GetInstance().Errorf("error unmarshaling incoming json %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}

	tmpPriceList := []models.TemplatePrice{}
	for _, price := range input.Prices {
		tmpPrice := models.TemplatePrice{
			ID:       bson.ObjectIdHex(price.ID),
			CityID:   bson.ObjectIdHex(price.CityID),
			MinPrice: price.MinPrice,
			MaxPrice: price.MaxPrice,
		}
		tmpPriceList = append(tmpPriceList, tmpPrice)
	}
	err = s.services.TempltePrices.UpdateTemplatePricesList(tmpPriceList)
	if err != nil {
		s.logger.GetInstance().Errorf("error updating template prices %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"payload": "success"})
}

func (s *handlers) GetTemplatePriceByCityID(c *gin.Context) {
	id := c.Param("id")
	price, err := s.services.TempltePrices.GetTemplatePriceByCityID(id)
	if err != nil {
		s.logger.GetInstance().Errorf("error getting template price %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"payload": price})
}
