package domains

import (
	"domain-server/internal/models"
	"fmt"
	"time"

	"domain-server/pkg/minquery"

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
	UpdateDomainsModeration(id string, modearation bool) (string, error)
	CopyDomain(id string, newDomainName string, yandex string) (models.Domain, error)
	GetDomainsListWithPaginationAndFiltered(searchUrl string, cursor string, itemsCnt int) (domains []models.Domain, newCursor string, err error)
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
	index := mongodb.Index{
		Key: []string{"-created_at", "url", "_id"},
	}
	domains := dbClient.C("domains")
	domains.DropAllIndexes()
	domains.EnsureIndex(urlIndex)
	domains.EnsureIndex(index)

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
	domainOld, err := r.FindDomainByID(domain.ID.Hex())
	if err != nil {
		return err
	}
	domain.CreatedAt = domainOld.CreatedAt
	domain.UpdatedAt = time.Now()

	if domain.Background == "" {
		domain.Background = domainOld.Background
	}

	if domain.AdvantagesTitle == "" {
		domain.AdvantagesTitle = domainOld.AdvantagesTitle
	}
	if len(domain.Advantages) == 0 {
		domain.Advantages = domainOld.Advantages
	}
	if domain.PlansTitle == "" {
		domain.PlansTitle = domainOld.PlansTitle
	}
	if len(domain.Plans) == 0 {
		domain.Plans = domainOld.Plans
	}
	if domain.PhotosTitle == "" {
		domain.PhotosTitle = domainOld.PhotosTitle
	}
	if len(domain.Photos) == 0 {
		domain.Photos = domainOld.Photos
	}

	err = r.domains.Update(bson.M{"_id": domain.ID}, domain)
	if err != nil {
		fmt.Println(err)
		return err
	}
	return nil
}

func (r *repositroyDB) GetDomainsListWithPaginationAndFiltered(searchUrl string, cursor string, itemsCnt int) (domains []models.Domain, newCursor string, err error) {
	hint := map[string]int{"created_at": -1, "url": 1, "_id": 1}
	query := minquery.NewWithHint(r.domains.Database, "domains", bson.M{"url": bson.M{"$regex": searchUrl}}, hint).Sort("-created_at", "url", "_id").Limit(itemsCnt)
	if cursor != "" {
		query = query.Cursor(cursor)
	}
	newCursor, err = query.All(&domains, "created_at", "url", "_id")
	return
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

func (r *repositroyDB) UpdateDomainsModeration(id string, modearation bool) (string, error) {
	domain, err := r.FindDomainByID(id)
	if err != nil {
		return "", err
	}
	domain.UpdatedAt = time.Now()
	domain.Moderation = modearation
	err = r.domains.Update(bson.M{"_id": domain.ID}, domain)
	if err != nil {
		return "", err
	}
	return domain.Url, nil
}

func (r *repositroyDB) CopyDomain(id string, newDomainName string, yandex string) (models.Domain, error) {
	domain, err := r.FindDomainByID(id)
	if err != nil {
		return domain, err
	}
	fmt.Println(domain)
	domain.CreatedAt = time.Now()
	domain.UpdatedAt = time.Now()
	domain.Url = newDomainName
	domain.Yandex = yandex
	domain.ID = bson.NewObjectId()
	err = r.domains.Insert(&domain)
	if err != nil {
		return domain, err
	}
	return domain, nil
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
