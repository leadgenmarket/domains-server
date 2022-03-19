package plans

import (
	"domain-server/internal/logger"
	"domain-server/internal/models"
	"domain-server/internal/services"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handlers interface {
	AddPlans(c *gin.Context)
	UpdatePlans(c *gin.Context)
	DeletePlans(c *gin.Context)
	UpdatePlansActivity(c *gin.Context)
}

type handlers struct {
	services *services.Services
	logger   logger.Log
}

func New(services *services.Services, logger logger.Log) Handlers {
	return &handlers{
		services: services,
		logger:   logger,
	}
}

func (s *handlers) UpdatePlansActivity(c *gin.Context) {
	//тут меняем только активность
}

func (s *handlers) AddPlans(c *gin.Context) {
	//тут надо сохранять фото
	planInput := models.PlanInput{}
	if err := c.ShouldBind(&planInput); err != nil {
		s.logger.GetInstance().Errorf("error binding json %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	form, err := c.MultipartForm()
	if err != nil {
		s.logger.GetInstance().Errorf("error getting background image %s", err)
		return
	}
	files := form.File["files"]
	fileName := ""

	if len(files) > 0 {
		fileName, err = s.services.MultipartImages.SaveMultipartImage(files[0])
		fmt.Println(fileName)
		if err != nil {
			s.logger.GetInstance().Errorf("error saving background image %s", err)
			return
		}
	} else {
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	planInput.Photo = fileName
	plan := models.CreatePlanFromInput(planInput)
	err = s.services.Plans.AddPlan(plan)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, plan.ID)
}

func (s *handlers) UpdatePlans(c *gin.Context) {
	//тут возможно с фото и без фото
	planInput := models.PlanInput{}

	if err := c.ShouldBind(&planInput); err != nil {
		s.logger.GetInstance().Errorf("error binding json %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	form, err := c.MultipartForm()
	if err != nil {
		s.logger.GetInstance().Errorf("error getting background image %s", err)
		return
	}
	files := form.File["files"]
	fileName := ""

	if len(files) > 0 {
		fileName, err = s.services.MultipartImages.SaveMultipartImage(files[0])
		if err != nil {
			s.logger.GetInstance().Errorf("error saving background image %s", err)
			return
		}
	} else {
		oldPlan, err := s.services.Plans.GetPlanByID(planInput.ID)
		if err != nil {
			s.logger.GetInstance().Errorf("error getting old plan %s", err)
			return
		}
		fileName = oldPlan.Photo
	}
	planInput.Photo = fileName
	plan := models.CreatePlanFromInput(planInput)
	fmt.Println(plan)
	err = s.services.Plans.UpdatePlan(plan)
	if err != nil {
		s.logger.GetInstance().Errorf("error updating plan %s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"paylod": "error"})
		return
	}
	c.JSON(http.StatusOK, plan.ID)
}

func (s *handlers) DeletePlans(c *gin.Context) {
	id := c.Param("id")
	err := s.services.Plans.DeletePlan(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, "error")
		return
	}
	c.JSON(http.StatusOK, "ok")
}
