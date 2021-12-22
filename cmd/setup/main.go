package main

import (
	"domain-server/internal/config"
	"domain-server/internal/logger"
	"domain-server/internal/models"
	"domain-server/internal/repositories"
	"fmt"

	mongo "github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"

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

	AddFixtures(repo)
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

func AddFixtures(repo *repositories.Repositories) error {
	id1 := bson.NewObjectId()
	id2 := bson.NewObjectId()
	fmt.Println(id1)
	template1 := models.Template{
		ID:   id1,
		Name: "Синий квиз",
		Path: "templates/blue_react",
	}
	template2 := models.Template{
		ID:   id2,
		Name: "Фиолетовый квиз",
		Path: "templates/purple_react",
	}
	fmt.Println(id1.Hex())

	repo.Templates.AddTemplate(template1)
	repo.Templates.AddTemplate(template2)

	repo.Domains.AddDomain(models.Domain{
		Url:        "spb-novostroyka.ru",
		TemplateID: id1.Hex(),
	})
	repo.Domains.AddDomain(models.Domain{
		Url:        "msk-novostroyka.ru",
		TemplateID: id2.Hex(),
	})
	repo.Domains.AddDomain(models.Domain{
		Url:        "tula-novostroyka.ru",
		TemplateID: id2.Hex(),
	})
	repo.Domains.AddDomain(models.Domain{
		Url:        "nsk-novostroyka.ru",
		TemplateID: id1.Hex(),
	})
	repo.Domains.AddDomain(models.Domain{
		Url:        "perm-novostroyka.ru",
		TemplateID: id1.Hex(),
	})
	repo.Organizations.AddOrganization(models.Organization{
		ID:      bson.NewObjectId(),
		Name:    "Umbrella",
		Address: "Mayami, Baker St., 12",
	})
	repo.Organizations.AddOrganization(models.Organization{
		ID:      bson.NewObjectId(),
		Name:    "StarkIndustries",
		Address: "Smalvile, Main Street, 15",
	})
	return nil
}
