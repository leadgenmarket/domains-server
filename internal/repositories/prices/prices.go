package prices

import (
	mongodb "github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
)

type Repository interface {
	AddPrices(prices []map[string]interface{}) error
	GetPricesOfTheCity(CityID bson.ObjectId) (map[string]interface{}, error)
}

type repositroyDB struct {
	prices *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	return &repositroyDB{
		prices: dbClient.C("prices"),
	}
}

func (r *repositroyDB) AddPrices(prices []map[string]interface{}) error {
	r.prices.DropCollection()
	for _, price := range prices {
		priceInsert := map[string]interface{}{}
		priceInsert["portal_city_id"] = price["portal_city_id"]
		priceInsert["city_id"] = price["_id"]
		priceInsert["prices"] = price["PRICES"]
		r.prices.Insert(priceInsert)
	}
	return nil
}

func (r *repositroyDB) GetPricesOfTheCity(CityID bson.ObjectId) (map[string]interface{}, error) {
	var prices map[string]interface{}
	err := r.prices.Find(bson.M{"city_id": CityID}).All(&prices)
	if err != nil {
		return prices, err
	}
	return prices, nil
}
