package plans_sites

import (
	"domain-server/internal/models"
	"domain-server/internal/repositories"
)

type Service interface {
	AddPlansSite(plansSite models.PlansSite) error
	UpdatePlansSite(plansSite models.PlansSite) error
	DeletePlansSite(plansSiteID string) error
	GetPlansSites() ([]models.PlansSite, error)
	GetPlansSiteDetailInfo(id string) (models.PlansSite, []models.Plan, error)
}

type service struct {
	repository repositories.Repositories
}

func NewService(repository repositories.Repositories) Service {
	return &service{
		repository: repository,
	}
}

func (s *service) AddPlansSite(plansSite models.PlansSite) error {
	return s.repository.PlansSites.AddPlansSite(plansSite)
}

func (s *service) UpdatePlansSite(plansSite models.PlansSite) error {
	return s.repository.PlansSites.UpdatePlansSite(plansSite)
}

func (s *service) DeletePlansSite(plansSiteID string) error {
	return s.repository.PlansSites.DeletePlansSite(plansSiteID)
}

func (s *service) GetPlansSites() ([]models.PlansSite, error) {
	return s.repository.PlansSites.GetPlansSites()
}

func (s *service) GetPlansSiteDetailInfo(id string) (models.PlansSite, []models.Plan, error) {
	return s.repository.PlansSites.GetPlansSiteDetailInfo(id)
}
