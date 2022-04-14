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
	photosList := map[string]string{
		"0335e6e5-4ac7-401d-768a-9a9b3af6a7a6.jpg": "37e6f2ab-f875-42e8-4afb-06e3ef4fc19d.jpg",
		"1db09209-6f37-47e7-6209-a4b78def7f14.jpg": "15ccdd59-3537-4a2d-617b-4bded9aa725d.jpg",
		"2ed66b5c-9430-413e-50b0-37a5b0bb2e83.jpg": "620444d8-7c00-4ab1-42ab-f2ed5d294a91.jpg",
		"4433b4c2-3a6c-4435-79d3-544d24032d12.jpg": "25da08b3-88a4-4754-61af-1948f6410f40.jpg",
		"51af264b-092f-49c9-4aad-d8d241de9911.jpg": "4703b130-56b8-4caf-535b-1bb47cbf4595.jpg",
		"5704e1ac-c083-41ec-62e3-19d397043477.jpg": "e09aa5d1-6af1-48d3-544a-09aba87966b0.jpg",
		"8ea40b23-4b31-4dc6-7dbc-70ef78c19cf3.jpg": "a36a5347-b8af-499b-6636-dd6d0db1bbe9.jpg",
		"9f924e9d-17e1-4695-6e58-0181808e6a56.jpg": "b626bf49-f4eb-4386-7fbe-1a87cdc6c3b1.jpg",
		"a119f9e2-a29e-47c4-75dd-72e007f60321.jpg": "e52b5b08-d45d-431a-5d9f-c62ca1c47351.jpg",
		"a8db1ef5-3315-40e9-79de-e729d68dc848.jpg": "681c5244-b482-4759-760f-8f207151119b.jpg",
		"b12772ed-882a-472f-4397-1b12eacf8aa8.jpg": "5abee28f-cf4d-44b3-63a6-3b26e529addc.jpg",
		"bdccfde9-4e1f-40db-4799-00481e556336.jpg": "6da11786-2022-4b33-65e8-91c09bb6eabf.jpg",
		"d4a33eb3-58ae-4068-7f04-757f0a50b9d1.jpg": "6bcf535e-ac41-4a0a-4e7a-a10eb5ce4a76.jpg",
		"dddf2935-3256-46a5-78c7-d600b1bdf1ee.jpg": "29af265f-97e1-4e6f-7884-c25df7e0dc04.jpg",
		"de07fa67-e344-45ef-5766-f5d9d81603c8.jpg": "2982b538-b1c4-4c03-61ef-908b78014113.jpg",
	}
	//меняем фотки в галлерее для всех кастомных шаблонов по москве
	changePhotosForGallery(photosList, "61d08c81d447fb00010754e8", "62039046aeeff2000163bcbf", repositories)

}

func changePhotosForGallery(newPhotoList map[string]string, cityID string, templateID string, repositories *repositories.Repositories) {
	domains, err := repositories.Domains.GetDomainsByTemplateAndCity(bson.ObjectIdHex("61d08c81d447fb00010754e8"), bson.ObjectIdHex("62039046aeeff2000163bcbf"))
	if err != nil {
		fmt.Println(err)
		return
	}
	for _, domain := range domains {
		domain.Photos = newPhotoList
		err := repositories.Domains.UpdateDomain(domain)
		if err != nil {
			fmt.Println(err)
			return
		}
	}
	fmt.Println(fmt.Sprintf("done for %d domains", len(domains)))
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
