package handlers

import (
	"domain-server/internal/config"
	"domain-server/internal/handlers/auth"
	"domain-server/internal/handlers/cities"
	"domain-server/internal/handlers/domains"
	"domain-server/internal/handlers/jks"
	"domain-server/internal/handlers/leads"
	"domain-server/internal/handlers/locations"
	"domain-server/internal/handlers/organizations"
	"domain-server/internal/handlers/plans"
	"domain-server/internal/handlers/plans_sites"
	"domain-server/internal/handlers/proxy"
	"domain-server/internal/handlers/scenarios"
	"domain-server/internal/handlers/tasks"
	"domain-server/internal/handlers/template_prices"
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
	templatesFolder  = "./templates"
	moderationFolder = "./moderation"
)

type Handlers interface {
	Registry()
}

type handlers struct {
	Auth           auth.Handlers
	Domains        domains.Handlers
	Cities         cities.Handlers
	Locations      locations.Handlers
	Leads          leads.Handlers
	Organizations  organizations.Handlers
	Titles         titles.Handlers
	JKs            jks.Handlers
	Users          users.Handlers
	Templates      templates.Handlers
	PlansSites     plans_sites.Handlers
	Plans          plans.Handlers
	Scenarios      scenarios.Handlers
	Tasks          tasks.Handlers
	Proxy          proxy.Handlers
	TemplatePrices template_prices.Handlers
	router         *gin.Engine
	repositories   *repositories.Repositories
	services       *services.Services
	logger         logger.Log
}

func New(router *gin.Engine, repositories *repositories.Repositories, services *services.Services, logger logger.Log, cfg *config.Config) Handlers {
	return &handlers{
		Auth:           auth.New(repositories.Users, services, logger),
		Domains:        domains.New(repositories.Domains, repositories.Locations, repositories.Cities, repositories.Prices, repositories.Titles, repositories.Templates, repositories.Organizations, services, logger, cfg),
		Cities:         cities.New(repositories.Cities, services, logger),
		Locations:      locations.New(repositories.Locations, repositories.Cities, repositories.Prices, repositories.JK, services, logger),
		Leads:          leads.New(repositories.Leads, services, logger),
		Organizations:  organizations.New(repositories.Organizations, services, logger),
		Titles:         titles.New(repositories.Titles, services, logger),
		Users:          users.New(repositories.Users, services, logger),
		Templates:      templates.New(repositories.Templates, services, logger),
		PlansSites:     plans_sites.New(services, logger),
		Plans:          plans.New(services, logger),
		Scenarios:      scenarios.New(services, logger),
		Tasks:          tasks.New(services, logger),
		JKs:            jks.New(repositories.JK, logger),
		Proxy:          proxy.New(services, logger),
		TemplatePrices: template_prices.New(services, logger),
		router:         router,
		repositories:   repositories,
		services:       services,
		logger:         logger,
	}
}

