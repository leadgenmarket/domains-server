package cookies

import (
	"errors"

	"github.com/gin-gonic/gin"
)

const (
	tokenPayload = "payload"
	tokenSign    = "sign"
	refreshToken = "refresh"
)

type Cookies interface {
	SetCookies(token string, refreshToken string) error
	GetCookies() (token string, refreshToken string, err error)
}

type cookies struct {
	ctx *gin.Context
}

func NewCookiesService(ctx *gin.Context) Cookies {
	return &cookies{
		ctx: ctx,
	}
}

func (cks *cookies) SetCookies(token string, refreshToken string) error {
	return nil
}

func (cks *cookies) GetCookies() (token string, refreshToken string, err error) {
	payload, err := cks.ctx.Cookie(tokenPayload)
	if err != nil {
		return "", "", err
	}
	sign, err := cks.ctx.Cookie(tokenSign)
	if err != nil {
		return "", "", err
	}
	refresh, err := cks.ctx.Cookie(refreshToken)
	if err != nil {
		return "", "", err
	}
	if payload == "" || sign == "" {
		return "", "", errors.New("no token in cookies")
	}
	return payload + "." + sign, refresh, nil
}
