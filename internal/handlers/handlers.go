package handlers

import (
	"domain-server/internal/config"
	"domain-server/internal/handlers/auth"
	"domain-server/internal/handlers/cities"
	"domain-server/internal/handlers/domains"
	"domain-server/internal/handlers/leads"
	"domain-server/internal/handlers/locations"
	"domain-server/internal/handlers/organizations"
	"domain-server/internal/handlers/prices"
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
	Leads         leads.Handlers
	Organizations organizations.Handlers
	Titles        titles.Handlers
	Users         users.Handlers
	Templates     templates.Handlers
	Prices        prices.Handlers
	router        *gin.Engine
	repositories  *repositories.Repositories
	services      *services.Services
	logger        logger.Log
	cfg           *config.Config
}

func New(router *gin.Engine, repositories *repositories.Repositories, services *services.Services, logger logger.Log, cfg *config.Config) Handlers {
	return &handlers{
		Auth:          auth.New(repositories.Users, services, logger),
		Domains:       domains.New(repositories.Domains, repositories.Locations, repositories.Cities, repositories.Prices, repositories.Titles, services, logger, cfg),
		Cities:        cities.New(repositories.Cities, services, logger),
		Locations:     locations.New(repositories.Locations, repositories.Cities, services, logger),
		Leads:         leads.New(repositories.Leads, services, logger),
		Organizations: organizations.New(repositories.Organizations, services, logger),
		Titles:        titles.New(repositories.Titles, services, logger),
		Users:         users.New(repositories.Users, services, logger),
		Templates:     templates.New(repositories.Templates, services, logger),
		Prices:        prices.New(repositories.Prices, repositories.Cities, services, logger),
		router:        router,
		repositories:  repositories,
		services:      services,
		logger:        logger,
	}
}

func (h *handlers) Registry() {
	h.router.Static("/templates", templatesFolder)
	h.router.Static("/admin", "./admin/build")
	h.router.Static("/file-store", "./file-store")
	h.router.LoadHTMLFiles("./templates/blue_template/build/blue_template.html")
	h.router.GET("/", h.Domains.GetTemplate)
	h.router.GET("/:rayon", h.Domains.GetTemplate)
	h.router.POST("/sign-in", h.Auth.SignIn)
	h.router.PUT("/lead/", h.Leads.AddLead)
	h.router.POST("/lead/", h.Leads.UpdateLeads)
	h.router.GET("/prices/update", h.Prices.UpdatePrices)

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
		locationsGroup.GET("/update", h.Locations.UpdateLocations)
		locationsGroup.GET("/raions/:id", h.Locations.GetRaionsOfTheCity)

		//leads
		leadsGroup := api.Group("lead")
		leadsGroup.GET("/:url", h.Leads.GetLeadsOfSite)
		leadsGroup.DELETE("/", h.Leads.DeleteLead)
		leadsGroup.GET("/send", h.Leads.SendUnsendedLeads)

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
		titlesGroup.DELETE("/:id", h.Titles.DeleteTitle)
		titlesGroup.POST("/", h.Titles.UpdateTitles)

		//users
		/*usersGroup := api.Group("users")
		usersGroup.GET("/", h.Users.GetUsersList)
		usersGroup.PUT("/", h.Users.AddUser)
		usersGroup.DELETE("/", h.Users.DeleteUser)
		usersGroup.POST("/", h.Users.UpdateUser)*/

		//templates
		templatesGroup := api.Group("templates")
		templatesGroup.GET("/", h.Templates.GetTemplatesList)

		api.GET("/ping", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"message": "i'm ok"})
		})
	}
}
