package templates

import (
	"domain-server/internal/models"

	mongodb "github.com/globalsign/mgo"
)

type Repository interface {
	GetTamplatesList() ([]models.Template, error)
}

type repositroyDB struct {
	domains *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	return &repositroyDB{
		domains: dbClient.C("templates"),
	}
}

func (r *repositroyDB) GetTamplatesList() ([]models.Template, error) {
	return nil, nil
}
