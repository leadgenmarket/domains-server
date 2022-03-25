package proxy

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
)

type Proxy interface {
	ProxyRequest(url string, data interface{}) (resp interface{}, err error)
}

type proxy struct{}

func NewProxyService() Proxy {
	return &proxy{}
}

func (p *proxy) ProxyRequest(url string, data interface{}) (resp interface{}, err error) {
	jsonStr, err := json.Marshal(data)
	if err != nil {
		return nil, err
	}
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))

	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	response, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer response.Body.Close()

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return nil, err
	}
	err = json.Unmarshal(body, &resp)
	if err != nil {
		return nil, err
	}
	return resp, nil
}
