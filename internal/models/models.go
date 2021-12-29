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

/*type Lead_ struct {
	ID  bson.ObjectId `bson:"_id" json:"id"`
	Url string        `bson:"url"`
}*/

/*
{
	"a_sda4a[]": [
		"2024",
		"2023"
	],
	"act": "tmp",
	"AMO_ID": "false",
	"celType": "getName",
	"f_info[]": [
		"Выберите районы - район Хорошево-Мневники, Рязанский район, пос. Сосенское",
		"Сколько комнат Вам нужно? - 2 - комнатные квартиры, 3 - комнатные квартиры",
		"Когда жилой комплекс должен быть сдан? - ЖК сдается в 2024 году, ЖК сдается в 2023 году",
		"Укажите максимальную стоимость квартиры, выше которой вы не готовы рассматривать предложения - 31000000"
	],
	"gclid": "",
	"id": "61cb9fef31e51c97ab4e7e95",
	"jk_id": "",
	"l_t": "la",
	"loc_type": "",
	"m_codes": "",
	"metrika_id": "82603531",
	"name": "test",
	"phone": "+7 (929) 120-20-21",
	"r_codes": [
		"rayon-khoroshevo-mnevniki",
		"ryazanskiy-rayon",
		"pos-sosenskoe"
	],
	"roistatVisitId": "8566239",
	"S_ID": "99793",
	"s_name": "Санкт-Петербург",
	"s[cel]": "getName",
	"s[d]": "localhost:3000",
	"s[ip]": "",
	"s[r]": "",
	"s[sid]": "",
	"s[ua]": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:95.0) Gecko/20100101 Firefox/95.0",
	"s[uri]": "?city=spb&k=61cb171d31e51c45c8a2e06a&utm_medium=medium&utm_source=%D1%8B%D0%B2%D0%B0%D1%8B%D0%B2%D0%B0%D0%BB%D0%B3%D1%88%D0%B3%D1%88%D0%B9%D1%86%D1%83",
	"send_type": "",
	"set_bd": "1",
	"TEMA": "Заявка с одноэкранника",
	"user_ip": "",
	"ut_type": "localhost:3000",
	"utm_content": "1ekran",
	"utm_medium": "medium",
	"utm_source": "ываывалгшгшйцу",
	"vtor": "0",
	"yclid": ""
}
*/
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
	Roistat        string                   `bson:"roistat" json:"roistat"`
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
