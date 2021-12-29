package storage

import (
	"context"
	"domain-server/internal/system/database/redis"
	"encoding/json"
	"time"
)

type Common interface {
}
type commonStorage struct {
	redisClient redis.Repository
}

func NewCommonStorage(redisClient redis.Repository) Common {
	return &commonStorage{
		redisClient: redisClient,
	}
}

func (s commonStorage) Set(ctx context.Context, key string, value interface{}, expirationTime time.Duration) error {
	data, err := json.Marshal(value)
	if err != nil {
		return err
	}
	return s.redisClient.GetConnection().Set(ctx, key, data, expirationTime).Err()
}

func (s commonStorage) Get(ctx context.Context, key string, template interface{}) error {
	data, err := s.redisClient.GetConnection().Get(ctx, key).Result()
	if err != nil {
		return err
	}
	return json.Unmarshal([]byte(data), template)
}
