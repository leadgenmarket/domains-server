package organization

import (
	"domain-server/internal/models"

	mongodb "github.com/globalsign/mgo"
)

type Repository interface {
	AddNewOrganizaion(organization models.Organization) (models.Organization, error)
	GetOrganizationsList() ([]models.Organization, error)
}

type repositroyDB struct {
	domains *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	return &repositroyDB{
		domains: dbClient.C("organizations"),
	}
}

func (r *repositroyDB) AddNewOrganizaion(organization models.Organization) (models.Organization, error) {
	return models.Organization{}, nil
}

func (r *repositroyDB) GetOrganizationsList() ([]models.Organization, error) {
	return nil, nil
}
