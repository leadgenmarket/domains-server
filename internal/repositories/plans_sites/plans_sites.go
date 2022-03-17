package plans_sites

import (
	"domain-server/internal/models"
	"domain-server/internal/repositories/plans"

	mongodb "github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
)

const (
	PlansSiteTable = "plans_sites"
)

type Repository interface {
	AddPlansSite(plansSite models.PlansSite) error
	UpdatePlansSite(plansSite models.PlansSite) error
	DeletePlansSite(plansSiteID string) error
	GetPlansSites() ([]models.PlansSite, error)
	GetPlansSiteDetailInfo(id string) (models.PlansSite, []models.Plan, error)
}

type repository struct {
	plansSite *mongodb.Collection
	plans     *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	return &repository{
		plansSite: dbClient.C(PlansSiteTable),
		plans:     dbClient.C(plans.PlansTable),
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

func (r *repository) GetPlansSites() ([]models.PlansSite, error) {
	plansSites := []models.PlansSite{}
	err := r.plansSite.Find(bson.M{}).All(&plansSites)
	if err != nil {
		return plansSites, err
	}
	return plansSites, nil
}

func (r *repository) GetPlansSiteDetailInfo(id string) (models.PlansSite, []models.Plan, error) {
	plansSite := models.PlansSite{}
	plans := []models.Plan{}
	err := r.plansSite.Find(bson.M{"_id": bson.ObjectIdHex(id)}).One(&plansSite)
	if err != nil {
		return plansSite, nil, nil
	}

	err = r.plans.Find(bson.M{"site_id": bson.ObjectIdHex(id)}).All(&plans)
	if err != nil {
		return plansSite, nil, nil
	}
	return plansSite, plans, nil
}
