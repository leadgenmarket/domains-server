package domains

import (
	"domain-server/internal/models"
	"fmt"
	"time"

	mongodb "github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
)

const (
	defaultMainColor      = "5ABBB0"
	defaultSecondaryColor = "27353E"
)

type Repository interface {
	AddDomain(domain models.Domain) (_ models.Domain, err error)
	FindDomainByUrl(url string) (_ models.Domain, err error)
	GetAllDomains() ([]models.Domain, error)
	UpdateDomain(domain models.Domain) error
	FindDomainByID(id string) (models.Domain, error)
	DeleteDomainById(id string) error
}

type repositroyDB struct {
	domains *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	urlIndex := mongodb.Index{
		Key:    []string{"url", "Url"},
		Unique: true,
		Name:   "url",
	}
	domains := dbClient.C("domains")
	domains.EnsureIndex(urlIndex)
	return &repositroyDB{
		domains: domains,
	}
}

func (r *repositroyDB) AddDomain(domain models.Domain) (models.Domain, error) {
	domain.ID = bson.NewObjectId()
	domain.CreatedAt = time.Now()
	domain.UpdatedAt = time.Now()

	if len(domain.Steps) == 0 {
		domain.Steps = r.GetDefaultSteps()
	}
	if len(domain.MainColor) == 0 {
		domain.MainColor = defaultMainColor
	}
	if len(domain.SecondaryColor) == 0 {
		domain.SecondaryColor = defaultSecondaryColor
	}
	err := r.domains.Insert(&domain)
	if err != nil {
		return domain, err
	}
	return domain, nil
}

func (r *repositroyDB) FindDomainByUrl(url string) (models.Domain, error) {
	var domain models.Domain
	err := r.domains.Find(bson.M{"url": url}).One(&domain)
	if err != nil {
		return domain, err
	}
	return domain, nil
}

func (r *repositroyDB) FindDomainByID(id string) (models.Domain, error) {
	var domain models.Domain
	err := r.domains.Find(bson.M{"_id": bson.ObjectIdHex(id)}).One(&domain)
	if err != nil {
		return domain, err
	}
	return domain, nil
}

func (r *repositroyDB) UpdateDomain(domain models.Domain) error {
	domain.CreatedAt = time.Now()
	domain.UpdatedAt = time.Now()
	err := r.domains.Update(bson.M{"_id": domain.ID}, domain)
	if err != nil {
		fmt.Println(err)
		return err
	}
	return nil
}

func (r *repositroyDB) GetAllDomains() ([]models.Domain, error) {
	domains := []models.Domain{}
	err := r.domains.Pipe([]bson.M{{"$sort": bson.M{"created_at": -1}}}).All(&domains)
	if err != nil {
		return domains, err
	}
	return domains, nil
}

func (r *repositroyDB) DeleteDomainById(id string) error {
	err := r.domains.Remove(bson.M{"_id": bson.ObjectIdHex(id)})
	if err != nil {
		return err
	}
	return nil
}

func (r *repositroyDB) GetDefaultDomainSettingsForCity(url string, templateID bson.ObjectId, userID bson.ObjectId, cityID bson.ObjectId, yandex string, google string) *models.Domain {
	domain := models.Domain{
		ID:             bson.NewObjectId(),
		Url:            url,
		TemplateID:     templateID,
		CreatedBy:      userID,
		CityID:         cityID,
		Background:     "",
		MainColor:      defaultMainColor,
		SecondaryColor: defaultSecondaryColor,
		Yandex:         yandex,
		Google:         google,
		Mail:           "",
		Marquiz:        "",
		Steps:          r.GetDefaultSteps(),
		OrganizationID: "",
		Qoopler:        false,
	}
	return &domain
}

func (r *repositroyDB) GetDefaultSteps() []map[string]interface{} {
	return []map[string]interface{}{
		{
			"title": "Выберите районы",
			"type":  "raions",
		},
		{
			"title": "Сколько комнат Вам нужно?",
			"type":  "rooms",
		},
		{
			"title": "Когда жилой комплекс должен быть сдан?",
			"type":  "sdacha",
			"answers": []string{
				"ЖК сдается в 2022 году",
				"ЖК сдается в 2023 году",
				"ЖК сдается в 2024 году",
				"ЖК сдается в 2025 году",
				"ЖК сдается в 2026 году",
			},
		},
		{
			"title": "Укажите максимальную стоимость квартиры, выше которой вы не готовы рассматривать предложения",
			"type":  "slider_r",
		},
	}
}
