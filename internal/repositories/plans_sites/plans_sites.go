package plans_sites

import (
	"domain-server/internal/models"

	mongodb "github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
)

const (
	plansSiteTable = "plans_sites"
)

type Repository interface {
	AddPlansSite(plansSite models.PlansSite) error
	UpdatePlansSite(plansSite models.PlansSite) error
	DeletePlansSite(plansSiteID string) error
}

type repository struct {
	plansSite *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	return &repository{
		plansSite: dbClient.C(plansSiteTable),
	}
}

func (r *repository) AddPlansSite(plansSite models.PlansSite) error {
	err := r.plansSite.Insert(&plansSite)
	if err != nil {
		return err
	}
	return nil
}

func (r *repository) UpdatePlansSite(plansSite models.PlansSite) error {
	err := r.plansSite.Update(bson.M{"_id": plansSite.ID}, plansSite)
	if err != nil {
		return err
	}
	return nil
}

func (r *repository) DeletePlansSite(id string) error {
	err := r.plansSite.Remove(bson.M{"_id": bson.ObjectIdHex(id)})
	if err != nil {
		return err
	}
	return nil
}
