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
	PortalKey           string
	PortalUrl           string
	InitialRootPassword string
	Salt                string
	TokenTTL            time.Duration
	RefreshTokenTTL     time.Duration
	CacheDuration       time.Duration
	TokenSecret         string
	FileStorePath       string
	SSLServing          bool
	ServerIPAdress      string
	RedisURL            string
	RedisPass           string `envconfig:"optional"`
	CloudStorePath      string
	YandexApiToken      string
	AdminUrl            string
}

func InitConfig(prefix string) (*Config, error) {
	conf := &Config{}
	if err := envconfig.InitWithPrefix(conf, prefix); err != nil {
		return nil, fmt.Errorf("init config error: %w", err)
	}

	return conf, nil
}
