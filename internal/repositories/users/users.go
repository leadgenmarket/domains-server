package users

import (
	"domain-server/internal/models"

	mongodb "github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
)

type Repository interface {
	AddUser(user models.User) (models.User, error)
	GetUserById(id string) ([]models.User, error)
	UpdateUser(user models.User) error
	DeleteUser(id string) error
}

type repositroyDB struct {
	users *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	return &repositroyDB{
		users: dbClient.C("users"),
	}
}

func (r *repositroyDB) AddUser(user models.User) (models.User, error) {
	user.ID = bson.NewObjectId()
	err := r.users.Insert(&user)
	if err != nil {
		return user, err
	}
	return user, nil
}

func (r *repositroyDB) UpdateUser(user models.User) error {
	err := r.users.Find(bson.M{"_id": user}).One(&user)
	if err != nil {
		return err
	}
	return nil
}

func (r *repositroyDB) DeleteUser(id string) error {
	err := r.users.Remove(bson.M{"_id": bson.ObjectIdHex(id)})
	if err != nil {
		return err
	}
	return nil
}

func (r *repositroyDB) GetUserById(id string) ([]models.User, error) {
	users := []models.User{}
	err := r.users.Find(bson.M{"_id": bson.ObjectIdHex(id)}).All(&users)
	if err != nil {
		return users, err
	}
	return users, nil
}
