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
	ID              bson.ObjectId            `bson:"_id" json:"id"`
	Url             string                   `bson:"url" json:"url" binding:"required"`
	TemplateID      bson.ObjectId            `bson:"template_id" json:"template_id"`
	CreatedBy       bson.ObjectId            `bson:"created_by"`
	CityID          bson.ObjectId            `bson:"city_id" json:"city_id" binding:"required"`
	Background      string                   `bson:"background" json:"background"`
	MainColor       string                   `bson:"main_color" json:"main_color"`
	SubTitle        string                   `bson:"sub_title" json:"sub_title"`
	SubTitleItems   string                   `bson:"sub_title_items" json:"sub_title_items"`
	PhoneStepTitle  string                   `bson:"phone_step_title" json:"phone_step_title"`
	FooterTitle     string                   `bson:"footer_title" json:"footer_title"`
	Phone           string                   `bson:"phone" json:"phone"`
	SecondaryColor  string                   `bson:"secondary_color" json:"secondary_color"`
	Yandex          string                   `bson:"yandex" json:"yandex"`
	Google          string                   `bson:"google" json:"google"`
	MyTarget        string                   `bson:"mytarget" json:"mytarget"`
	VK              string                   `bson:"vk" json:"vk"`
	Facebook        string                   `bson:"facebook" form:"facebook" json:"facebook"`
	Marquiz         string                   `bson:"marquiz" json:"marquiz"`
	Steps           []map[string]interface{} `bson:"steps"`
	OrganizationID  bson.ObjectId            `bson:"organization_id" json:"organization_id"`
	Qoopler         bool                     `bson:"qoopler" form:"qoopler"`
	Roistat         bool                     `bson:"roistat" form:"roistat"`
	Moderation      bool                     `bson:"moderation" form:"moderation"`
	AdvantagesTitle string                   `bson:"advantages_title" form:"advantages_title"`
	Advantages      []map[string]interface{} `bson:"advantages" form:"advantages"`
	PhotosTitle     string                   `bson:"photos_title" form:"photos_title"`
	Photos          map[string]string        `bson:"photos" form:"photos"`
	PlansTitle      string                   `bson:"plans_title" form:"plans_title"`
	ResultStepText  string                   `bson:"result_step_text" form:"result_step_text"`
	Plans           []map[string]interface{} `bson:"plans" form:"plans"`
	CreatedAt       time.Time                `bson:"created_at"`
	UpdatedAt       time.Time                `bson:"updated_at"`
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
	ID        bson.ObjectId `bson:"_id"`
	Title     string        `bson:"title"`
	CreatedAt time.Time     `bson:"created_at"`
}

type Organization struct {
	ID     bson.ObjectId `bson:"_id" json:"id"`
	Name   string        `bson:"name" json:"name"`
	Adress string        `bson:"adress" json:"adress"`
	Phone  string        `bson:"phone" json:"phone"`
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

type JK struct {
	ID           bson.ObjectId `bson:"_id"`
	Domain       string        `bson:"domain" json:"domain"`
	Portal_ID    string        `bson:"portal_id" json:"ID"`
	Name         string        `bson:"name" json:"NAME"`
	Code         string        `bson:"code" json:"CODE"`
	CityID       bson.ObjectId `bson:"city_id"`
	PortalCityID string        `bson:"portal_city_id" json:"CITY_ID"`
	Raion        []Raion       `bson:"raion" json:"RAION"`
	Price_OT     int           `bson:"price_ot" json:"PRICE_OT"`
	Price_0      int           `bson:"price_0" json:"PRICE_0"`
	Price_1      int           `bson:"price_1" json:"PRICE_1"`
	Price_2      int           `bson:"price_2" json:"PRICE_2"`
	Price_3      int           `bson:"price_3" json:"PRICE_3"`
	Price_4      int           `bson:"price_4" json:"PRICE_4"`
	Price_5      int           `bson:"price_5" json:"PRICE_5"`
	Price_6      int           `bson:"price_6" json:"PRICE_6"`
	Price_7      int           `bson:"price_7" json:"PRICE_7"`
	Price_8      int           `bson:"price_8" json:"PRICE_8"`
	Class        string        `bson:"class" json:"CLASS"`
	Photo        string        `bson:"photo" json:"photo"`
	FlatsCNT     int           `bson:"flats_cnt" json:"flats_cnt"`
	Sdacha       []string      `bson:"sdacha" json:"SDA4A"`
}

type Raion struct {
	Name string `bson:"name" json:"NAME"`
	Code string `bson:"code" json:"CODE"`
}

type JKFilter struct {
	CityID   string   `bson:"sdacha" json:"city_id"`
	Sdacha   []string `bson:"sdacha" json:"sdacha"`
	MaxPrice int      `bson:"maxPrice" json:"maxPrice"`
	Rooms    []int    `bson:"rooms" json:"rooms"`
	Raions   []string `bson:"raions" json:"raions"`
}

type PaginationListInput struct {
	Cursor   string `json:"cursor"`
	ItemsCnt int    `json:"items_cnt" binding:"required"`
	Search   string `json:"search"`
}
