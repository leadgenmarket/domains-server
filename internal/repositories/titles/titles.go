package titles

import (
	"domain-server/internal/models"

	mongodb "github.com/globalsign/mgo"
)

type Repository interface {
	AddTile(title models.Title) (models.Title, error)
	GetTitlesList() ([]models.Title, error)
}

type repositroyDB struct {
	domains *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	return &repositroyDB{
		domains: dbClient.C("titles"),
	}
}

func (r *repositroyDB) AddTile(title models.Title) (models.Title, error) {
	return models.Title{}, nil
}

func (r *repositroyDB) GetTitlesList() ([]models.Title, error) {
	return nil, nil
}
