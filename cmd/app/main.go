package main

import (
	"domain-server/internal/config"
	"domain-server/internal/logger"

	"github.com/sirupsen/logrus"
)

func main() {
	cfg, err := config.InitConfig("APP")
	if err != nil {
		logrus.Panic("error initializing config: %w", err)
	}
	logger := logger.NewLogger(cfg.ServiceName, cfg.LogLevel, cfg.GrayLogHost)
	logger.GetInstance().Info("server started")

}
