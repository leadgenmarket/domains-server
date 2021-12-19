package answer

import (
	"domain-server/internal/models"

	mongodb "github.com/globalsign/mgo"
)

type Repository interface {
	AddAnswer(domain models.Answer) (_ models.Answer, err error)
}

type repositroyDB struct {
	domains *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	return &repositroyDB{
		domains: dbClient.C("answers"),
	}
}

func (r *repositroyDB) AddAnswer(domain models.Answer) (_ models.Answer, err error) {
	return models.Answer{}, nil
}
