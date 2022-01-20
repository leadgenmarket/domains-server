package leads

import (
	"domain-server/internal/models"
	"domain-server/pkg/minquery"
	"time"

	mongodb "github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
)

type Repository interface {
	AddLead(lead map[string]interface{}) (bson.ObjectId, error)
	GetLeadsOfSite(id string) ([]models.Lead, error)
	UpdateLead(lead models.Lead) error
	DeleteLead(id string) error
	MarkLeadAsSended(lead map[string]interface{}) error
	GetUnsendedLeads() ([]map[string]interface{}, error)
	GetLeadsListWithPaginationAndFiltered(searchPhone string, cursor string, itemsCnt int) (leads []map[string]interface{}, newCursor string, err error)
	FindLeadByID(id string) (map[string]interface{}, error)
}

type repositroyDB struct {
	leads *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	return &repositroyDB{
		leads: dbClient.C("leads"),
	}
}

func (r *repositroyDB) FindLeadByID(id string) (map[string]interface{}, error) {
	var lead map[string]interface{}
	err := r.leads.Find(bson.M{"_id": bson.ObjectIdHex(id)}).One(&lead)
	if err != nil {
		return lead, err
	}
	return lead, nil
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

func (r *repositroyDB) GetLeadsListWithPaginationAndFiltered(searchPhone string, cursor string, itemsCnt int) (leads []map[string]interface{}, newCursor string, err error) {
	hint := map[string]int{"_id": 1}
	query := minquery.NewWithHint(r.leads.Database, "leads", bson.M{"phone": bson.M{"$regex": searchPhone}}, hint).Sort("-_id").Limit(itemsCnt)
	if cursor != "" {
		query = query.Cursor(cursor)
	}
	newCursor, err = query.All(&leads, "_id")
	return
}

func (r *repositroyDB) MarkLeadAsSended(lead map[string]interface{}) error {
	lead["sended_to_crm"] = true
	err := r.leads.Update(bson.M{"_id": lead["_id"]}, lead)
	if err != nil {
		return err
	}
	return nil
}

func (r *repositroyDB) GetUnsendedLeads() ([]map[string]interface{}, error) {
	leads := []map[string]interface{}{}
	//надо ставить флаг и время отправки
	err := r.leads.Find(bson.M{"sended_to_crm": false}).All(&leads)
	if err != nil {
		return leads, err
	}

	return leads, nil
}
