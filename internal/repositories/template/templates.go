package templates

import (
	"domain-server/internal/models"

	mongodb "github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
)

type Repository interface {
	AddTemplate(template models.Template) (models.Template, error)
	GetTemplatesList() ([]models.Template, error)
	UpdateTemplate(template models.Template) error
	DeleteTemplate(id string) error
}

type repositroyDB struct {
	templates *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	return &repositroyDB{
		templates: dbClient.C("templates"),
	}
}

func (r *repositroyDB) AddTemplate(template models.Template) (models.Template, error) {
	template.ID = bson.NewObjectId()
	err := r.templates.Insert(&template)
	if err != nil {
		return template, err
	}
	return template, nil
}

func (r *repositroyDB) UpdateTemplate(template models.Template) error {
	err := r.templates.Find(bson.M{"_id": template}).One(&template)
	if err != nil {
		return err
	}
	return nil
}

func (r *repositroyDB) DeleteTemplate(id string) error {
	err := r.templates.Remove(bson.M{"_id": bson.ObjectIdHex(id)})
	if err != nil {
		return err
	}
	return nil
}

func (r *repositroyDB) GetTemplatesList() ([]models.Template, error) {
	templates := []models.Template{}
	err := r.templates.Find(bson.M{}).All(&templates)
	if err != nil {
		return templates, err
	}
	return templates, nil
}
