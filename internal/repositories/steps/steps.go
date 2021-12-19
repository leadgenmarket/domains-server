package steps

import (
	"domain-server/internal/models"

	mongodb "github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
)

type Repository interface {
	AddStep(step models.Step) (models.Step, error)
	GetSteps() ([]models.Step, error)
}

type repositroyDB struct {
	steps *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	return &repositroyDB{
		steps: dbClient.C("steps"),
	}
}

func (r *repositroyDB) AddStep(step models.Step) (models.Step, error) {
	step.ID = bson.NewObjectId()
	err := r.steps.Insert(&step)
	if err != nil {
		return step, err
	}
	return step, nil
}

func (r *repositroyDB) GetDomainSteps(domainID string) ([]models.Step, error) {
	return nil, nil
}
