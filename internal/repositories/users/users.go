package users

import (
	"domain-server/internal/config"
	"domain-server/internal/models"
	"domain-server/internal/utils"

	mongodb "github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
)

type Repository interface {
	AddUser(user models.User) (models.User, error)
	GetUserById(id string) ([]models.User, error)
	UpdateUser(user models.User) error
	DeleteUser(id string) error
	GetUserByLogin(login string) (models.User, error)
}

type repositroyDB struct {
	users  *mongodb.Collection
	config *config.Config
}

func New(dbClient *mongodb.Database, config *config.Config) Repository {
	return &repositroyDB{
		users:  dbClient.C("users"),
		config: config,
	}
}

func (r *repositroyDB) AddUser(user models.User) (models.User, error) {
	user.ID = bson.NewObjectId()
	user.Pass = utils.GenerateHashPassword(user.Pass, r.config.Salt)
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

func (r *repositroyDB) GetUserByLogin(login string) (models.User, error) {
	user := models.User{}
	err := r.users.Find(bson.M{"login": login}).One(&user)
	if err != nil {
		return user, err
	}
	return user, nil
}

func (r *repositroyDB) CheckUserCredetinals(login string, pass string) (bool, error) {
	return false, nil
}
