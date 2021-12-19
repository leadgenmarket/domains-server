package handlers

import (
	"domain-server/internal/handlers/cities"
	"domain-server/internal/handlers/domains"
	"domain-server/internal/handlers/locations"
	"domain-server/internal/handlers/settings"
	"domain-server/internal/logger"
	"domain-server/internal/repositories"

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
	Domains      domains.Handlers
	Cities       cities.Handlers
	Locations    locations.Handlers
	Settings     settings.Handlers
	router       *gin.Engine
	repositories *repositories.Repositories
	services     *services.Services
	logger       logger.Log
}

func New(router *gin.Engine, repositories *repositories.Repositories, services *services.Services, logger logger.Log) Handlers {
	return &handlers{
		Domains:      domains.New(repositories.Domains, logger),
		Cities:       cities.New(repositories.Cities, services, logger),
		Locations:    locations.New(repositories.Locations, services, logger),
		Settings:     settings.New(repositories.Settings, services, logger),
		router:       router,
		repositories: repositories,
		services:     services,
		logger:       logger,
	}
}

func (h *handlers) Registry() {
	h.router.Static("/templates", templatesFolder)
	h.router.LoadHTMLFiles("./templates/aivazovskiy/aivazovskiy.html")
	h.router.GET("/", h.Domains.GetTemplate)
	domainsGroup := h.router.Group("domains")
	domainsGroup.PUT("/", h.Domains.CreateDomain)
	domainsGroup.GET("/", h.Domains.GetDomainsList)
	domainsGroup.POST("/", h.Domains.UpdateDomain)
	domainsGroup.DELETE("/", h.Domains.DeleteDomain)
	domainsGroup.GET("/:url", h.Domains.FindDomainByURL)
	citiesGroup := h.router.Group("cities")
	citiesGroup.GET("/", h.Cities.GetCitiesList)
	citiesGroup.GET("/update", h.Cities.UpdateCities)
	locationsGroup := h.router.Group("locations")
	locationsGroup.GET("/", h.Locations.GetLocationsList)
	locationsGroup.GET("/update", h.Locations.UpdateLocations)
	settingsGroup := h.router.Group("settings")
	settingsGroup.PUT("/", h.Settings.AddSettings)
	settingsGroup.GET("/:id", h.Settings.GetDomainsSettings)
	settingsGroup.DELETE("/:id", h.Settings.DeleteSettings)
	settingsGroup.POST("/", h.Settings.UpdateSettings)
}
