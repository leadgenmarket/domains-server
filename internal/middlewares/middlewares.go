package middlewares

import (
	"domain-server/internal/logger"
	"domain-server/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

const (
	userCtx     = "user_id"
	userRoleCtx = "user_role"
)

func TokenAuthMiddleware(logger logger.Log, services *services.Services) gin.HandlerFunc {
	return func(c *gin.Context) {
		token, _, err := services.Cookie.GetCookies(c)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "please authorize"})
		}
		userID, userRole, err := services.TokenManager.CheckToken(token)
		if err != nil {
			logger.GetInstance().Info("invalid token")
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "please authorize"})
		}
		c.Set(userCtx, userID)
		c.Set(userRoleCtx, userRole)
		c.Next()

	}
}
