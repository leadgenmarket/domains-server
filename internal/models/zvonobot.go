package models

import "github.com/globalsign/mgo/bson"

type Task struct {
	ID         bson.ObjectId `bson:"_id" json:"id"`
	LeadID     int           `bson:"lead_id" json:"lead_id"`
	Phone      string        `bson:"phone" json:"phone"`
	Call       []int         `bson:"call" json:"call"`
	Tries      int           `bson:"tries" json:"tries"`
	ScenarioID string        `bson:"scenario_id" json:"scenario_id"`
	Success    bool          `bson:"success" json:"success"`
	Finished   bool          `bson:"finished" json:"finished"`
}

type Scenario struct {
	ID             bson.ObjectId `bson:"_id" json:"id"`
	Name           string        `bson:"name" json:"name"`
	ScriptTemplate string        `bson:"script_template" json:"script_template"`
	PhonesList     []string      `bson:"phones_list" json:"phones_list"`
	SuccessStatus  int           `bson:"success_status" json:"success_status"`
	DiscardStatus  int           `bson:"discard_status" json:"discard_status"`
}
