package titles

import (
	"domain-server/internal/models"

	mongodb "github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
)

type Repository interface {
	AddTitle(title models.Title) (models.Title, error)
	GetTitlesList() ([]models.Title, error)
	UpdateTitle(title models.Title) error
	DeleteTitle(id string) error
}

type repositroyDB struct {
	titles *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	return &repositroyDB{
		titles: dbClient.C("titles"),
	}
}

func (r *repositroyDB) AddTitle(title models.Title) (models.Title, error) {
	title.ID = bson.NewObjectId()
	err := r.titles.Insert(&title)
	if err != nil {
		return title, err
	}
	return title, nil
}

func (r *repositroyDB) UpdateTitle(title models.Title) error {
	err := r.titles.Find(bson.M{"_id": title}).One(&title)
	if err != nil {
		return err
	}
	return nil
}

func (r *repositroyDB) DeleteTitle(id string) error {
	err := r.titles.Remove(bson.M{"_id": bson.ObjectIdHex(id)})
	if err != nil {
		return err
	}
	return nil
}

func (r *repositroyDB) GetTitlesList() ([]models.Title, error) {
	titles := []models.Title{}
	err := r.titles.Find(bson.M{}).All(&titles)
	if err != nil {
		return titles, err
	}
	return titles, nil
}
