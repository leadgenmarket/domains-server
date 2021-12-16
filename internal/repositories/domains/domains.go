package domains

import (
	"domain-server/internal/models"

	mongodb "github.com/globalsign/mgo"
)

type Repository interface {
	AddDomain(domain models.Domain) (_ models.Domain, err error)
	FindDomainByUrl(url string) (_ models.Domain, err error)
}

type repositroyDB struct {
	dbClient *mongodb.Session
}

func New(dbClient *mongodb.Session) Repository {
	return &repositroyDB{
		dbClient: dbClient,
	}
}

func (r *repositroyDB) AddDomain(domain models.Domain) (_ models.Domain, err error) {
	return models.Domain{}, nil
}

func (r *repositroyDB) FindDomainByUrl(url string) (_ models.Domain, err error) {
	return models.Domain{}, nil
}
