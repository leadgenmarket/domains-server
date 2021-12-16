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
	dbClient *mongodb.Session
}

func New(dbClient *mongodb.Session) Repository {
	return &repositroyDB{
		dbClient: dbClient,
	}
}

func (r *repositroyDB) AddTile(title models.Title) (models.Title, error) {
	return models.Title{}, nil
}

func (r *repositroyDB) GetTitlesList() ([]models.Title, error) {
	return nil, nil
}
