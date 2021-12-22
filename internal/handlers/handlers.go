package handlers

import (
	"domain-server/internal/handlers/answers"
	"domain-server/internal/handlers/auth"
	"domain-server/internal/handlers/cities"
	"domain-server/internal/handlers/domains"
	"domain-server/internal/handlers/leads"
	"domain-server/internal/handlers/locations"
	"domain-server/internal/handlers/organizations"
	"domain-server/internal/handlers/settings"
	"domain-server/internal/handlers/steps"
	"domain-server/internal/handlers/templates"
	"domain-server/internal/handlers/titles"
	"domain-server/internal/handlers/users"
	"domain-server/internal/logger"
	"domain-server/internal/middlewares"
	"domain-server/internal/repositories"
	"net/http"

	"domain-server/internal/services"

	"github.com/gin-gonic/gin"
)

const (
	templatesFolder = "./templates"
)

type Handlers interface {
	Registry()
}

type handlers struct {
	Auth          auth.Handlers
	Domains       domains.Handlers
	Cities        cities.Handlers
	Locations     locations.Handlers
	Settings      settings.Handlers
	Steps         steps.Handlers
	Answers       answers.Handlers
	Leads         leads.Handlers
	Organizations organizations.Handlers
	Titles        titles.Handlers
	Users         users.Handlers
	Templates     templates.Handlers
	router        *gin.Engine
	repositories  *repositories.Repositories
	services      *services.Services
	logger        logger.Log
}

func New(router *gin.Engine, repositories *repositories.Repositories, services *services.Services, logger logger.Log) Handlers {
	return &handlers{
		Auth:          auth.New(repositories.Users, services, logger),
		Domains:       domains.New(repositories.Domains, services, logger),
		Cities:        cities.New(repositories.Cities, services, logger),
		Locations:     locations.New(repositories.Locations, services, logger),
		Settings:      settings.New(repositories.Settings, services, logger),
		Steps:         steps.New(repositories.Steps, services, logger),
		Answers:       answers.New(repositories.Answers, services, logger),
		Leads:         leads.New(repositories.Leads, services, logger),
		Organizations: organizations.New(repositories.Organizations, services, logger),
		Titles:        titles.New(repositories.Titles, services, logger),
		Users:         users.New(repositories.Users, services, logger),
		Templates:     templates.New(repositories.Templates, services, logger),
		router:        router,
		repositories:  repositories,
		services:      services,
		logger:        logger,
	}
}

func (h *handlers) Registry() {
	h.router.Static("/templates", templatesFolder)
	h.router.LoadHTMLFiles("./templates/aivazovskiy/aivazovskiy.html")
	h.router.GET("/", h.Domains.GetTemplate)
	h.router.POST("/sign-in", h.Auth.SignIn)

	api := h.router.Group("/api", middlewares.TokenAuthMiddleware(h.logger, h.services))
	{
		//domains
		domainsGroup := api.Group("domains")
		domainsGroup.PUT("/", h.Domains.CreateDomain)
		domainsGroup.GET("/", h.Domains.GetDomainsList)
		domainsGroup.POST("/", h.Domains.UpdateDomain)
		domainsGroup.DELETE("/", h.Domains.DeleteDomain)
		domainsGroup.GET("/:id", h.Domains.FindDomainByID)
		domainsGroup.POST("/add", h.Domains.AddDomainWithSettings)

		//cities
		citiesGroup := api.Group("cities")
		citiesGroup.GET("/", h.Cities.GetCitiesList)
		citiesGroup.GET("/update", h.Cities.UpdateCities)

		// locations
		locationsGroup := api.Group("locations")
		locationsGroup.GET("/", h.Locations.GetLocationsList)
		locationsGroup.GET("/update", h.Locations.UpdateLocations)

		//settings
		settingsGroup := api.Group("settings")
		settingsGroup.PUT("/", h.Settings.AddSettings)
		settingsGroup.GET("/:id", h.Settings.GetDomainsSettings)
		settingsGroup.DELETE("/:id", h.Settings.DeleteSettings)
		settingsGroup.POST("/", h.Settings.UpdateSettings)

		//steps
		stepsGroup := api.Group("steps")
		stepsGroup.GET("/:id", h.Steps.GetDomainsStep)
		stepsGroup.PUT("/", h.Steps.AddStep)
		stepsGroup.DELETE("/:id", h.Steps.DeleteStep)
		stepsGroup.POST("/", h.Steps.UpdateSteps)

		//answers
		answersGroup := api.Group("answers")
		answersGroup.GET("/:id", h.Answers.GetQuestionAnswers)
		answersGroup.PUT("/", h.Answers.AddAnswer)
		answersGroup.DELETE("/:id", h.Answers.DeleteAnswer)
		answersGroup.POST("/", h.Answers.UpdateAnswer)

		//leads
		leadsGroup := api.Group("lead")
		leadsGroup.GET("/:url", h.Leads.GetLeadsOfSite)
		leadsGroup.PUT("/", h.Leads.AddLead)
		leadsGroup.DELETE("/", h.Leads.DeleteLead)
		leadsGroup.POST("/", h.Leads.UpdateLeads)

		//organizations
		organizationsGroup := api.Group("organizations")
		organizationsGroup.GET("/", h.Organizations.GetOrganizations)
		organizationsGroup.GET("/:id", h.Organizations.GetOrganization)
		organizationsGroup.PUT("/", h.Organizations.AddOrganization)
		organizationsGroup.DELETE("/:id", h.Organizations.DeleteOrganization)
		organizationsGroup.POST("/", h.Organizations.UpdateOrganizations)

		//titles
		titlesGroup := api.Group("titles")
		titlesGroup.GET("/", h.Titles.GetTitlesList)
		titlesGroup.PUT("/", h.Titles.AddTitle)
		titlesGroup.DELETE("/", h.Titles.DeleteTitle)
		titlesGroup.POST("/", h.Titles.UpdateTitles)

		//users
		usersGroup := api.Group("users")
		usersGroup.GET("/", h.Users.GetUsersList)
		usersGroup.PUT("/", h.Users.AddUser)
		usersGroup.DELETE("/", h.Users.DeleteUser)
		usersGroup.POST("/", h.Users.UpdateUser)

		//templates
		templatesGroup := api.Group("templates")
		templatesGroup.GET("/", h.Templates.GetTemplatesList)

		api.GET("/ping", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"message": "i'm ok"})
		})
	}
}
