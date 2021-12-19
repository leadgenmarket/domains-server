package portal

import (
	"domain-server/internal/models"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

const (
	citiesGetMethod    = "GetSites"
	locationsGetMethod = "GetCityLocs"
)

type Portal interface {
	GetCitiesList() ([]models.City, error)
	GetAllCitiesLocations() ([]models.Location, error)
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
	locationCities := []string{"258828", "99793", "161617", "75871", "303819"} //Москва, Питер, Новосиб, Краснодар, Тула
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
