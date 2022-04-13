package repositories

import (
	"domain-server/internal/config"
	"domain-server/internal/repositories/cities"
	"domain-server/internal/repositories/domains"
	"domain-server/internal/repositories/jk"
	"domain-server/internal/repositories/leads"
	"domain-server/internal/repositories/locations"
	organization "domain-server/internal/repositories/organizations"
	"domain-server/internal/repositories/plans"
	"domain-server/internal/repositories/plans_sites"
	"domain-server/internal/repositories/prices"
	"domain-server/internal/repositories/scenario"
	"domain-server/internal/repositories/tasks"
	templates "domain-server/internal/repositories/template"
	"domain-server/internal/repositories/template_prices"
	"domain-server/internal/repositories/titles"
	"domain-server/internal/repositories/users"

	mongodb "github.com/globalsign/mgo"
)

type Repositories struct {
	Cities         cities.Repository
	Domains        domains.Repository
	Leads          leads.Repository
	Organizations  organization.Repository
	Templates      templates.Repository
	Titles         titles.Repository
	Users          users.Repository
	Locations      locations.Repository
	Prices         prices.Repository
	JK             jk.Repository
	PlansSites     plans_sites.Repository
	Plans          plans.Repository
	Scenarios      scenario.Repository
	Tasks          tasks.Repository
	TemplatePrices template_prices.Repository
}

func New(dbClient *mongodb.Database, cfg *config.Config) *Repositories {
	return &Repositories{
		Cities:         cities.New(dbClient),
		Domains:        domains.New(dbClient),
		Leads:          leads.New(dbClient),
		Organizations:  organization.New(dbClient),
		Templates:      templates.New(dbClient),
		Titles:         titles.New(dbClient),
		Users:          users.New(dbClient, cfg),
		Locations:      locations.New(dbClient),
		Prices:         prices.New(dbClient),
		JK:             jk.New(dbClient),
		Plans:          plans.New(dbClient),
		PlansSites:     plans_sites.New(dbClient),
		Scenarios:      scenario.New(dbClient),
		Tasks:          tasks.New(dbClient),
		TemplatePrices: template_prices.New(dbClient),
	}
}
