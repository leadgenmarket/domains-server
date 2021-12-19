package organization

import (
	"domain-server/internal/models"

	mongodb "github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
)

type Repository interface {
	AddOrganization(step models.Organization) (models.Organization, error)
	GetOrganizationById(id string) ([]models.Organization, error)
	UpdateOrganization(step models.Organization) error
	DeleteOrganization(id string) error
}

type repositroyDB struct {
	steps *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	return &repositroyDB{
		steps: dbClient.C("steps"),
	}
}

func (r *repositroyDB) AddOrganization(step models.Organization) (models.Organization, error) {
	step.ID = bson.NewObjectId()
	err := r.steps.Insert(&step)
	if err != nil {
		return step, err
	}
	return step, nil
}

func (r *repositroyDB) UpdateOrganization(step models.Organization) error {
	err := r.steps.Find(bson.M{"_id": step}).One(&step)
	if err != nil {
		return err
	}
	return nil
}

func (r *repositroyDB) DeleteOrganization(id string) error {
	err := r.steps.Remove(bson.M{"_id": bson.ObjectIdHex(id)})
	if err != nil {
		return err
	}
	return nil
}

func (r *repositroyDB) GetOrganizationById(id string) ([]models.Organization, error) {
	steps := []models.Organization{}
	err := r.steps.Find(bson.M{"_id": bson.ObjectIdHex(id)}).All(&steps)
	if err != nil {
		return steps, err
	}
	return steps, nil
}
