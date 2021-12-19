package repositories

import (
	"domain-server/internal/config"
	answer "domain-server/internal/repositories/answers"
	"domain-server/internal/repositories/cities"
	"domain-server/internal/repositories/domains"
	"domain-server/internal/repositories/leads"
	"domain-server/internal/repositories/locations"
	organization "domain-server/internal/repositories/organizations"
	"domain-server/internal/repositories/settings"
	"domain-server/internal/repositories/steps"
	templates "domain-server/internal/repositories/template"
	"domain-server/internal/repositories/titles"
	"domain-server/internal/repositories/users"

	mongodb "github.com/globalsign/mgo"
)

type Repositories struct {
	Answers       answer.Repository
	Cities        cities.Repository
	Domains       domains.Repository
	Leads         leads.Repository
	Organizations organization.Repository
	Settings      settings.Repository
	Steps         steps.Repository
	Templates     templates.Repository
	Titles        titles.Repository
	Users         users.Repository
	Locations     locations.Repository
}

func New(dbClient *mongodb.Database, cfg *config.Config) *Repositories {
	return &Repositories{
		Answers:       answer.New(dbClient),
		Cities:        cities.New(dbClient),
		Domains:       domains.New(dbClient),
		Leads:         leads.New(dbClient),
		Organizations: organization.New(dbClient),
		Settings:      settings.New(dbClient),
		Steps:         steps.New(dbClient),
		Templates:     templates.New(dbClient),
		Titles:        titles.New(dbClient),
		Users:         users.New(dbClient, cfg),
		Locations:     locations.New(dbClient),
	}
}
