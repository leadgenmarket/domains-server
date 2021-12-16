package models

import "time"

type User struct {
	ID    string `bson:"id"`
	Name  string `bson:"name"`
	Login string `bson:"login"`
	Pass  string `bson:"pass"`
	Role  string `bson:"role"`
}

type Lead struct {
	ID          string    `bson:"id"`
	Url         string    `bson:"url"`
	Name        string    `bson:"name"`
	Phone       string    `bson:"phone"`
	Text        string    `bson:"text"`
	UserAgent   string    `bson:"uagent"`
	SendCrm     bool      `bson:"sended_crm"`
	CrmSendTime time.Time `bson:"crm_send_time"`
	CreatedAt   time.Time `bson:"created_at"`
	//LeadID      int       `bson:"lead_id"`
}

type Domain struct {
	ID        string    `bson:"id"`
	Url       string    `bson:"url"`
	Template  Template  `bson:"template"`
	Settings  Settings  `bson:"settings"`
	CreatedBy int       `bson:"created_by"`
	CreatedAt time.Time `bson:"created_at"`
	UpdatedAt time.Time `bson:"updated_at"`
}

type Template struct {
	ID   string `bson:"id"`
	Name string `bson:"name"`
	Path string `bson:"path"`
}

type Settings struct {
	ID             string       `bson:"id"`
	City           City         `bson:"city"`
	Background     string       `bson:"background"`
	MainColor      string       `bson:"main_color"`
	SecondaryColor string       `bson:"secondary_color"`
	Yandex         string       `bson:"yandex"`
	Google         string       `bson:"google"`
	Mail           string       `bson:"mail"`
	Roistat        string       `bson:"roistat"`
	Marquiz        string       `bson:"marquiz"`
	Steps          []Step       `bson:"steps"`
	Organization   Organization `bson:"organization"`
}

type Step struct {
	ID           string   `bson:"id"`
	Question     string   `bson:"question"`
	SendQuestion string   `bson:"send_question"`
	Answers      []Answer `bson:"answers"`
}

type Answer struct {
	ID        string `bson:"id"`
	Title     string `bson:"title"`
	SendParam string `bson:"send_param"`
}

type City struct {
	ID   string `bson:"id"`
	Name string `bson:"name"`
}

type Title struct {
	ID    string `bson:"id"`
	Title string `bson:"title"`
}

type Organization struct {
	ID      string `bson:"id"`
	Name    string `bson:"name"`
	Address string `bson:"address"`
}
