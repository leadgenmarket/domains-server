package models

import (
	"time"

	"github.com/globalsign/mgo/bson"
)

type User struct {
	ID    bson.ObjectId `bson:"_id"`
	Name  string        `bson:"name"`
	Login string        `bson:"login"`
	Pass  string        `bson:"pass"`
	Role  string        `bson:"role"`
}

type Lead struct {
	ID          bson.ObjectId `bson:"_id"`
	Url         string        `bson:"url"`
	Name        string        `bson:"name"`
	Phone       string        `bson:"phone"`
	Text        string        `bson:"text"`
	UserAgent   string        `bson:"uagent"`
	SendCrm     bool          `bson:"sended_crm"`
	CrmSendTime time.Time     `bson:"crm_send_time"`
	CreatedAt   time.Time     `bson:"created_at"`
	//LeadID      int       `bson:"lead_id"`
}

type Domain struct {
	ID             bson.ObjectId            `bson:"_id" json:"id"`
	Url            string                   `bson:"url" json:"url" binding:"required"`
	TemplateID     bson.ObjectId            `bson:"template_id" json:"template_id"`
	CreatedBy      bson.ObjectId            `bson:"created_by"`
	CityID         bson.ObjectId            `bson:"city_id" json:"city_id" binding:"required"`
	Background     string                   `bson:"background" json:"background"`
	MainColor      string                   `bson:"main_color" json:"main_color"`
	SecondaryColor string                   `bson:"secondary_color" json:"secondary_color"`
	Yandex         string                   `bson:"yandex" json:"yandex"`
	Google         string                   `bson:"google" json:"google"`
	Mail           string                   `bson:"mail" json:"mail"`
	Facebook       string                   `bson:"facebook" form:"facebook" json:"facebook"`
	Marquiz        string                   `bson:"marquiz" json:"marquiz"`
	Steps          []map[string]interface{} `bson:"steps"`
	OrganizationID string                   `bson:"organization_id" json:"organization_id"`
	Qoopler        bool                     `bson:"qoopler" form:"qoopler"`
	CreatedAt      time.Time                `bson:"created_at"`
	UpdatedAt      time.Time                `bson:"updated_at"`
}

type Template struct {
	ID   bson.ObjectId `bson:"_id"`
	Name string        `bson:"name"`
	Path string        `bson:"path"`
}

type City struct {
	ID       bson.ObjectId `bson:"_id"`
	Name     string        `bson:"name"`
	PortalID string        `bson:"portal_id" json:"portal_id"`
}

type Title struct {
	ID    bson.ObjectId `bson:"_id"`
	Title string        `bson:"title"`
}

type Organization struct {
	ID      bson.ObjectId `bson:"_id" json:"id"`
	Name    string        `bson:"name"`
	Address string        `bson:"address"`
}

type Location struct {
	ID           bson.ObjectId `bson:"_id"`
	PortalID     string        `bson:"portal_id"` //ID
	Path         string        `bson:"path"`      //UF_XML_ID
	Name         string        `bson:"name"`      //UF_LOC
	NameSite     string        `bson:"name_site"` //UF_SITE
	NameFull     string        `bson:"name_full"` //UF_NAME
	Type         string        `bson:"type"`      //UF_TYPE
	Prices       string        `bson:"prices"`    //UF_DAT
	CityID       bson.ObjectId `bson:"city_id"`
	PortalCityID string        `bson:"portal_city_id"`
}
