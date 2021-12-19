package middlewares

import (
	"domain-server/internal/logger"
	"net/http"

	"github.com/gin-gonic/gin"
)

const (
	userCtx     = "user_id"
	userRoleCtx = "user_role"
)

func TokenAuthMiddleware(logger logger.Log) gin.HandlerFunc {
	return func(c *gin.Context) {
		payload, _ := c.Cookie("token")
		sign, _ := c.Cookie("token_sign")
		if payload != "" && sign != "" {
			token := payload + "." + sign
			logger.GetInstance().Info("you token", token)
			c.Next()
		} else {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "please authorize"})
		}
	}
}
