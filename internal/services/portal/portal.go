package portal

import (
	"domain-server/internal/models"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"

	"github.com/ajg/form"
	"github.com/globalsign/mgo/bson"
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
	GetJkList(cityRepo []models.City) ([]models.JK, error)
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

	client := &http.Client{}
	data, err := form.EncodeToValues(lead)
	if err != nil {
		return err
	}
	resp, err := client.PostForm(url, data)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	return nil
}

type InputJson struct {
	List map[string]JKInput `json:"LIST"`
}

type JKInput struct {
	ID        bson.ObjectId  `bson:"_id"`
	Portal_ID string         `bson:"portal_id" json:"ID"`
	Name      string         `bson:"name" json:"NAME"`
	Code      string         `bson:"code" json:"CODE"`
	CityID    bson.ObjectId  `bson:"city_id"`
	CityName  string         `bson:"city_name" json:"CITY"`
	Raion     []models.Raion `bson:"raion" json:"RAION"`
	Price_OT  string         `bson:"price_ot" json:"PRICE_OT"`
	Price_0   string         `bson:"price_0" json:"PRICE_0"`
	Price_1   string         `bson:"price_1" json:"PRICE_1"`
	Price_2   string         `bson:"price_2" json:"PRICE_2"`
	Price_3   string         `bson:"price_3" json:"PRICE_3"`
	Price_4   string         `bson:"price_4" json:"PRICE_4"`
	Price_5   string         `bson:"price_5" json:"PRICE_5"`
	Price_6   string         `bson:"price_6" json:"PRICE_6"`
	Price_7   string         `bson:"price_7" json:"PRICE_7"`
	Price_8   string         `bson:"price_8" json:"PRICE_8"`
	Class     string         `bson:"class" json:"CLASS"`
	Sdacha    []string       `bson:"sdacha" json:"SDA4A"`
}

func (p *portal) GetJkList(cityRepo []models.City) ([]models.JK, error) {
	jkResultList := []models.JK{}
	var citiesList = map[string]string{"msk": "258828", "spb": "99793", "novosibirsk": "161617", "tula": "303819", "krd": "75871", "perm": "31477", "rostov": "12309"}
	for _, portalCityId := range citiesList {
		resp, err := http.Get(fmt.Sprintf("%s/?key=%s&met=%s&s_id=%s", p.url, p.key, jkListGetMethod, portalCityId))
		if err != nil {
			return nil, err
		}
		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			return nil, err
		}
		var list InputJson
		json.Unmarshal(body, &list)
		for _, jkInput := range list.List {
			jk := models.JK{
				ID:        bson.NewObjectId(),
				Portal_ID: jkInput.Portal_ID,
				Name:      jkInput.Name,
				Code:      jkInput.Code,
				Raion:     jkInput.Raion,
				Class:     jkInput.Class,
				Sdacha:    jkInput.Sdacha,
			}
			for _, city := range cityRepo {
				if city.Name == jkInput.CityName {
					jk.CityID = city.ID
					jk.PortalCityID = city.PortalID
					//break
				}
			}
			if jkInput.Price_OT != "" {
				jk.Price_OT, _ = strconv.Atoi(jkInput.Price_OT)
			}
			if jkInput.Price_0 != "" {
				jk.Price_0, _ = strconv.Atoi(jkInput.Price_0)
			}
			if jkInput.Price_2 != "" {
				jk.Price_2, _ = strconv.Atoi(jkInput.Price_2)
			}
			if jkInput.Price_3 != "" {
				jk.Price_3, _ = strconv.Atoi(jkInput.Price_3)
			}
			if jkInput.Price_4 != "" {
				jk.Price_4, _ = strconv.Atoi(jkInput.Price_4)
			}
			if jkInput.Price_5 != "" {
				jk.Price_5, _ = strconv.Atoi(jkInput.Price_5)
			}
			if jkInput.Price_6 != "" {
				jk.Price_6, _ = strconv.Atoi(jkInput.Price_6)
			}
			if jkInput.Price_7 != "" {
				jk.Price_7, _ = strconv.Atoi(jkInput.Price_7)
			}
			if jkInput.Price_8 != "" {
				jk.Price_8, _ = strconv.Atoi(jkInput.Price_8)
			}
			jkResultList = append(jkResultList, jk)
		}
	}
	return jkResultList, nil
}
