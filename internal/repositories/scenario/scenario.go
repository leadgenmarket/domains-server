package scenario

import (
	"domain-server/internal/models"

	mongodb "github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
)

type Repository interface {
	AddScenario(scenario models.Scenario) (string, error)
	UpdateScenario(scenario models.Scenario) error
	DeleteScenario(scenarioID string) error
	GetAllScenarios() ([]models.Scenario, error)
	GetScenarioByID(scenarioID string) (models.Scenario, error)
}

type repository struct {
	repository *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	return &repository{
		repository: dbClient.C("scenarios"),
	}
}

func (r *repository) AddScenario(scenario models.Scenario) (string, error) {
	scenario.ID = bson.NewObjectId()
	err := r.repository.Insert(&scenario)
	if err != nil {
		return "", err
	}
	return scenario.ID.Hex(), nil
}

func (r *repository) UpdateScenario(scenario models.Scenario) error {
	err := r.repository.Update(bson.M{"_id": scenario.ID}, scenario)
	if err != nil {
		return err
	}
	return nil
}

func (r *repository) DeleteScenario(scenarioID string) error {
	err := r.repository.Remove(bson.M{"_id": bson.ObjectIdHex(scenarioID)})
	if err != nil {
		return err
	}
	return nil
}

func (r *repository) GetAllScenarios() ([]models.Scenario, error) {
	scenarios := []models.Scenario{}
	err := r.repository.Find(bson.M{}).All(&scenarios)
	if err != nil {
		return nil, err
	}
	return scenarios, nil
}

func (r *repository) GetScenarioByID(scenarioID string) (models.Scenario, error) {
	scenario := models.Scenario{}
	err := r.repository.Find(bson.M{"_id": bson.ObjectIdHex(scenarioID)}).One(&scenario)
	return scenario, err
}
