package services

import (
	"domain-server/internal/config"
	"domain-server/internal/services/cookies"
	"domain-server/internal/services/portal"
)

type Services struct {
	Portal portal.Portal
	Cookie cookies.Cookies
}

func Setup(cfg *config.Config) *Services {
	portal := portal.NewPortalService(cfg.PortalUrl, cfg.PortalKey)
	cookies := cookies.NewCookiesService()
	return &Services{
		Portal: portal,
		Cookie: cookies,
	}
}
