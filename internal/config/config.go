package config

import (
	"fmt"
	"time"

	"github.com/vrischmann/envconfig"
)

type Config struct {
	DSN                 string
	Port                string
	ServiceName         string
	LogLevel            uint32
	GrayLogHost         string
	PortalKey           string
	PortalUrl           string
	InitialRootPassword string
	Salt                string
	TokenTTL            time.Duration
	RefreshTokenTTL     time.Duration
	TokenSecret         string
	FileStorePath       string
	SSLServing          bool
	ServerIPAdress      string
}

func InitConfig(prefix string) (*Config, error) {
	conf := &Config{}
	if err := envconfig.InitWithPrefix(conf, prefix); err != nil {
		return nil, fmt.Errorf("init config error: %w", err)
	}

	return conf, nil
}
