package domains

import (
	"domain-server/internal/models"
	"fmt"
	"time"

	mongodb "github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
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
	err := r.domains.Update(bson.M{"_id": domain.ID}, domain)
	if err != nil {
		fmt.Println(err)
		return err
	}
	return nil
}

func (r *repositroyDB) GetAllDomains() ([]models.Domain, error) {
	domains := []models.Domain{}
	err := r.domains.Find(bson.M{}).All(&domains)
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
