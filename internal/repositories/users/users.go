package users

import (
	"domain-server/internal/models"

	mongodb "github.com/globalsign/mgo"
)

type Repository interface {
	AddUser(user models.User) (models.User, error)
	GetUsersList() ([]models.User, error)
	ChangeUsersPass(login string, pass string) error
}

type repositroyDB struct {
	domains *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	return &repositroyDB{
		domains: dbClient.C("users"),
	}
}

func (r *repositroyDB) AddUser(user models.User) (models.User, error) {
	return models.User{}, nil
}

func (r *repositroyDB) GetUsersList() ([]models.User, error) {
	return nil, nil
}

func (r *repositroyDB) ChangeUsersPass(login string, pass string) error {
	return nil
}
