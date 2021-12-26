package cookies

import (
	"domain-server/internal/config"
	"errors"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

const (
	tokenPayload     = "payload"
	tokenSign        = "sign"
	refreshTokenName = "refresh"
)

type Cookies interface {
	SetCookies(ctx *gin.Context, token string, refreshToken string) error
	GetCookies(ctx *gin.Context) (token string, refreshToken string, err error)
}

type cookies struct {
	cfg *config.Config
}

func NewCookiesService(cfg *config.Config) Cookies {
	return &cookies{
		cfg: cfg,
	}
}

func (cks *cookies) SetCookies(ctx *gin.Context, token string, refreshToken string) error {
	tokenSplit := strings.Split(token, ".")
	setCookie(ctx, tokenPayload, tokenSplit[0]+"."+tokenSplit[1], false, cks.cfg.TokenTTL)
	setCookie(ctx, tokenSign, tokenSplit[2], false, cks.cfg.TokenTTL)
	setCookie(ctx, refreshTokenName, refreshToken, false, cks.cfg.RefreshTokenTTL)
	return nil
}

func (cks *cookies) GetCookies(ctx *gin.Context) (token string, refreshToken string, err error) {
	payload, err := ctx.Cookie(tokenPayload)
	if err != nil {
		return "", "", err
	}
	sign, err := ctx.Cookie(tokenSign)
	if err != nil {
		return "", "", err
	}
	refresh, err := ctx.Cookie(refreshToken)
	if err != nil {
		return "", "", err
	}
	if payload == "" || sign == "" {
		return "", "", errors.New("no token in cookies")
	}
	return payload + "." + sign, refresh, nil
}

func setCookie(ctx *gin.Context, name string, payload string, secure bool, ttl time.Duration) {
	http.SetCookie(ctx.Writer, &http.Cookie{
		Name:  name,
		Value: payload,
		Path:  "/",
		//Domain:,
		MaxAge:   int(ttl.Seconds()),
		Secure:   secure,
		HttpOnly: false,
		//SameSite: 3,
	})
}
