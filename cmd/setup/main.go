package main

import (
	"domain-server/internal/config"
	"domain-server/internal/logger"
	"domain-server/internal/repositories"

	mongo "github.com/globalsign/mgo"

	"github.com/sirupsen/logrus"
)

const (
	rootUser = "admin"
)

func main() {
	cfg, err := config.InitConfig("APP")
	if err != nil {
		logrus.Panic("error initializing config: %w", err)
	}
	logger := logger.NewLogger(cfg.ServiceName, cfg.LogLevel, cfg.GrayLogHost)
	sess, err := mongo.Dial(cfg.DSN)
	if err != nil {
		logger.GetInstance().Panic("error initializing config: %w", err)
	}
	repo := repositories.New(sess.DB("leadgen"), cfg)
	errC := AddRootUserIfNotExists(repo, cfg.InitialRootPassword)
	if errC != nil {
		logger.GetInstance().Fatal(err)
	}
	logger.GetInstance().Info("admin user exists or created")
}

func AddRootUserIfNotExists(repo *repositories.Repositories, pass string) error {
	user, errC := repo.Users.GetUserByLogin("admin")
	if errC == nil { //если админ есть, то не создаем
		return nil
	}
	user.Name = "Администратор"
	user.Login = "admin"
	user.Role = "admin"
	user.Pass = pass
	_, err := repo.Users.AddUser(user)
	if err != nil {
		return err
	}
	return nil
}
