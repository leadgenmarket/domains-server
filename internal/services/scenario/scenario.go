package scenario

import (
	"domain-server/internal/models"
	"domain-server/internal/repositories"
)

type Service interface {
	AddScenario(scenario models.Scenario) (string, error)
	UpdateScenario(scenario models.Scenario) error
	DeleteScenario(scenarioID string) error
	GetAllScenarios() ([]models.Scenario, error)
	GetScenarioByID(scenarioID string) (models.Scenario, error)
}

type service struct {
	repository repositories.Repositories
}

func NewService(repository repositories.Repositories) Service {
	return &service{
		repository: repository,
	}
}

func (s *service) AddScenario(scenario models.Scenario) (string, error) {
	return s.repository.Scenarios.AddScenario(scenario)
}

func (s *service) UpdateScenario(scenario models.Scenario) error {
	return s.repository.Scenarios.UpdateScenario(scenario)
}

func (s *service) DeleteScenario(scenarioID string) error {
	return s.repository.Scenarios.DeleteScenario(scenarioID)
}

func (s *service) GetAllScenarios() ([]models.Scenario, error) {
	return s.repository.Scenarios.GetAllScenarios()
}

func (s *service) GetScenarioByID(scenarioID string) (models.Scenario, error) {
	return s.repository.Scenarios.GetScenarioByID(scenarioID)
}
