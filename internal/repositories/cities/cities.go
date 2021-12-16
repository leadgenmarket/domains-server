package cities

import (
	"domain-server/internal/models"

	mongodb "github.com/globalsign/mgo"
)

type Repository interface {
	GetAllCities() (_ []models.City, err error)
}

type repositroyDB struct {
	dbClient *mongodb.Session
}

func New(dbClient *mongodb.Session) Repository {
	return &repositroyDB{
		dbClient: dbClient,
	}
}

func (r *repositroyDB) GetAllCities() (_ []models.City, err error) {
	return nil, nil
}
