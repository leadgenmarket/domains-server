package titles

import (
	"domain-server/internal/models"
	"fmt"

	mongodb "github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
)

type Repository interface {
	AddTitle(title models.Title) (models.Title, error)
	GetTitlesList() ([]models.Title, error)
	UpdateTitle(title models.Title) error
	DeleteTitle(id string) error
	GetTitleForDomain(cityID bson.ObjectId, rayon string, k string) (string, error)
}

type repositroyDB struct {
	titles    *mongodb.Collection
	locations *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	return &repositroyDB{
		titles:    dbClient.C("titles"),
		locations: dbClient.C("locations"),
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

func (r *repositroyDB) GetTitleForDomain(cityID bson.ObjectId, rayon string, k string) (string, error) {
	if k == "" {
		location := models.Location{}
		err := r.locations.Find(bson.M{"city_id": cityID, "path": rayon}).One(&location)
		if err != nil {
			return "", err
		}
		return GenerateTitleFromLocation(location), nil
	}
	title := models.Title{}
	err := r.titles.Find(bson.M{"_id": bson.ObjectIdHex(k)}).One(&title)
	fmt.Println(title.Title)
	return title.Title, err
}

func GenerateTitleFromLocation(location models.Location) string {
	prefix := "Новостройки в"
	if location.Type == "streets" {
		fmt.Println(string([]rune(location.NameSite)[0:2]))
		if string([]rune(location.NameSite)[0:2]) == "в " {
			prefix = "Новостройки "
		} else {
			prefix = "Новостройки на"
		}
	}
	return fmt.Sprintf(`%s %s`, prefix, location.NameSite)
}
