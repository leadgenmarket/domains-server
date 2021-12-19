package main

import (
	"domain-server/internal/config"
	"domain-server/internal/handlers"
	"domain-server/internal/logger"
	"domain-server/internal/repositories"
	"domain-server/internal/services"
	"fmt"

	"github.com/gin-gonic/gin"
	mongo "github.com/globalsign/mgo"
	"github.com/sirupsen/logrus"
)

func main() {
	cfg, err := config.InitConfig("APP")
	if err != nil {
		logrus.Panic("error initializing config: %w", err)
	}
	logger := logger.NewLogger(cfg.ServiceName, cfg.LogLevel, cfg.GrayLogHost)
	logger.GetInstance().Info("server started")
	sess, err := mongo.Dial(cfg.DSN)
	if err != nil {
		logger.GetInstance().Panic("error initializing config: %w", err)
	}
	repo := repositories.New(sess.DB("leadgen"))
	router := gin.Default()
	servicesContainer := services.Setup(cfg)
	handlersService := handlers.New(router, repo, servicesContainer, logger)
	handlersService.Registry()
	router.Run(fmt.Sprintf(":%s", cfg.Port))
}
