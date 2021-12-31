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
	GetJkListAlt(cityRepo []models.City) ([]models.JK, error)
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
	var citiesList = map[string]string{"msk": "258828", "spb": "99793", "novosibirsk": "161617", "tula": "303819", "krd": "75871", "perm": "31477", "rostov": "12309"} //"99793", "161617", "75871", "303819"} //Москва, Питер, Новосиб, Краснодар, Тула
	for _, portalCityId := range citiesList {
		resp, err := http.Get(fmt.Sprintf("%s/?key=%s&met=%s&s_id=%s&f_[ACTIVE]=ALL", p.url, p.key, jkListGetMethod, portalCityId))
		if err != nil {
			return nil, err
		}
		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			return nil, err
		}
		var list InputJson
		json.Unmarshal(body, &list)
		fmt.Println(list)
		break
		/*for _, jkInput := range list.List {
			jk := models.JK{
				ID:        bson.NewObjectId(),
				Domain:    cityPref,
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
		}*/
	}
	return jkResultList, nil
}

type InputJsonAlt struct {
	List []JKInput `json:"LIST"`
}

func (p *portal) GetJkListAlt(cityRepo []models.City) ([]models.JK, error) {
	var citiesList = map[string]string{"msk": "258828", "spb": "99793", "novosibirsk": "161617", "tula": "303819", "krd": "75871", "perm": "31477", "rostov": "12309"} //"99793", "161617", "75871", "303819"} //Москва, Питер, Новосиб, Краснодар, Тула
	jkResultList := []models.JK{}
	ids := map[string][]int{
		"msk":     {35826, 35837, 35874, 33417, 33414, 312957, 312893, 312881, 312856, 312813, 312794, 312768, 312710, 312677, 311343, 311316, 311276, 311226, 311156, 311098, 311080, 311028, 310385, 310371, 310272, 310214, 310163, 310093, 307816, 307814, 307634, 307612, 307561, 307545, 303365, 297489, 291307, 290918, 274256, 256452, 235122, 234755, 35960, 35847, 35843, 35841, 312674, 312659, 35997, 312652, 312635, 36002, 290618, 310162, 312602, 310236, 287967, 36117, 310133, 287766, 161104, 311304, 36112, 309983, 312583, 311636, 310868, 303284, 235708, 290925, 35885, 310361, 310353, 310338, 303468, 303368, 303275, 290933, 290434, 288181, 288150, 288146, 288043, 288023, 288003, 36261, 35977, 311637, 36196, 36236, 290922, 310204, 287841, 280066, 303374, 303333, 290877},
		"spb":     {308684, 308619, 308613, 308602, 308539, 304456, 304318, 304107, 298024, 297871, 297723, 297680, 297647, 297457, 297302, 295967, 293083, 293055, 292946, 292904, 292595, 292499, 291371, 288093, 287301, 284671, 284646, 284558, 284504, 283834, 283593, 283142, 282548, 282546, 282542, 282540, 282418, 282415, 282406, 282405, 281807, 279593, 279547, 278492, 277293, 277286, 276355, 276345, 276260, 276196, 293048, 258381, 258184, 257201, 256868, 240482, 240118, 240034, 239715, 102246, 102046, 101726, 92881, 92741, 92575, 91198, 91170, 89748, 89353, 89210, 89124, 87292, 87281, 87273, 87269, 87258, 87251, 87218, 87196, 89172, 86915, 87124, 87193, 87109, 87090, 87075, 87030, 87016, 87009, 86984, 86983, 86951, 86934, 86922, 276016, 86903, 86871, 86866, 911, 86946},
		"krd":     {307349, 307360, 307242, 306806, 306792, 306762, 306722, 306680, 306650, 306475, 295724, 292030, 292019, 291995, 291891, 264488, 263725, 263629, 75800, 74718, 74161, 73169, 1858, 1796},
		"novosib": {313003, 312007, 311753, 310694, 308152, 308100, 308010, 305957, 305939, 305895, 299058, 298963, 294023, 293988, 293789, 293748, 293727, 277867, 226560, 161601, 161393, 160652, 160156, 159929, 159857, 159006, 158897},
		"perm":    {311461, 311446, 311436, 307456, 306938, 306937, 306934, 305671, 311518, 311540, 305614, 305463, 305122, 304776, 275411, 311473},
		"rostov":  {310446, 310459, 296362, 296339, 296217, 296167, 295896, 285762, 285593, 285490, 285460, 310469, 285449, 285434, 285407, 267808, 267795, 267739, 17051, 3840, 3810, 3766, 3757, 3743, 3740, 3738, 3700, 3696},
		"tula":    {310051, 310023, 304261, 304197, 304106, 303997, 303981, 303895, 303852},
	}
	for cityPref, portalCityId := range citiesList {
		for _, id := range ids[cityPref] {
			resp, err := http.Get(fmt.Sprintf("%s/?key=%s&met=%s&s_id=%s&f_[jk_id][]=%s", p.url, p.key, jkListGetMethod, portalCityId, strconv.Itoa(id)))
			if err != nil {
				return nil, err
			}
			body, err := ioutil.ReadAll(resp.Body)
			if err != nil {
				return nil, err
			}
			var list InputJsonAlt
			json.Unmarshal(body, &list)
			jkInput := list.List[0]
			jk := models.JK{
				ID:        bson.NewObjectId(),
				Domain:    cityPref,
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
	fmt.Println(len(jkResultList))
	return jkResultList, nil
}
