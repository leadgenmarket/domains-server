package main

import (
	"domain-server/internal/config"
	"domain-server/internal/logger"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

func main() {
	cfg, err := config.InitConfig("APP")
	if err != nil {
		logrus.Panic("error initializing config: %w", err)
	}
	logger := logger.NewLogger(cfg.ServiceName, cfg.LogLevel, cfg.GrayLogHost)
	logger.GetInstance().Info("server started")

	router := gin.Default()
	router.Static("/aivazovskiy", "./aivazovskiy")
	router.LoadHTMLFiles("./aivazovskiy/aivazovskiy.html")
	//router.LoadHTMLGlob("./aivazovskiy/*")
	router.GET("/", func(c *gin.Context) {
		//
		domain := strings.Split(c.Request.Host, ":")[0]
		if domain != "127.0.0.1" {
			c.HTML(http.StatusOK, "aivazovskiy.html", nil)
			return
		} else {
			c.JSON(200, gin.H{
				"host": domain,
			})
		}
		//c.Data(http.StatusOK, "text/html; charset=utf-8", []byte("<html></html>"))
	})
	router.Run()
}
