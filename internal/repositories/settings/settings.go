package settings

import (
	"domain-server/internal/models"

	mongodb "github.com/globalsign/mgo"
)

type Repository interface {
	AddSettings(settings models.Settings) (_ int, err error)
	ChangeSettings(settings models.Settings) error
}

type repositroyDB struct {
	dbClient *mongodb.Session
}

func New(dbClient *mongodb.Session) Repository {
	return &repositroyDB{
		dbClient: dbClient,
	}
}

func (r *repositroyDB) AddSettings(settings models.Settings) (id int, err error) {
	return 0, nil
}

func (r *repositroyDB) ChangeSettings(settings models.Settings) error {
	return nil
}
