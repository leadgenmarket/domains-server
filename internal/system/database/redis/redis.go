package redis

import "github.com/go-redis/redis/v8"

type Repository interface {
	GetConnection() *redis.Client
}

type repository struct {
	client *redis.Client
}

func New(url string, pass string) (Repository, error) {
	r := redis.NewClient(&redis.Options{
		Addr:     url,
		Password: pass,
	})

	return &repository{client: r}, nil
}

func (r *repository) GetConnection() *redis.Client {
	return r.client
}
