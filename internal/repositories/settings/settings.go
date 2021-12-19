package settings

import (
	"domain-server/internal/models"

	mongodb "github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
)

type Repository interface {
	AddSettings(settings models.Settings) (_ models.Settings, err error)
	UpdateSettings(settings models.Settings) error
	DeleteSettings(id string) error
	GetSettingsById(id string) (models.Settings, error)
}

type repositroyDB struct {
	settings *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	return &repositroyDB{
		settings: dbClient.C("settings"),
	}
}

func (r *repositroyDB) AddSettings(settings models.Settings) (models.Settings, error) {
	settings.ID = bson.NewObjectId()
	err := r.settings.Insert(settings)
	if err != nil {
		return settings, err
	}
	return settings, nil
}

func (r *repositroyDB) UpdateSettings(settings models.Settings) error {
	err := r.settings.Find(bson.M{"_id": settings.ID}).One(&settings)
	if err != nil {
		return err
	}
	return nil
}

func (r *repositroyDB) DeleteSettings(id string) error {
	err := r.settings.Remove(bson.M{"_id": bson.ObjectIdHex(id)})
	if err != nil {
		return err
	}
	return nil
}

func (r *repositroyDB) GetSettingsById(id string) (models.Settings, error) {
	settings := models.Settings{}
	err := r.settings.Find(bson.M{"_id": bson.ObjectIdHex(id)}).One(&settings)
	if err != nil {
		return settings, err
	}
	return settings, nil
}
