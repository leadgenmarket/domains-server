package plans

import (
	"domain-server/internal/models"

	mongodb "github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
)

const (
	plansTable = "plans"
)

type Repository interface {
	AddPlan(plan models.Plan) error
	UpdatePlan(plan models.Plan) error
	DeletePlan(planID string) error
}

type repository struct {
	plans *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	return &repository{
		plans: dbClient.C(plansTable),
	}
}

func (r *repository) AddPlan(plan models.Plan) error {
	err := r.plans.Insert(&plan)
	if err != nil {
		return err
	}
	return nil
}

func (r *repository) UpdatePlan(plan models.Plan) error {
	err := r.plans.Update(bson.M{"_id": plan.ID}, plan)
	if err != nil {
		return err
	}
	return nil
}

func (r *repository) DeletePlan(id string) error {
	err := r.plans.Remove(bson.M{"_id": bson.ObjectIdHex(id)})
	if err != nil {
		return err
	}
	return nil
}
