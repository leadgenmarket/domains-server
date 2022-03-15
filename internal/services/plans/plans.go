package plans

import (
	"domain-server/internal/models"
	"domain-server/internal/repositories"
)

type Service interface {
	AddPlan(plan models.Plan) error
	UpdatePlan(plan models.Plan) error
	DeletePlan(planID string) error
}

type service struct {
	repository repositories.Repositories
}

func NewService(repository repositories.Repositories) Service {
	return &service{
		repository: repository,
	}
}

func (s *service) AddPlan(plan models.Plan) error {
	return s.repository.Plans.AddPlan(plan)
}

func (s *service) UpdatePlan(plan models.Plan) error {
	return s.repository.Plans.UpdatePlan(plan)
}

func (s *service) DeletePlan(planID string) error {
	return s.repository.Plans.DeletePlan(planID)
}
