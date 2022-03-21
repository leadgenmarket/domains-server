package amocrm

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
)

const url = "http://zvonobot.leadactiv.ru/amoApi.php?key=7314XZH2U5"

type Amo interface {
	GetPhoneFromLead(leadID int, msg string) (string, error)
	UpdateLeadStatus(leadID int, leadStatus int, msg string) (bool, error)
}

type amo struct {
	url string
}

func NewAmoService() Amo {
	return &amo{
		url: url,
	}
}

type PhoneResponse struct {
	Phone string `json:"phone"`
}

func (a *amo) GetPhoneFromLead(leadID int, msg string) (string, error) {
	phone := PhoneResponse{}
	resp, err := http.Get(fmt.Sprintf("%s&type=leadID&lead_id=%d&message=%s", a.url, leadID, msg))
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	err = json.NewDecoder(resp.Body).Decode(&phone)
	if err != nil {
		return "", errors.New("error getting phone from crm")
	}
	return phone.Phone, err
}

type UpdateLeadResponse struct {
	Result bool `json:"result"`
}

func (a *amo) UpdateLeadStatus(leadID int, leadStatus int, msg string) (bool, error) {
	resp, err := http.Get(fmt.Sprintf("%s&type=status&lead_id=%d&status_id=%d&message=%s", a.url, leadID, leadStatus, msg))
	if err != nil {
		return false, err
	}
	defer resp.Body.Close()
	result := UpdateLeadResponse{}
	err = json.NewDecoder(resp.Body).Decode(&result)
	if err != nil {
		return false, errors.New("error updating lead status")
	}
	return true, err
}
