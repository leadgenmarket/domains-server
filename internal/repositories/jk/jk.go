package jk

import (
	"domain-server/internal/models"
	"fmt"
	"strconv"

	mongodb "github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
)

type Repository interface {
	AddJK(jk models.JK) error
	DropDB() error
	GetJKByPortalId(id string) (models.JK, error)
	UpdateJK(jk models.JK) error
	GetJKListByParams(jkFilter models.JKFilter) ([]models.JK, error)
}

type repositroyDB struct {
	jk *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	return &repositroyDB{
		jk: dbClient.C("jks"),
	}
}

func (r *repositroyDB) AddJK(jk models.JK) error {
	err := r.jk.Insert(&jk)
	if err != nil {
		return err
	}
	return nil
}

func (r *repositroyDB) GetJKByPortalId(id string) (models.JK, error) {
	jk := models.JK{}
	err := r.jk.Find(bson.M{"portal_id": id}).One(&jk)
	if err != nil {
		return jk, err
	}
	return jk, nil
}

func (r *repositroyDB) GetJKListByParams(jkFilter models.JKFilter) ([]models.JK, error) {
	jksList := []models.JK{}
	// {"$match": bson.M{"portal_city_id": "99793"}}, -город
	// bson.M{"raion": bson.M{"$elemMatch": bson.M{"code": jkFilter.Raions[0]}}}} - районы через или надо
	// {"$match": bson.M{"price_ot": bson.M{"$lt": jkFilter.MaxPrice}}} цены через или тоже
	// {"$match": bson.M{"sdacha": bson.M{"$regex": "2022"}}} - через или сдачу

	//all
	// {"$match": bson.M{"raion": bson.M{"$elemMatch": bson.M{"code": jkFilter.Raions[0]}}}}, {"$match": bson.M{"sdacha": bson.M{"$regex": "2022"}}}, {"$match": bson.M{"price_ot": bson.M{"$lt": jkFilter.MaxPrice}}}}
	filter := []bson.M{{"$match": bson.M{"portal_city_id": jkFilter.CityID}}}
	filter = append(filter, bson.M{"$match": generatePricesFilter(jkFilter.Rooms, jkFilter.MaxPrice)})
	filter = append(filter, bson.M{"$match": generateSdachaFilter(jkFilter.Sdacha)})
	filter = append(filter, bson.M{"$match": generateRaionsFilter(jkFilter.Raions)})

	err := r.jk.Pipe(filter).All(&jksList)
	fmt.Println(len(jksList))
	if err != nil {
		return jksList, err
	}
	return jksList, nil
}

func (r *repositroyDB) UpdateJK(jk models.JK) error {
	err := r.jk.Update(bson.M{"_id": jk.ID}, jk)
	if err != nil {
		return err
	}
	return nil
}

func (r *repositroyDB) DropDB() error {
	r.jk.DropCollection()
	return nil
}

func generatePricesFilter(roomTypes []int, maxPrice int) map[string]interface{} {
	rooms := []bson.M{}
	if len(roomTypes) == 0 {
		rooms = append(rooms, bson.M{"price_ot": bson.M{"$lt": maxPrice, "$gt": 0}})
	} else {
		for _, roomType := range roomTypes {
			rooms = append(rooms, bson.M{"price_" + strconv.Itoa(roomType): bson.M{"$lt": maxPrice, "$gt": 0}})
		}
	}
	filter := bson.M{"$or": rooms}
	return filter
}

func generateSdachaFilter(sdachaIn []string) map[string]interface{} {
	if len(sdachaIn) == 0 {
		return bson.M{}
	}
	sdacha := []bson.M{}
	for _, date := range sdachaIn {
		sdacha = append(sdacha, bson.M{"sdacha": bson.M{"$regex": date}})
	}
	filter := bson.M{"$or": sdacha}
	return filter
}

func generateRaionsFilter(raionsIn []string) map[string]interface{} {
	if len(raionsIn) == 0 {
		return bson.M{}
	}
	raions := []bson.M{}
	for _, raion := range raionsIn {
		raions = append(raions, bson.M{"raion": bson.M{"$elemMatch": bson.M{"code": raion}}})
	}
	filter := bson.M{"$or": raions}
	return filter
}
