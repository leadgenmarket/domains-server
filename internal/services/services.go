package services

import (
	"domain-server/internal/config"
	"domain-server/internal/services/portal"
)

type Services struct {
	Portal portal.Portal
}

func Setup(cfg *config.Config) *Services {
	portal := portal.NewPortalService(cfg.PortalUrl, cfg.PortalKey)
	return &Services{
		Portal: portal,
	}
}
