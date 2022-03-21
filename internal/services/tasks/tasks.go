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
	now := time.Now()
	tomorrowAt10 := now.Add(time.Hour * 24)
	if tomorrowAt10.Hour() > 10 {
		diff := tomorrowAt10.Hour() - 10
		tomorrowAt10 = tomorrowAt10.Add(-time.Duration(diff) * time.Hour)
	} else {
		diff := 10 - tomorrowAt10.Hour()
		tomorrowAt10 = tomorrowAt10.Add(time.Duration(diff) * time.Hour)
	}
	tomorrowAt12 := now.Add(time.Hour * 24)
	if tomorrowAt12.Hour() > 12 {
		diff := tomorrowAt12.Hour() - 12
		tomorrowAt12 = tomorrowAt12.Add(-time.Duration(diff) * time.Hour)
	} else {
		diff := 12 - tomorrowAt12.Hour()
		tomorrowAt12 = tomorrowAt12.Add(time.Duration(diff) * time.Hour)
	}
	task.Call = []int{
		int(now.Unix() + 5*60),
		int(now.Unix() + 60*60),
		int(now.Unix() + 120*60),
		int(tomorrowAt10.Unix()),
		int(tomorrowAt12.Unix()),
	}
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
