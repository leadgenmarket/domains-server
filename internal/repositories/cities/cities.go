package cities

import (
	"domain-server/internal/models"
	"fmt"

	mongodb "github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
)

type Repository interface {
	GetAllCities() (_ []models.City, err error)
	UpdateCities(cities []models.City) error
}

type repositroyDB struct {
	cities *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	return &repositroyDB{
		cities: dbClient.C("cities"),
	}
}

func (r *repositroyDB) GetAllCities() ([]models.City, error) {
	cities := []models.City{}
	fmt.Println(cities)
	err := r.cities.Find(bson.M{}).All(&cities)
	if err != nil {
		return cities, err
	}
	return cities, nil
}

func (r *repositroyDB) UpdateCities(cities []models.City) error {
	//fmt.Println(cities)
	for _, cityIn := range cities {
		city, err := r.GetCityByPortalId(cityIn.PortalID)
		if err != nil {
			if err.Error() == "not found" {
				_, err := r.AddCity(models.City{
					Name:     cityIn.Name,
					PortalID: cityIn.PortalID,
				})
				if err != nil {
					return err
				}
				continue
			}
			return err
		}
		if city.Name != cityIn.Name {
			city.Name = cityIn.Name
			err := r.UpdateCity(city)
			if err != nil {
				return err
			}
		}
	}
	return nil
}

func (r *repositroyDB) GetCityByPortalId(id string) (models.City, error) {
	var city models.City
	err := r.cities.Find(bson.M{"portal_id": id}).One(&city)
	if err != nil {
		return city, err
	}
	return city, nil
}

func (r *repositroyDB) AddCity(city models.City) (models.City, error) {
	city.ID = bson.NewObjectId()
	err := r.cities.Insert(&city)
	if err != nil {
		return city, err
	}
	return city, nil
}

func (r *repositroyDB) UpdateCity(city models.City) error {
	err := r.cities.Update(bson.M{"_id": city.ID}, city)
	if err != nil {
		return err
	}
	return nil
}
