package main

import (
	"domain-server/internal/config"
	"domain-server/internal/logger"
	"domain-server/internal/models"
	"domain-server/internal/repositories"
	"domain-server/internal/services"
	"domain-server/internal/system/database/redis"
	"flag"
	"log"
	"os"

	mongo "github.com/globalsign/mgo"

	"github.com/sirupsen/logrus"
)

func main() {
	var action string
	flag.StringVar(&action, "action", "", "defines action need to do")
	flag.Parse()
	cfg, err := config.InitConfig("APP")
	if err != nil {
		logrus.Panic("error initializing config: %w", err)
	}
	fileLog, err := os.OpenFile("./vars/logs/command.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("error opening file: %v", err)
	}
	defer fileLog.Close()
	logger := logger.NewLogger(cfg.ServiceName, cfg.LogLevel, fileLog)

	redisClient, err := redis.New(cfg.RedisURL, cfg.RedisPass)
	if err != nil {
		logger.GetInstance().Fatalf("failed to init redis client: %s", err)
	}
	services := services.Setup(cfg, redisClient)
	sess, err := mongo.Dial(cfg.DSN)
	if err != nil {
		logger.GetInstance().Panic("error initializing config: %w", err)
	}
	repo := repositories.New(sess.DB("leadgen"), cfg)
	if action == "backup" {
		createBackup(services, logger)
	}
	if action == "leads" {
		sendLeads(services, repo, logger)
	}
	if action == "portal" {
		updatePortalInfo(services, repo, logger)
	}
}

func createBackup(services *services.Services, logger logger.Log) {
	err := services.Backup.CreateBackup()
	if err != nil {
		logger.GetInstance().Errorf(`error backuping db %s`, err)
		return
	}
	logger.GetInstance().Info(`successfuly created backup`)
}

func sendLeads(services *services.Services, repositories *repositories.Repositories, logger logger.Log) {
	leads, err := repositories.Leads.GetUnsendedLeads()
	if err != nil {
		logger.GetInstance().Errorf("error getting leads %s", err)
		return
	}
	for _, lead := range leads {

		if err := services.Portal.SendLeadToCrm(lead); err != nil {
			logger.GetInstance().Errorf("error sending leads %s", err)
			return
		}
		if err := repositories.Leads.MarkLeadAsSended(lead); err != nil {
			logger.GetInstance().Errorf("error updating lead %s", err)
			return
		}
	}

}

func updatePortalInfo(services *services.Services, repositories *repositories.Repositories, logger logger.Log) {
	CitiesUpdate(services, repositories, logger)
	LocationsUpdate(services, repositories, logger)
	RayonUpdatePrices(services, repositories, logger)
	JKsUpdate(services, repositories, logger)
	//logger.GetInstance().Info(`successfuly updated portal info`)
}

func JKsUpdate(services *services.Services, repositories *repositories.Repositories, logger logger.Log) {
	citiesList, err := repositories.Cities.GetAllCities()
	if err != nil {
		logger.GetInstance().Errorf("error getting jks from portal %s", err)
		return
	}
	jkList, err := services.Portal.GetJkList(citiesList)
	if err != nil {
		logger.GetInstance().Errorf("error getting jks from portal %s", err)
		return
	}
	repositories.JK.DropDB()
	for _, jk := range jkList {
		err := repositories.JK.AddJK(jk)
		if err != nil {
			logger.GetInstance().Errorf("error adding jks %s", err)
			return
		}
	}
}

func CitiesUpdate(services *services.Services, repositories *repositories.Repositories, logger logger.Log) {
	cities, err := services.Portal.GetCitiesList()
	if err != nil {
		logger.GetInstance().Errorf("error getting cities from portal %s", err)
		return
	}

	if err := repositories.Cities.UpdateCities(cities); err != nil {
		logger.GetInstance().Errorf("error updating cities  %s", err)
		return
	}
}

func LocationsUpdate(services *services.Services, repositories *repositories.Repositories, logger logger.Log) {
	locations, err := services.Portal.GetAllCitiesLocations()
	if err != nil {
		logger.GetInstance().Errorf("error getting locations from portal %s", err)
		return
	}
	cities, err := repositories.Cities.GetAllCities()
	if err != nil {
		logger.GetInstance().Errorf("error getting locations from portal %s", err)
		return
	}
	locationsInsert := []models.Location{}
	for _, location := range locations {
		for _, city := range cities {
			if city.PortalID == location.PortalCityID {
				location.CityID = city.ID
				locationsInsert = append(locationsInsert, location)
				break
			}
		}
	}
	if errn := repositories.Locations.UpdateLocations(locationsInsert); errn != nil {
		logger.GetInstance().Errorf("error updating locations  %s", errn)
		return
	}
}

func RayonUpdatePrices(services *services.Services, repositories *repositories.Repositories, logger logger.Log) {
	prices, _ := services.Portal.GetCitiesPrices()
	pricesIn := []map[string]interface{}{}
	for _, price := range prices {
		city, _ := repositories.Cities.GetCityByPortalId(price["portal_city_id"].(string))
		price["_id"] = city.ID
		pricesIn = append(pricesIn, price)
	}

	repositories.Prices.AddPrices(pricesIn)
}
