package main

import (
	"context"
	"domain-server/internal/config"
	"domain-server/internal/logger"
	"domain-server/internal/models"
	"domain-server/internal/repositories"
	"domain-server/internal/services"
	"domain-server/internal/system/database/redis"
	"flag"
	"fmt"
	"log"
	"os"

	mongo "github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"

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

	//очищаем редис
	redisClient.GetConnection().FlushAll(context.Background())
	sess, err := mongo.Dial(cfg.DSN)
	if err != nil {
		logger.GetInstance().Panic("error initializing config: %w", err)
	}

	repo := repositories.New(sess.DB("leadgen"), cfg)

	services := services.Setup(cfg, *repo, redisClient, logger)

	if action == "backup" {
		createBackup(services, logger)
	}
	if action == "leads" {
		sendLeads(services, repo, logger)
	}
	if action == "portal" {
		updatePortalInfo(services, repo, logger)
	}
	if action == "prices" {
		RayonUpdatePrices(services, repo, logger)
	}
	if action == "admin" {
		AddRootUserIfNotExists(repo, cfg.InitialRootPassword, logger)
	}
	if action == "fixtures" {
		addTemplates(services, repo, logger)
	}
	if action == "group-changes" {
		groupChanges(services, repo, logger)
	}
}

func groupChanges(service *services.Services, repositories *repositories.Repositories, logger logger.Log) {
	prices := []models.TemplatePrice{
		{
			ID:       bson.NewObjectId(),
			CityID:   bson.ObjectIdHex("61d08c81d447fb00010754e8"), //мск
			MinPrice: 20000000,
			MaxPrice: 150000000,
		},
		{
			ID:       bson.NewObjectId(),
			CityID:   bson.ObjectIdHex("61d08c81d447fb0001075551"), //питер
			MinPrice: 3000000,
			MaxPrice: 15000000,
		},
		{
			ID:       bson.NewObjectId(),
			CityID:   bson.ObjectIdHex("61d08c81d447fb0001075548"), //новосиб
			MinPrice: 3000000,
			MaxPrice: 15000000,
		},
		{
			ID:       bson.NewObjectId(),
			CityID:   bson.ObjectIdHex("61d08c81d447fb00010754da"), //тула
			MinPrice: 3000000,
			MaxPrice: 15000000,
		},
		{
			ID:       bson.NewObjectId(),
			CityID:   bson.ObjectIdHex("61d08c81d447fb0001075564"), //крд
			MinPrice: 3000000,
			MaxPrice: 15000000,
		},
		{
			ID:       bson.NewObjectId(),
			CityID:   bson.ObjectIdHex("61d08c81d447fb0001075567"), //пермь
			MinPrice: 3000000,
			MaxPrice: 15000000,
		},
		{
			ID:       bson.NewObjectId(),
			CityID:   bson.ObjectIdHex("61d08c81d447fb000107556b"), //ростов
			MinPrice: 3000000,
			MaxPrice: 15000000,
		},
		{
			ID:       bson.NewObjectId(),
			CityID:   bson.ObjectIdHex("61d08c81d447fb000107554c"), //екб
			MinPrice: 3000000,
			MaxPrice: 15000000,
		},
		{
			ID:       bson.NewObjectId(),
			CityID:   bson.ObjectIdHex("61d08c81d447fb000107554e"), //voronezh
			MinPrice: 3000000,
			MaxPrice: 15000000,
		},
	}
	fmt.Println("sdsd")
	service.TempltePrices.AddTemplatePricesList(prices)
}

func addTemplates(service *services.Services, repositories *repositories.Repositories, logger logger.Log) {
	template := models.Template{
		ID:   bson.NewObjectId(),
		Name: "Фиолетовый квиз",
		Path: "purple_template.html",
	}
	_, err := repositories.Templates.AddTemplate(template)
	if err != nil {
		logger.GetInstance().Errorf(`ошибка при добавлении шаблона %s`, err)
		return
	}
	logger.GetInstance().Info(`шаблон успешно добавлен`)
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
	JKsUpdate(services, repositories, logger)
	logger.GetInstance().Info(`successfuly updated portal info`)
}

func JKsUpdate(services *services.Services, repositories *repositories.Repositories, logger logger.Log) {
	repositories.JK.DropDB()
	citiesList, err := repositories.Cities.GetAllCities()
	if err != nil {
		logger.GetInstance().Errorf("error getting jks from portal %s", err)
		return
	}
	jkList, err := services.Portal.GetJkListAlt(citiesList)
	if err != nil {
		logger.GetInstance().Errorf("error getting jks from portal %s", err)
		return
	}
	for _, jk := range jkList {
		jkS, err := repositories.JK.GetJKByPortalId(jk.Portal_ID)
		if err == nil {
			//если жк уже есть в базе, то обновляем его
			jk.ID = jkS.ID
			err := repositories.JK.UpdateJK(jk)
			if err != nil {
				logger.GetInstance().Errorf("error updating jk jks %s", err)
				return
			}
		} else {
			//если нету в базу, то добавляем
			err := repositories.JK.AddJK(jk)
			if err != nil {
				logger.GetInstance().Errorf("error adding jks %s", err)
				return
			}
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

func AddRootUserIfNotExists(repo *repositories.Repositories, pass string, logger logger.Log) error {
	user := models.User{}
	user.Name = "Администратор"
	user.Login = "admin"
	user.Role = "admin"
	user.Pass = pass
	_, err := repo.Users.AddUser(user)
	if err != nil {
		logger.GetInstance().Errorf("error creating user  %s", err)
		return err
	}
	return nil
}
