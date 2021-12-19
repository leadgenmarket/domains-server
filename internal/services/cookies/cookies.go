package cookies

import (
	"errors"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

const (
	tokenPayload     = "payload"
	tokenSign        = "sign"
	refreshTokenName = "refresh"
	tokenTTL         = 90000
	refreshTTL       = 120000
)

type Cookies interface {
	SetCookies(ctx *gin.Context, token string, refreshToken string) error
	GetCookies(ctx *gin.Context) (token string, refreshToken string, err error)
}

type cookies struct {
}

func NewCookiesService() Cookies {
	return &cookies{}
}

func (cks *cookies) SetCookies(ctx *gin.Context, token string, refreshToken string) error {
	tokenSplit := strings.Split(token, ".")
	setCookie(ctx, tokenPayload, tokenSplit[0]+"."+tokenSplit[1], false, tokenTTL)
	setCookie(ctx, tokenSign, tokenSplit[2], true, tokenTTL)
	setCookie(ctx, refreshTokenName, refreshToken, true, refreshTTL)
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

func setCookie(ctx *gin.Context, name string, payload string, secure bool, ttl int) {
	http.SetCookie(ctx.Writer, &http.Cookie{
		Name:  name,
		Value: payload,
		Path:  "/",
		//Domain:,
		MaxAge:   ttl,
		Secure:   secure,
		HttpOnly: false,
		//SameSite: 3,
	})
}
