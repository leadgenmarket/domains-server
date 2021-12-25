package locations

import (
	"domain-server/internal/models"

	mongodb "github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
)

type Repository interface {
	GetAllLocations() (_ []models.Location, err error)
	GetRaionsOfTheCity(cityID string) ([]models.Location, error)
	UpdateLocations(locations []models.Location) error
}

type repositroyDB struct {
	locations *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	return &repositroyDB{
		locations: dbClient.C("locations"),
	}
}

func (r *repositroyDB) GetAllLocations() (_ []models.Location, err error) {
	return nil, nil
}

func (r *repositroyDB) UpdateLocations(locations []models.Location) error {
	for _, locationIn := range locations {
		location, err := r.GetLocationByPortalId(locationIn.PortalID)
		if err != nil {
			if err.Error() == "not found" {
				_, err := r.AddLocation(locationIn)
				if err != nil {
					return err
				}
				continue
			}
			return err
		}
		locationIn.ID = location.ID
		if err := r.UpdateLocation(locationIn); err != nil {
			return err
		}
	}
	return nil
}

func (r *repositroyDB) GetLocationByPortalId(id string) (models.Location, error) {
	var location models.Location
	err := r.locations.Find(bson.M{"portal_id": id}).One(&location)
	if err != nil {
		return location, err
	}
	return location, nil
}

func (r *repositroyDB) GetRaionsOfTheCity(cityID string) ([]models.Location, error) {
	var locations []models.Location
	err := r.locations.Find(bson.M{"city_id": bson.ObjectIdHex(cityID), "type": "raions"}).All(&locations)
	if err != nil {
		return locations, err
	}
	return locations, nil
}

func (r *repositroyDB) AddLocation(location models.Location) (models.Location, error) {
	location.ID = bson.NewObjectId()
	err := r.locations.Insert(&location)
	if err != nil {
		return location, err
	}
	return location, nil
}

func (r *repositroyDB) UpdateLocation(location models.Location) error {
	err := r.locations.Update(bson.M{"_id": location.ID}, location)
	if err != nil {
		return err
	}
	return nil
}
