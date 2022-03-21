package tasks

import (
	"domain-server/internal/models"

	mongodb "github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
)

type Repository interface {
	AddTask(task models.Task) (string, error)
	UpdateTask(task models.Task) error
	DeleteTask(taskID string) error
	GetUnfinishedTasks() ([]models.Task, error)
	GetTaskByPhone(phone string) (models.Task, error)
}

type repository struct {
	repository *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	return &repository{
		repository: dbClient.C("tasks"),
	}
}

func (s *repository) AddTask(task models.Task) (string, error) {
	task.ID = bson.NewObjectId()
	err := s.repository.Insert(&task)
	if err != nil {
		return "", err
	}
	return task.ID.Hex(), nil
}

func (s *repository) UpdateTask(task models.Task) error {
	err := s.repository.Update(bson.M{"_id": task.ID}, task)
	if err != nil {
		return err
	}
	return nil
}

func (s *repository) DeleteTask(taskID string) error {
	err := s.repository.Remove(bson.M{"_id": bson.ObjectIdHex(taskID)})
	if err != nil {
		return err
	}
	return nil
}

func (s *repository) GetUnfinishedTasks() ([]models.Task, error) {
	tasks := []models.Task{}
	err := s.repository.Find(bson.M{"finished": false}).All(&tasks)
	if err != nil {
		return nil, err
	}
	return tasks, nil
}

func (s *repository) GetTaskByPhone(phone string) (models.Task, error) {
	task := models.Task{}
	err := s.repository.Find(bson.M{"phone": phone}).One(&task)
	if err != nil {
		return task, err
	}
	return task, nil
}
