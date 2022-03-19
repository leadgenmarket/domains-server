package main

import (
	"domain-server/internal/config"
	"domain-server/internal/handlers"
	"domain-server/internal/logger"
	"domain-server/internal/repositories"
	"domain-server/internal/repositories/domains"
	"domain-server/internal/services"
	"domain-server/internal/system/database/redis"
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/autotls"
	"github.com/gin-gonic/gin"
	mongo "github.com/globalsign/mgo"
	"github.com/sirupsen/logrus"
	"golang.org/x/crypto/acme/autocert"
)

func main() {
	cfg, err := config.InitConfig("APP")
	if err != nil {
		logrus.Panic("error initializing config: %w", err)
	}
	fileLog, err := os.OpenFile("./vars/logs/main.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("error opening file: %v", err)
	}
	defer fileLog.Close()
	logger := logger.NewLogger(cfg.ServiceName, cfg.LogLevel, fileLog)
	logger.GetInstance().Info("server started")
	//logger.GetInstance().Info(cfg)
	sess, err := mongo.Dial(cfg.DSN)
	if err != nil {
		logger.GetInstance().Panic("error initializing config: %w", err)
	}

	router := gin.Default()
	redisClient, err := redis.New(cfg.RedisURL, cfg.RedisPass)
	if err != nil {
		logger.GetInstance().Fatalf("failed to init redis client: %s", err)
	}
	repo := repositories.New(sess.DB("leadgen"), cfg)

	domainsList, err := GetAllDomainUrls(repo.Domains, cfg.AdminUrl)
	if err != nil {
		logger.GetInstance().Panic("error initializing config: %w", err)
	}

	m := autocert.Manager{
		Prompt:     autocert.AcceptTOS,
		HostPolicy: autocert.HostWhitelist(domainsList...),
		Cache:      autocert.DirCache("./certs"),
	}
	servicesContainer := services.Setup(cfg, *repo, redisClient)
	handlersService := handlers.New(router, repo, servicesContainer, logger, cfg)
	handlersService.Registry()
	if cfg.SSLServing {
		logger.GetInstance().Panic(autotls.RunWithManager(router, &m))
	} else {
		router.Run(fmt.Sprintf(":%s", cfg.Port))
	}
}

func GetAllDomainUrls(repository domains.Repository, serversIP string) ([]string, error) {
	domains := []string{serversIP, "plans.leadactiv.ru"}
	listDomain, err := repository.GetAllDomains()
	if err != nil {
		return nil, err
	}
	for _, domain := range listDomain {
		domains = append(domains, domain.Url)
	}
	return domains, nil
}
