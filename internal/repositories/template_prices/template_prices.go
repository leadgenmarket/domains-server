package template_prices

import (
	"domain-server/internal/models"

	mongodb "github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
)

type Repository interface {
	AddTemplatePrice(price models.TemplatePrice) error
	GetTemplatePrices() ([]models.TemplatePrice, error)
	UpdateTemplatePrice(price models.TemplatePrice) error
}

type repositroyDB struct {
	templatePrices *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	return &repositroyDB{
		templatePrices: dbClient.C("template_prices"),
	}
}

func (r *repositroyDB) GetTemplatePrices() ([]models.TemplatePrice, error) {
	templatePrices := []models.TemplatePrice{}
	err := r.templatePrices.Pipe([]bson.M{{"$sort": bson.M{"created_at": -1}}}).All(&templatePrices)
	if err != nil {
		return templatePrices, err
	}
	return templatePrices, nil
}

func (r *repositroyDB) AddTemplatePrice(price models.TemplatePrice) error {
	price.ID = bson.NewObjectId()
	err := r.templatePrices.Insert(&price)
	if err != nil {
		return err
	}
	return nil
}

func (r *repositroyDB) UpdateTemplatePrice(price models.TemplatePrice) error {
	err := r.templatePrices.Update(bson.M{"_id": price.ID}, price)
	if err != nil {
		return err
	}
	return nil
}
