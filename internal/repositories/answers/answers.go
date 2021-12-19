package answer

import (
	"domain-server/internal/models"

	mongodb "github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
)

type Repository interface {
	AddAnswer(answer models.Answer) (models.Answer, error)
	GetQuestionAnswers(domainID string) ([]models.Answer, error)
	UpdateAnswer(answer models.Answer) error
	DeleteAnswer(id string) error
}

type repositroyDB struct {
	answers *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	return &repositroyDB{
		answers: dbClient.C("answers"),
	}
}

func (r *repositroyDB) AddAnswer(answer models.Answer) (models.Answer, error) {
	answer.ID = bson.NewObjectId()
	err := r.answers.Insert(&answer)
	if err != nil {
		return answer, err
	}
	return answer, nil
}

func (r *repositroyDB) UpdateAnswer(answer models.Answer) error {
	err := r.answers.Find(bson.M{"_id": answer}).One(&answer)
	if err != nil {
		return err
	}
	return nil
}

func (r *repositroyDB) DeleteAnswer(id string) error {
	err := r.answers.Remove(bson.M{"_id": bson.ObjectIdHex(id)})
	if err != nil {
		return err
	}
	return nil
}

func (r *repositroyDB) GetQuestionAnswers(questionID string) ([]models.Answer, error) {
	answers := []models.Answer{}
	err := r.answers.Find(bson.M{"domain_id": bson.ObjectIdHex(questionID)}).All(&answers)
	if err != nil {
		return answers, err
	}
	return answers, nil
}
