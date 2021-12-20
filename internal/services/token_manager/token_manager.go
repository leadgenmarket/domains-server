package token_manager

import (
	"domain-server/internal/config"
	"domain-server/internal/models"
	"errors"
	"time"

	"github.com/dgrijalva/jwt-go"
)

type tokenClaims struct {
	jwt.StandardClaims
	UserID   string `json:"user_id"`
	UserName string `json:"user_name"`
	UserRole string `json:"user_role"`
}

type TokenManager interface {
	GenerateToken(user models.User) (string, error)
	CheckToken(tokenInput string) (string, string, error)
}

type tokenManager struct {
	cfg config.Config
}

func NewTokenManager(cfg *config.Config) TokenManager {
	return &tokenManager{
		cfg: *cfg,
	}
}

func (t *tokenManager) GenerateToken(user models.User) (string, error) {
	return jwt.NewWithClaims(jwt.SigningMethodHS256, &tokenClaims{
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(t.cfg.TokenTTL).Unix(),
			IssuedAt:  time.Now().Unix(),
		},
		user.ID.Hex(),
		user.Name,
		user.Role,
	}).SignedString([]byte(t.cfg.TokenSecret))
}

func (t *tokenManager) GenerateRefresh(user models.User) (string, error) {
	return jwt.NewWithClaims(jwt.SigningMethodHS256, &tokenClaims{
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(t.cfg.RefreshTokenTTL).Unix(),
			IssuedAt:  time.Now().Unix(),
		},
		user.ID.Hex(),
		user.Name,
		user.Role,
	}).SignedString([]byte(t.cfg.TokenSecret))
}

func (t *tokenManager) CheckToken(tokenInput string) (string, string, error) {
	//проверям шифрование
	refreshToken, err := jwt.ParseWithClaims(tokenInput, &tokenClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("invalid signing method")
		}

		return []byte(t.cfg.TokenSecret), nil
	})
	if err != nil {
		return "", "", err
	}

	//проверяем структуру токена
	claims, ok := refreshToken.Claims.(*tokenClaims)
	if !ok {
		return "", "", errors.New("Неверная структура токена")

	}

	return claims.UserID, claims.UserRole, err
}
