package portal

import (
	"bytes"
	"domain-server/internal/models"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

const (
	citiesGetMethod    = "GetSites"
	locationsGetMethod = "GetCityLocs"
	jkListGetMethod    = "GetJkList"
)

type Portal interface {
	GetCitiesList() ([]models.City, error)
	GetAllCitiesLocations() ([]models.Location, error)
	GetCitiesPrices() ([]map[string]interface{}, error)
	SendLeadToCrm(lead map[string]interface{}) error
}

type portal struct {
	url string
	key string
}

func NewPortalService(url string, key string) Portal {
	return &portal{
		key: key,
		url: url,
	}
}

func (p *portal) GetCitiesList() ([]models.City, error) {
	resp, err := http.Get(fmt.Sprintf("%s/?key=%s&met=%s", p.url, p.key, citiesGetMethod))
	if err != nil {
		return nil, err
	}
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	var list []map[string]interface{}
	json.Unmarshal(body, &list)

	cities := []models.City{}

	for _, cityInput := range list {
		cities = append(cities, models.City{
			Name:     cityInput["NAME"].(string),
			PortalID: cityInput["ID"].(string),
		})
	}
	return cities, nil
}

func (p *portal) GetAllCitiesLocations() ([]models.Location, error) {
	locationCities := []string{"258828", "99793", "161617", "75871", "303819", "31477", "12309"} //Москва, Питер, Новосиб, Краснодар, Тула
	locationsRes := []models.Location{}
	for _, cityId := range locationCities {
		locations, err := p.GetLocationsOfCity(cityId)
		if err != nil {
			return locationsRes, err
		}
		locationsRes = append(locationsRes, locations...)
	}
	return locationsRes, nil
}

func (p *portal) GetLocationsOfCity(portalCityID string) ([]models.Location, error) {
	//http://api.g-n.ru/v1/?met=GetJkList&s_id=258828&key=8N3783vyK7V3230v
	resp, err := http.Get(fmt.Sprintf("%s/?key=%s&met=%s&s_id=%s", p.url, p.key, locationsGetMethod, portalCityID))
	if err != nil {
		return nil, err
	}
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var list map[string]map[string]map[string]interface{}
	json.Unmarshal(body, &list)
	locations := []models.Location{}
	for typeOfLocation, locationsList := range list {
		for _, location := range locationsList {
			locationR := models.Location{}
			if location["UF_LOC"] != nil {
				locationR.Name = location["UF_LOC"].(string)
			}
			if location["UF_XML_ID"] != nil {
				locationR.Path = location["UF_XML_ID"].(string)
			}
			if location["UF_SITE"] != nil {
				locationR.NameSite = location["UF_SITE"].(string)
			}
			if location["UF_NAME"] != nil {
				locationR.NameFull = location["UF_NAME"].(string)
			}
			if location["UF_DAT"] != nil {
				locationR.Prices = location["UF_DAT"].(string)
			}
			locationR.PortalCityID = portalCityID
			locationR.PortalID = location["ID"].(string)
			locationR.Type = typeOfLocation
			locations = append(locations, locationR)
		}
	}
	return locations, nil
}

func (p *portal) GetCitiesPrices() ([]map[string]interface{}, error) {
	var citiesList = map[string]string{"msk": "258828", "spb": "99793", "novosibirsk": "161617", "tula": "303819", "krd": "75871", "perm": "31477", "rostov": "12309"} //"99793", "161617", "75871", "303819"} //Москва, Питер, Новосиб, Краснодар, Тула
	pricesResult := []map[string]interface{}{}
	for city, portalCityId := range citiesList {
		resp, err := http.Get(fmt.Sprintf("http://api.g-n.ru/local/api/lp/locIn.php?city=%s", city))
		if err != nil {
			return nil, err
		}
		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			return nil, err
		}
		var list map[string]interface{}
		json.Unmarshal(body, &list)
		list["portal_city_id"] = portalCityId
		pricesResult = append(pricesResult, list)

	}
	return pricesResult, nil
}

func (p *portal) SendLeadToCrm(lead map[string]interface{}) error {
	url := "https://api.g-n.ru/local/ajax/"
	fmt.Println("URL:>", url)

	jsonStr, err := json.Marshal(lead)
	if err != nil {
		return err
	}
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
	if err != nil {
		return err
	}
	req.Header.Set("Access-Control-Allow-Origin", "*")
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	fmt.Println("response Status:", resp.Status)
	fmt.Println("response Headers:", resp.Header)
	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Println("response Body:", string(body))
	return nil
}
