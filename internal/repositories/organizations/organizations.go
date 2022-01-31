package organization

import (
	"domain-server/internal/models"

	mongodb "github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
)

type Repository interface {
	AddOrganization(organization models.Organization) (models.Organization, error)
	GetOrganizationById(id string) (models.Organization, error)
	GetOrganizations() ([]models.Organization, error)
	UpdateOrganization(organization models.Organization) error
	DeleteOrganization(id string) error
}

type repositroyDB struct {
	organiozations *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	return &repositroyDB{
		organiozations: dbClient.C("organiozations"),
	}
}

func (r *repositroyDB) AddOrganization(organization models.Organization) (models.Organization, error) {
	organization.ID = bson.NewObjectId()
	err := r.organiozations.Insert(&organization)
	if err != nil {
		return organization, err
	}
	return organization, nil
}

func (r *repositroyDB) UpdateOrganization(organization models.Organization) error {
	err := r.organiozations.Update(bson.M{"_id": organization.ID}, organization)
	if err != nil {
		return err
	}
	return nil
}

func (r *repositroyDB) DeleteOrganization(id string) error {
	err := r.organiozations.Remove(bson.M{"_id": bson.ObjectIdHex(id)})
	if err != nil {
		return err
	}
	return nil
}

func (r *repositroyDB) GetOrganizationById(id string) (models.Organization, error) {
	organiozations := models.Organization{}
	err := r.organiozations.Find(bson.M{"_id": bson.ObjectIdHex(id)}).One(&organiozations)
	if err != nil {
		return organiozations, err
	}
	return organiozations, nil
}

func (r *repositroyDB) GetOrganizations() ([]models.Organization, error) {
	organiozations := []models.Organization{}
	err := r.organiozations.Find(bson.M{}).All(&organiozations)
	if err != nil {
		return organiozations, err
	}
	return organiozations, nil
}
