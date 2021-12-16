package steps

import (
	"domain-server/internal/models"

	mongodb "github.com/globalsign/mgo"
)

type Repository interface {
	AddStep() (models.Step, error)
	GetSteps() ([]models.Step, error)
}

type repositroyDB struct {
	dbClient *mongodb.Session
}

func New(dbClient *mongodb.Session) Repository {
	return &repositroyDB{
		dbClient: dbClient,
	}
}

func (r *repositroyDB) AddStep() (models.Step, error) {
	return models.Step{}, nil
}

func (r *repositroyDB) GetSteps() ([]models.Step, error) {
	return nil, nil
}
