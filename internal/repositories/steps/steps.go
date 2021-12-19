package steps

import (
	"domain-server/internal/models"

	mongodb "github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
)

type Repository interface {
	AddStep(step models.Step) (models.Step, error)
	GetDomainSteps(domainID string) ([]models.Step, error)
	UpdateStep(step models.Step) error
	DeleteStep(id string) error
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

func (r *repositroyDB) UpdateStep(step models.Step) error {
	err := r.steps.Find(bson.M{"_id": step}).One(&step)
	if err != nil {
		return err
	}
	return nil
}

func (r *repositroyDB) DeleteStep(id string) error {
	err := r.steps.Remove(bson.M{"_id": bson.ObjectIdHex(id)})
	if err != nil {
		return err
	}
	return nil
}

func (r *repositroyDB) GetDomainSteps(domainID string) ([]models.Step, error) {
	steps := []models.Step{}
	err := r.steps.Find(bson.M{"domain_id": bson.ObjectIdHex(domainID)}).All(&steps)
	if err != nil {
		return steps, err
	}
	return steps, nil
}