func (h *handlers) Registry() {
	h.router.Static("/templates", templatesFolder)
	h.router.Static("/moderation", moderationFolder)
	h.router.Static("/admin", "./admin/build")
	h.router.Static("/plans_admin", "./plans_admin/build")
	h.router.Static("/file-store", "./file-store")
	h.router.LoadHTMLFiles("./admin/build/index.html", "./plans_admin/build/plans_admin.html", "./templates/plans_template/build/plans_template.html", "./templates/blue_template/build/blue_template.html", "./templates/wa_template/build/wa_template.html", "./templates/purple_template/build/purple_template.html", "./templates/test/build/test.html", "./moderation/template/moderation_1.html", "./moderation/template2/moderation_2.html", "./moderation/krd/krd.html", "./moderation/spb/spb.html")
	h.router.GET("/", h.Domains.GetTemplate)
	h.router.GET("/:rayon", h.Domains.GetTemplate)
	h.router.POST("/sign-in", h.Auth.SignIn)
	h.router.PUT("/lead/", h.Leads.AddLead)
	h.router.POST("/lead/", h.Leads.UpdateLeads)
	h.router.GET("/lead/", h.Leads.SendUnsendedLeadsToCrm)
	h.router.POST("/jks/", h.JKs.GetFilteredJKList)
	h.router.GET("/portal-info", h.Locations.UpdatePortalInfo)
	h.router.GET("/domain-city/:url", h.Domains.DomainsGetCityByUrl) //возвращает город домена, для want-result
	h.router.POST("/proxy", h.Proxy.ProxyRequest)
	h.router.GET("/tmp_prices/:id", h.TemplatePrices.GetTemplatePriceByCityID)

	/*zvonobot off
	//scenarios handlers
	scenariosGroup := h.router.Group("scenarios")
	scenariosGroup.PUT("/", h.Scenarios.AddScenario)
	scenariosGroup.GET("/", h.Scenarios.GetAllScenarios)
	scenariosGroup.POST("/", h.Scenarios.UpdateScenario)
	scenariosGroup.DELETE("/:id", h.Scenarios.DeleteScenario)

	//tasks handlers
	tasksGorup := h.router.Group("tasks")
	tasksGorup.GET("/", h.Tasks.GetAllUnfinishedTasks)
	tasksGorup.GET("/call", h.Tasks.MakeCalls)
	tasksGorup.POST("/amo/:scenarioID", h.Tasks.AmoTriggerHandler)
	tasksGorup.POST("/result/:result", h.Tasks.ResultHandler)
	tasksGorup.DELETE("/:id", h.Tasks.DeleteTask)*/

	h.router.GET("/api/plans-sites/:id", h.PlansSites.GetPlansSiteDetailInfo)

	api := h.router.Group("/api", middlewares.TokenAuthMiddleware(h.logger, h.services))
	{
		//domains
		domainsGroup := api.Group("domains")
		domainsGroup.PUT("/", h.Domains.CreateDomain)
		domainsGroup.POST("/list", h.Domains.GetDomainsList)
		domainsGroup.POST("/copy", h.Domains.CopyDomain)
		domainsGroup.POST("/", h.Domains.UpdateDomain)
		domainsGroup.POST("/moderation", h.Domains.DomainsModerationChange)
		domainsGroup.POST("/sendtocc", h.Domains.DomainSendToCallCenter)
		domainsGroup.DELETE("/:id", h.Domains.DeleteDomain)
		domainsGroup.GET("/:id", h.Domains.FindDomainByID)
		domainsGroup.POST("/add", h.Domains.AddDomainWithSettings)

		//cities
		citiesGroup := api.Group("cities")
		citiesGroup.GET("/", h.Cities.GetCitiesList)

		//locations
		locationsGroup := api.Group("locations")
		locationsGroup.GET("/raions/:id", h.Locations.GetRaionsOfTheCity)

		//leads
		leadsGroup := api.Group("lead")
		leadsGroup.GET("/:id", h.Leads.FindLeadByID)
		leadsGroup.POST("/list", h.Leads.GetLeadsList)
		leadsGroup.DELETE("/", h.Leads.DeleteLead)

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

		//plans_sites
		plansSitesGroup := api.Group("plans-sites")
		plansSitesGroup.GET("/", h.PlansSites.GetPlansSites)
		plansSitesGroup.PUT("/", h.PlansSites.AddPlansSite)
		plansSitesGroup.DELETE("/:id", h.PlansSites.DeletePlansSite)
		plansSitesGroup.POST("/", h.PlansSites.UpdatePlansSite)

		//plans
		plansGroup := api.Group("plans")
		plansGroup.PUT("/", h.Plans.AddPlans)
		plansGroup.DELETE("/:id", h.Plans.DeletePlans)
		plansGroup.POST("/", h.Plans.UpdatePlans)
		plansGroup.POST("/activity", h.Plans.UpdatePlansActivity)

		//template prices
		pricesGroup := api.Group("tmp_prices")
		pricesGroup.GET("/", h.TemplatePrices.GetTemplatesPricesList)
		pricesGroup.POST("/", h.TemplatePrices.UpdateTemplatePrices)

		api.GET("/ping", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"message": "i'm ok"})
		})
	}
}
