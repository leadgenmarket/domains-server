package template_prices

import (
	"context"
	"domain-server/internal/models"
	"domain-server/internal/repositories"
	"domain-server/internal/services/storage"
	"domain-server/internal/system/database/redis"
	"time"

	"github.com/globalsign/mgo/bson"
)

const REDIS_KEY = "template_prices_list"
const REDIS_KEY_PREF = "tmpl_price_"

type Service interface {
	AddTemplatePricesList(templatePrices []models.TemplatePrice) (err error)
	GetTemplatePrices() ([]models.TemplatePrice, error)
	UpdateTemplatePricesList(templatePrices []models.TemplatePrice) (err error)
	GetTemplatePriceByCityID(id string) (price models.TemplatePrice, err error)
}

type service struct {
	repository    repositories.Repositories
	commonStorage storage.Common
}

func NewService(repository repositories.Repositories, redis redis.Repository) Service {
	return &service{
		repository:    repository,
		commonStorage: storage.NewCommonStorage(redis),
	}
}

func (s *service) AddTemplatePricesList(templatePrices []models.TemplatePrice) (err error) {
	for _, templatemplatePrice := range templatePrices {
		err = s.repository.TemplatePrices.AddTemplatePrice(templatemplatePrice)
		if err != nil {
			return
		}
	}
	return
}

func (s *service) GetTemplatePrices() (pricesList []models.TemplatePrice, err error) {
	err = s.commonStorage.Get(context.Background(), REDIS_KEY, &pricesList)
	if err == nil {
		return
	}
	pricesList, err = s.repository.TemplatePrices.GetTemplatePrices()
	if err != nil {
		return
	}
	s.commonStorage.Set(context.Background(), REDIS_KEY, pricesList, time.Hour*72)
	return
}

func (s *service) UpdateTemplatePricesList(templatePrices []models.TemplatePrice) (err error) {
	s.commonStorage.DeleteKey(context.Background(), REDIS_KEY)
	for _, templatemplatePrice := range templatePrices {
		err = s.repository.TemplatePrices.UpdateTemplatePrice(templatemplatePrice)
		if err != nil {
			return
		}
	}
	return
}

func (s *service) GetTemplatePriceByCityID(id string) (price models.TemplatePrice, err error) {
	err = s.commonStorage.Get(context.Background(), REDIS_KEY_PREF+id, &price)
	if err == nil {
		return
	}
	priceID := bson.ObjectIdHex(id)
	price, err = s.repository.TemplatePrices.GetTemplatePriceByCityID(priceID)
	return
}
