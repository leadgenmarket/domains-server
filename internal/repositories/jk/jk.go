package jk

import (
	"domain-server/internal/models"

	mongodb "github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
)

type Repository interface {
	AddJK(jk models.JK) error
	DropDB() error
	GetJKByPortalId(id string) (models.JK, error)
	UpdateJK(jk models.JK) error
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

func (r *repositroyDB) GetJKByPortalId(id string) (models.JK, error) {
	jk := models.JK{}
	err := r.jk.Find(bson.M{"portal_id": id}).One(&jk)
	if err != nil {
		return jk, err
	}
	return jk, nil
}

func (r *repositroyDB) UpdateJK(jk models.JK) error {
	err := r.jk.Update(bson.M{"_id": jk.ID}, jk)
	if err != nil {
		return err
	}
	return nil
}

func (r *repositroyDB) DropDB() error {
	r.jk.DropCollection()
	return nil
}
