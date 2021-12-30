package main

import (
	"domain-server/internal/config"
	"domain-server/internal/logger"
	"domain-server/internal/services"
	"domain-server/internal/system/database/redis"
	"log"
	"os"

	"github.com/sirupsen/logrus"
)

func main() {
	cfg, err := config.InitConfig("APP")
	if err != nil {
		logrus.Panic("error initializing config: %w", err)
	}
	fileLog, err := os.OpenFile("./vars/logs/log.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("error opening file: %v", err)
	}
	defer fileLog.Close()
	logger := logger.NewLogger(cfg.ServiceName, cfg.LogLevel, fileLog)

	logger.GetInstance().Info("admin user exists or created")
	redisClient, err := redis.New(cfg.RedisURL, cfg.RedisPass)
	if err != nil {
		logger.GetInstance().Fatalf("failed to init redis client: %s", err)
	}
	services := services.Setup(cfg, redisClient)
	services.Backup.CreateBackup()

}