package tasks

import (
	"domain-server/internal/logger"
	"domain-server/internal/services"
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
)

type Handlers interface {
	AmoTriggerHandler(c *gin.Context)
	ResultHandler(c *gin.Context)
	MakeCalls(c *gin.Context)
	GetAllUnfinishedTasks(c *gin.Context)
}

type taskHandlers struct {
	services *services.Services
	logger   logger.Log
}

func New(services *services.Services, logger logger.Log) Handlers {
	return &taskHandlers{
		services: services,
		logger:   logger,
	}
}

type AmoInput struct {
	Leads AmoInputLeads `json:"leads" form:"leads"`
}

type AmoInputLeads struct {
	Add    []AmoInputAdd    `json:"add" form:"add"`
	Status []AmoInputStatus `json:"status" form:"status"`
}

type AmoInputAdd struct {
	ID int `json:"id" form:"id"`
}

type AmoInputStatus struct {
	ID int `json:"id" form:"id"`
}

func (s *taskHandlers) AmoTriggerHandler(c *gin.Context) {
	//scenarioID := c.Param("scenarioID")
	input := AmoInput{}
	//input := map[string]interface{}{}
	// test
	/*jsonData, _ := c.()
	fmt.Println(string(jsonData))*/
	// test

	/*c.Request.ParseMultipartForm(1000)
	for key, value := range c.Request.PostForm {
		fmt.Println(key, value)
	}*/
	err := c.ShouldBindWith(&input, binding.FormMultipart)
	if err != nil {
		s.logger.GetInstance().Errorf("error unmarshaling incoming json %s", err)
		c.JSON(http.StatusBadRequest, err)
		return
	}
	fmt.Println(input)
	/*leadID := 0
	if len(input.Leads.Add) > 0 {
		leadID = input.Leads.Add[0].ID
	}
	if len(input.Leads.Status) > 0 {
		leadID = input.Leads.Status[0].ID
	}
	if leadID == 0 {
		s.logger.GetInstance().Error("trigger: no lead id specified")
		c.JSON(http.StatusBadRequest, "no lead id specified")
		return
	}

	task := models.Task{
		LeadID:     leadID,
		ScenarioID: scenarioID,
		Tries:      0,
		Finished:   false,
	}
	taskID, err := s.services.Tasks.AddTask(task)
	if err != nil {
		s.logger.GetInstance().Errorf("erorr adding task: %s", err)
		c.JSON(http.StatusBadRequest, "erorr adding task")
	}
	c.JSON(http.StatusOK, taskID)*/
}

type ResultInput struct {
	Call CallInput `json:"call" form:"call"`
}
type CallInput struct {
	Phone string `json:"phone" form:"phone"`
}

func (s *taskHandlers) ResultHandler(c *gin.Context) {
	param := c.Param("result")
	result := false
	status := 0
	if param == "true" {
		result = true
	}
	input := ResultInput{}
	err := c.BindJSON(&input)
	if err != nil {
		s.logger.GetInstance().Errorf("error unmarshaling json: %s", err)
		c.JSON(http.StatusBadRequest, "error unmarshaling json")
		return
	}
	task, err := s.services.Tasks.GetTaskByPhone(input.Call.Phone)
	if err != nil {
		s.logger.GetInstance().Errorf("no task for number: %s", input.Call.Phone)
		c.JSON(http.StatusBadRequest, "no task for number")
		return
	}

	scenario, err := s.services.Scenarios.GetScenarioByID(task.ScenarioID)
	if err != nil {
		s.logger.GetInstance().Errorf("error getting scenario of the task: %s", input.Call.Phone)
		c.JSON(http.StatusBadRequest, "error getting scenario of the task")
		return
	}
	msg := fmt.Sprintf("Обзвон_сценарием_'%s'_завершен._Ответ_-_", strings.Replace(scenario.Name, " ", "_", 10))
	if result {
		status = scenario.SuccessStatus
		msg += "Да"
	} else {
		status = scenario.DiscardStatus
		msg += "Нет"
	}
	updated, err := s.services.Tasks.UpdateLeadStatus(task.LeadID, status, msg)
	if err != nil || !updated {
		s.logger.GetInstance().Errorf("couldn't update lead status: %s", task.LeadID)
		c.JSON(http.StatusBadRequest, "couldn't update lead status")
		return
	}

	//тут еще надо добавить тег ЗВОНОБОТ
	task.Finished = true
	task.Success = result
	err = s.services.Tasks.UpdateTask(task)
	if err != nil {
		s.logger.GetInstance().Errorf("error updating task: %s", err)
		c.JSON(http.StatusBadRequest, "erorr updating task")
		return
	}

	c.JSON(http.StatusOK, result)
}

func (s *taskHandlers) MakeCalls(c *gin.Context) {
	err := s.services.Tasks.MakeCalls()
	if err != nil {
		s.logger.GetInstance().Errorf("error while making calls: %s", err)
		c.JSON(http.StatusBadRequest, "erorr updating task")
		return
	}
	c.JSON(http.StatusOK, "ok")
}

func (s *taskHandlers) GetAllUnfinishedTasks(c *gin.Context) {
	tasks, err := s.services.Tasks.GetUnfinishedTasks()
	if err != nil {
		s.logger.GetInstance().Errorf("error while getting unfinished tasks: %s", err)
		c.JSON(http.StatusBadRequest, "error while getting unfinished tasks")
		return
	}
	c.JSON(http.StatusOK, tasks)
}
