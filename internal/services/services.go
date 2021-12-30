package services

import (
	"domain-server/internal/config"
	"domain-server/internal/services/backup"
	"domain-server/internal/services/cookies"
	filestore "domain-server/internal/services/file_store"
	"domain-server/internal/services/portal"
	"domain-server/internal/services/storage"
	"domain-server/internal/services/token_manager"
	"domain-server/internal/system/database/redis"
)

type Services struct {
	Portal        portal.Portal
	Cookie        cookies.Cookies
	TokenManager  token_manager.TokenManager
	FileStore     filestore.FileStore
	CommonStorage storage.Common
	Backup        backup.Backup
}

func Setup(cfg *config.Config, redis redis.Repository) *Services {
	return &Services{
		Portal:        portal.NewPortalService(cfg.PortalUrl, cfg.PortalKey),
		Cookie:        cookies.NewCookiesService(cfg),
		TokenManager:  token_manager.NewTokenManager(cfg),
		FileStore:     filestore.NewFileStoreService(cfg.FileStorePath),
		CommonStorage: storage.NewCommonStorage(redis),
		Backup:        backup.NewBackupService(cfg),
	}
}
