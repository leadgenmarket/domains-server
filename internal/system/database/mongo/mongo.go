package mongo

import (
	mongodb "github.com/globalsign/mgo"
)

type Repository interface {
	GetConnection() *mongodb.Session
}

type repository struct {
	dbClient *mongodb.Session
}

func NewRepository(dsn string) (Repository, error) {
	sess, err := mongodb.Dial(dsn)
	if err != nil {
		return nil, err
	}
	return &repository{
		dbClient: sess,
	}, nil
}

func (r *repository) GetConnection() *mongodb.Session {
	return r.dbClient
}
