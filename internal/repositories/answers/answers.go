package answer

import (
	"domain-server/internal/models"

	mongodb "github.com/globalsign/mgo"
)

type Repository interface {
	AddAnswer(domain models.Answer) (_ models.Answer, err error)
}

type repositroyDB struct {
	dbClient *mongodb.Session
}

func New(dbClient *mongodb.Session) Repository {
	return &repositroyDB{
		dbClient: dbClient,
	}
}

func (r *repositroyDB) AddAnswer(domain models.Answer) (_ models.Answer, err error) {
	return models.Answer{}, nil
}
