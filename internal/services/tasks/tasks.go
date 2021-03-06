package tasks

import (
	"bytes"
	"domain-server/internal/logger"
	"domain-server/internal/models"
	"domain-server/internal/repositories"
	"domain-server/internal/services/amocrm"
	"encoding/json"
	"errors"
	"fmt"
	"math/rand"
	"net/http"
	"regexp"
	"strings"
	"time"
)

type Service interface {
	AddTask(task models.Task) (string, error)
	MakeCalls() error
	GetUnfinishedTasks() ([]models.Task, error)
	GetTaskByPhone(phone string) (models.Task, error)
	UpdateTask(task models.Task) error
	UpdateLeadStatus(leadID int, leadStatus int, msg string) (bool, error)
	DeleteTask(taskID string) error
}

type service struct {
	repository repositories.Repositories
	amoService amocrm.Amo
	logger     logger.Log
}

func NewService(repository repositories.Repositories, logger logger.Log) Service {

	return &service{
		repository: repository,
		logger:     logger,
		amoService: amocrm.NewAmoService(),
	}
}

func (s *service) AddTask(task models.Task) (string, error) {

	scenario, err := s.repository.Scenarios.GetScenarioByID(task.ScenarioID)
	if err != nil {
		return "", errors.New("scenario not exists")
	}
	msg := fmt.Sprintf("Запланирован_обзвон_сценарием_%s", strings.Replace(scenario.Name, " ", "_", 10))
	phone, err := s.amoService.GetPhoneFromLead(task.LeadID, msg)
	if err != nil {
		return "", err
	}
	task.Phone = phone

	//формируем список прозвонов
	loc, _ := time.LoadLocation("Europe/Moscow")
	current := time.Now().In(loc)
	times := []int{}
	for i := 0; i < 3; i++ {
		if current.Hour() > 21 {
			current = current.Add(time.Hour * 24)
			current = time.Date(current.Year(), current.Month(), current.Day(), 10, 00, 00, 00, loc)
		} else if current.Hour() < 9 {
			current = time.Date(current.Year(), current.Month(), current.Day(), 10, 00, 00, 00, loc)
		}
		times = append(times, int(current.Unix()))
		current = current.Add(time.Hour)
	}

	task.Call = times
	task.Finished = false
	task.Phone = pregPhone(phone)

	return s.repository.Tasks.AddTask(task)
}

func (s *service) MakeCalls() error {
	tasks, err := s.repository.Tasks.GetUnfinishedTasks()
	if err != nil {
		return err
	}
	//тут можно сделать асинхронно, но наверное лучше с семафором, чтоб не перегружать php
	for _, task := range tasks {
		if len(task.Call) > 0 {
			if int64(task.Call[0]) < time.Now().Unix() {
				//тут надо совершить звонок
				scenario, err := s.repository.Scenarios.GetScenarioByID(task.ScenarioID)
				if err != nil {
					s.logger.GetInstance().Errorf("error processing task %s", err)
				}
				err = sendCall(scenario, task.Phone, s.logger)
				if err != nil {
					s.logger.GetInstance().Errorf("error making call to zvonobot %s", err)
				}

				//обновляем таску
				task.Call = task.Call[1:]
				task.Tries += 1
				if len(task.Call) == 0 {
					//вот тут надо пререслать в след воронку, когда расписание звонков закончили
					msg := fmt.Sprintf("Недозвонились_сценарием_'%s'.", strings.Replace(scenario.Name, " ", "_", 10))
					nextStatus := scenario.CallsFinishedStatus
					if nextStatus == 0 {
						//Если вдруг не заполнили finished status, то берем discard статус
						nextStatus = scenario.DiscardStatus
					}
					updated, err := s.UpdateLeadStatus(task.LeadID, nextStatus, msg)
					if err != nil || !updated {
						s.logger.GetInstance().Errorf("error updating task status on scenario max calls exceeded %s", err)
					}
					task.Finished = true
				}
				s.logger.GetInstance().Info("updating task: %d phone - %s", task.ID, task.Phone)
				err = s.repository.Tasks.UpdateTask(task)
				if err != nil {
					s.logger.GetInstance().Errorf("error updating task after call: %s", err)
				}
			}
		} else {
			task.Finished = true
			s.repository.Tasks.UpdateTask(task)
		}
	}
	return nil
}

func (s *service) GetUnfinishedTasks() ([]models.Task, error) {
	return s.repository.Tasks.GetUnfinishedTasks()
}

func (s *service) UpdateTask(task models.Task) error {
	return s.repository.Tasks.UpdateTask(task)
}

func (s *service) GetTaskByPhone(phone string) (models.Task, error) {
	return s.repository.Tasks.GetTaskByPhone(phone)
}

func (s *service) UpdateLeadStatus(leadID int, leadStatus int, msg string) (bool, error) {
	return s.amoService.UpdateLeadStatus(leadID, leadStatus, msg)
}

func (s *service) DeleteTask(taskID string) error {
	return s.repository.Tasks.DeleteTask(taskID)
}

func sendCall(scenario models.Scenario, callPhone string, logger logger.Log) error {
	phone := pregPhone(callPhone)
	request := fmt.Sprintf(scenario.ScriptTemplate, phone, scenario.PhonesList[rand.Intn(len(scenario.PhonesList))])
	res := map[string]interface{}{}
	err := json.Unmarshal([]byte(request), &res)
	if err != nil {
		return err
	}

	resp, err := http.Post("https://lk.zvonobot.ru/apiCalls/create", "application/json", bytes.NewBuffer([]byte(request)))
	if err != nil {
		return err
	}

	logger.GetInstance().Info(fmt.Sprintf("response status zvonobot: %d", resp.StatusCode))
	return nil
}

func pregPhone(phone string) string {
	re, _ := regexp.Compile(`[()-+ -]`)
	return re.ReplaceAllString(phone, "")
}
