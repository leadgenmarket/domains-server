package models

import "github.com/globalsign/mgo/bson"

//фкнкционал для планировок на сайты лидактива
type PlansSite struct {
	ID   bson.ObjectId `bson:"_id"`
	Name string        `bson:"name"`
	URL  string        `bson:"url"`
}

type PlansSiteInput struct {
	ID   string `json:"id"`
	Name string `json:"name"`
	URL  string `json:"url"`
}

func CreatePlansSiteFromInput(input PlansSiteInput) PlansSite {
	plan := PlansSite{
		Name: input.Name,
		URL:  input.URL,
	}
	if input.ID != "" {
		plan.ID = bson.ObjectIdHex(input.ID)
	} else {
		plan.ID = bson.NewObjectId()
	}
	return plan
}

type Plan struct {
	ID             bson.ObjectId `bson:"_id"`
	SiteID         bson.ObjectId `bson:"site_id"`
	Name           string        `bson:"name"`
	Rooms          int           `bson:"rooms"`
	TotalArea      float64       `bson:"total_area"`
	LivingArea     float64       `bson:"living_area"`
	Floors         []int         `bson:"floors"`
	Action         bool          `bson:"action"`
	Price          int           `bson:"price"`
	LivingRoomArea float64       `bson:"living_room_area"`
	BedRoomArea    float64       `bson:"bed_room_area"`
	KitchenArea    float64       `bson:"kitchen_area"`
	Photo          string        `bson:"photo"`
}

func CreatePlanFromInput(input PlanInput) Plan {
	plan := Plan{
		Name:           input.Name,
		Rooms:          input.Rooms,
		TotalArea:      input.TotalArea,
		LivingArea:     input.LivingArea,
		Floors:         input.Floors,
		Action:         input.Action,
		Price:          input.Price,
		LivingRoomArea: input.LivingRoomArea,
		BedRoomArea:    input.BedRoomArea,
		KitchenArea:    input.KitchenArea,
		Photo:          input.Photo,
	}
	if input.ID != "" {
		plan.ID = bson.ObjectIdHex(input.ID)
	} else {
		plan.ID = bson.NewObjectId()
	}
	plan.SiteID = bson.ObjectIdHex(input.SiteID)
	return plan
}

type PlanInput struct {
	ID             string  `json:"id" form:"id"`
	SiteID         string  `json:"site_id" form:"site_id"`
	Name           string  `json:"name" form:"name"`
	Rooms          int     `json:"rooms" form:"rooms"`
	TotalArea      float64 `json:"total_area" form:"total_area"`
	LivingArea     float64 `json:"living_area" form:"living_area"`
	Floors         []int   `json:"floors" form:"floors"`
	Action         bool    `json:"action" form:"action"`
	Price          int     `json:"price" form:"price"`
	LivingRoomArea float64 `json:"living_room_area" form:"living_room_area"`
	BedRoomArea    float64 `json:"bed_room_area" form:"bed_room_area"`
	KitchenArea    float64 `json:"kitchen_area" form:"kitchen_area"`
	Photo          string  `json:"photo" form:"photo"`
}
