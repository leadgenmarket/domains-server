package leads

import (
	"domain-server/internal/models"

	mongodb "github.com/globalsign/mgo"
)

type Repository interface {
	AddLead(lead models.Lead) (models.Lead, error)
	GetLeadsList(fiter string) ([]models.Lead, error)
	GetUnsendedLeads() ([]models.Lead, error)
}

type repositroyDB struct {
	domains *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	return &repositroyDB{
		domains: dbClient.C("leads"),
	}
}

func (r *repositroyDB) AddLead(lead models.Lead) (models.Lead, error) {
	return models.Lead{}, nil
}

func (r *repositroyDB) GetLeadsList(fiter string) ([]models.Lead, error) {
	return nil, nil
}

func (r *repositroyDB) GetUnsendedLeads() ([]models.Lead, error) {
	return nil, nil
}
