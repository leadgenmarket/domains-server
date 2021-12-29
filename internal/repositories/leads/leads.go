package leads

import (
	"domain-server/internal/models"
	"time"

	mongodb "github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
)

type Repository interface {
	AddLead(lead map[string]interface{}) (bson.ObjectId, error)
	GetLeadsOfSite(id string) ([]models.Lead, error)
	UpdateLead(lead models.Lead) error
	DeleteLead(id string) error
}

type repositroyDB struct {
	leads *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	return &repositroyDB{
		leads: dbClient.C("leads"),
	}
}

func (r *repositroyDB) AddLead(lead map[string]interface{}) (bson.ObjectId, error) {
	leadID := bson.NewObjectId()
	lead["_id"] = leadID
	lead["created_at"] = time.Now()
	lead["sended_to_crm"] = false
	err := r.leads.Insert(&lead)
	if err != nil {
		return leadID, err
	}
	return leadID, nil
}

func (r *repositroyDB) UpdateLead(lead models.Lead) error {
	err := r.leads.Update(bson.M{"_id": lead.ID}, lead)
	if err != nil {
		return err
	}
	return nil
}

func (r *repositroyDB) DeleteLead(id string) error {
	err := r.leads.Remove(bson.M{"_id": bson.ObjectIdHex(id)})
	if err != nil {
		return err
	}
	return nil
}

func (r *repositroyDB) GetLeadsOfSite(url string) ([]models.Lead, error) {
	leads := []models.Lead{}
	err := r.leads.Find(bson.M{"url": url}).All(&leads)
	if err != nil {
		return leads, err
	}
	return leads, nil
}

func (r *repositroyDB) SendUnsendedLeadsToCrm() {
	//надо ставить флаг и время отправки
}
