package backup

import (
	"domain-server/internal/config"
	"domain-server/pkg/arch"
	"domain-server/pkg/cloud"
	"os"
)

type Backup interface {
	CreateBackup() error
}
type backup struct {
	cloud cloud.Cloud
	arch  arch.Arch
}

func NewBackupService(cfg *config.Config) Backup {
	cloud := cloud.NewCloudService(cfg.CloudStorePath, cfg.YandexApiToken)
	arch := arch.NewArchService()
	return &backup{
		cloud: cloud,
		arch:  arch,
	}
}

func (b *backup) CreateBackup() error {
	filePath := "./backup-store.zip"
	err := b.arch.ZipFolder("./data", filePath)
	if err != nil {
		return err
	}
	if err := b.cloud.UploadFile(filePath); err != nil {
		return err
	}
	return os.Remove("./backup-store.zip")
}
