package jk

import (
	"domain-server/internal/models"

	mongodb "github.com/globalsign/mgo"
)

type Repository interface {
	AddJK(jk models.JK) error
	DropDB() error
}

type repositroyDB struct {
	jk *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	return &repositroyDB{
		jk: dbClient.C("jks"),
	}
}

func (r *repositroyDB) AddJK(jk models.JK) error {
	err := r.jk.Insert(&jk)
	if err != nil {
		return err
	}
	return nil
}

func (r *repositroyDB) DropDB() error {
	r.jk.DropCollection()
	return nil
}
