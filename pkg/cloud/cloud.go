package cloud

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"time"
)

type Cloud interface {
	UploadFile(file string) error
}

type yandexCloud struct {
	path   string
	apiKey string
}

func NewCloudService(path string, apiKey string) Cloud {
	return &yandexCloud{
		path:   path,
		apiKey: apiKey,
	}
}

type UploadUrlResonse struct {
	Href   string
	Method string
}

func (t *yandexCloud) UploadFile(filePath string) error {
	url, err := t.GetUploadUrl()
	if err != nil {
		return err
	}
	fmt.Println(url)

	file, _ := os.Open(filePath)
	defer file.Close()

	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)
	part, _ := writer.CreateFormFile("file", filepath.Base(file.Name()))
	io.Copy(part, file)
	writer.Close()

	r, _ := http.NewRequest("PUT", url, body)
	r.Header.Add("Content-Type", writer.FormDataContentType())
	r.Header.Add("Authorization", "OAuth "+t.apiKey)
	client := &http.Client{}
	resp, err := client.Do(r)
	if resp.StatusCode != 200 {
		return err
	}
	return nil
}

func (t *yandexCloud) GetUploadUrl() (string, error) {
	name := time.Now().Format("02-Jan-2006") + ".zip"
	url := fmt.Sprintf(`https://cloud-api.yandex.net/v1/disk/resources/upload?path=%s/%s&overwrite=true`, t.path, name)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return "", err
	}
	req.Header.Add("Authorization", "OAuth "+t.apiKey)
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}
	response := UploadUrlResonse{}
	errU := json.Unmarshal(body, &response)
	if err != nil {
		return "", errU
	}
	return response.Href, nil
}
