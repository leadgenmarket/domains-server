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
	domains *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	return &repositroyDB{
		domains: dbClient.C("steps"),
	}
}

func (r *repositroyDB) AddStep() (models.Step, error) {
	return models.Step{}, nil
}

func (r *repositroyDB) GetSteps() ([]models.Step, error) {
	return nil, nil
}
