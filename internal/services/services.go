package services

import (
	"domain-server/internal/config"
	"domain-server/internal/logger"
	"domain-server/internal/repositories"
	"domain-server/internal/services/backup"
	"domain-server/internal/services/cookies"
	filestore "domain-server/internal/services/file_store"
	"domain-server/internal/services/images"
	"domain-server/internal/services/plans"
	"domain-server/internal/services/plans_sites"
	"domain-server/internal/services/portal"
	"domain-server/internal/services/proxy"
	"domain-server/internal/services/scenario"
	"domain-server/internal/services/storage"
	"domain-server/internal/services/tasks"
	"domain-server/internal/services/template_prices"
	"domain-server/internal/services/token_manager"
	"domain-server/internal/system/database/redis"
	"domain-server/pkg/imagesservice"
)

type Services struct {
	Portal          portal.Portal
	Cookie          cookies.Cookies
	TokenManager    token_manager.TokenManager
	FileStore       filestore.FileStore
	CommonStorage   storage.Common
	Backup          backup.Backup
	MultipartImages images.MultipartImages
	Plans           plans.Service
	PlansSite       plans_sites.Service
	Scenarios       scenario.Service
	Tasks           tasks.Service
	Proxy           proxy.Proxy
	TempltePrices   template_prices.Service
}

func Setup(cfg *config.Config, repository repositories.Repositories, redis redis.Repository, logger logger.Log) *Services {
	filestore := filestore.NewFileStoreService(cfg.FileStorePath)
	imagesService := imagesservice.NewImagesService()
	return &Services{
		Portal:          portal.NewPortalService(cfg.PortalUrl, cfg.PortalKey),
		Cookie:          cookies.NewCookiesService(cfg),
		TokenManager:    token_manager.NewTokenManager(cfg),
		FileStore:       filestore,
		CommonStorage:   storage.NewCommonStorage(redis),
		Backup:          backup.NewBackupService(cfg),
		MultipartImages: images.NewImages(filestore, imagesService),
		Plans:           plans.NewService(repository),
		PlansSite:       plans_sites.NewService(repository),
		Scenarios:       scenario.NewService(repository),
		Tasks:           tasks.NewService(repository, logger),
		Proxy:           proxy.NewProxyService(),
		TempltePrices:   template_prices.NewService(repository, redis),
	}
}
