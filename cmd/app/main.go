package main

import (
	"domain-server/internal/config"
	"domain-server/internal/handlers"
	"domain-server/internal/logger"
	"domain-server/internal/repositories"
	"domain-server/internal/repositories/domains"
	"domain-server/internal/services"

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
	logger := logger.NewLogger(cfg.ServiceName, cfg.LogLevel, cfg.GrayLogHost)
	logger.GetInstance().Info("server started")
	//logger.GetInstance().Info(cfg)
	sess, err := mongo.Dial(cfg.DSN)
	if err != nil {
		logger.GetInstance().Panic("error initializing config: %w", err)
	}
	repo := repositories.New(sess.DB("leadgen"), cfg)
	domainsList, err := GetAllDomainUrls(repo.Domains)
	if err != nil {
		logger.GetInstance().Panic("error initializing config: %w", err)
	}

	m := autocert.Manager{
		Prompt:     autocert.AcceptTOS,
		HostPolicy: autocert.HostWhitelist(domainsList...),
		Cache:      autocert.DirCache("./certs"),
	}
	router := gin.Default()
	servicesContainer := services.Setup(cfg)
	handlersService := handlers.New(router, repo, servicesContainer, logger)
	handlersService.Registry()
	logger.GetInstance().Panic(autotls.RunWithManager(router, &m))
}

func GetAllDomainUrls(repository domains.Repository) ([]string, error) {
	domains := []string{}
	listDomain, err := repository.GetAllDomains()
	if err != nil {
		return nil, err
	}
	for _, domain := range listDomain {
		domains = append(domains, domain.Url)
	}
	return domains, nil
}
