package titles

import (
	"domain-server/internal/models"
	"fmt"
	"time"

	mongodb "github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
)

type Repository interface {
	AddTitle(title models.Title) (models.Title, error)
	GetTitlesList() ([]models.Title, error)
	UpdateTitle(title models.Title) error
	DeleteTitle(id string) error
	GetTitleForDomain(cityID bson.ObjectId, rayon string, k string) (string, error)
}

type repositroyDB struct {
	titles    *mongodb.Collection
	locations *mongodb.Collection
}

func New(dbClient *mongodb.Database) Repository {
	return &repositroyDB{
		titles:    dbClient.C("titles"),
		locations: dbClient.C("locations"),
	}
}

func (r *repositroyDB) AddTitle(title models.Title) (models.Title, error) {
	title.ID = bson.NewObjectId()
	title.CreatedAt = time.Now()
	err := r.titles.Insert(&title)
	if err != nil {
		return title, err
	}
	return title, nil
}

func (r *repositroyDB) UpdateTitle(title models.Title) error {
	err := r.titles.Update(bson.M{"_id": title.ID}, title)
	if err != nil {
		return err
	}
	return nil
}

func (r *repositroyDB) DeleteTitle(id string) error {
	err := r.titles.Remove(bson.M{"_id": bson.ObjectIdHex(id)})
	if err != nil {
		return err
	}
	return nil
}

func (r *repositroyDB) GetTitlesList() ([]models.Title, error) {
	titles := []models.Title{}
	err := r.titles.Pipe([]bson.M{{"$sort": bson.M{"created_at": -1}}}).All(&titles)
	if err != nil {
		return titles, err
	}
	return titles, nil
}

func (r *repositroyDB) GetTitleForDomain(cityID bson.ObjectId, rayon string, k string) (string, error) {
	//со старого сервера, так как id не вариант было менять
	customTitles := map[string]string{
		"261648":    "1-комнатные квартиры в новостройках",
		"261649":    "2-комнатные квартиры в новостройках",
		"261653":    "3-комнатные квартиры в новостройках",
		"261654":    "Квартиры-студии в новостройках",
		"901010":    "Евродвушки в новостройках",
		"9970025":   "Апартаменты в новостройках",
		"9970027":   "Пентхаусы в новостройках",
		"297209":    "Квартиры в новостройках на стадии котлована",
		"297210":    "Квартиры на этапе строительства",
		"297208":    "Квартиры в строящихся домах",
		"297211":    "Квартиры на стадии фундамента",
		"909001":    "Строящееся жилье",
		"909002":    "Строящаяся недвижимость",
		"909003":    "Строящиеся жилые комплексы",
		"901004":    "Новостройки бизнес-класса",
		"200000004": "Новостройки комфорт-класса",
		"261656":    "Новостройки эконом-класса",
		"261652":    "Дешевые квартиры в новостройках",
		"261646":    "Недорогие квартиры в новостройках",
		"261655":    "Новостройки в ипотеку",
		"297215":    "Новостройки в рассрочку",
		"9970036":   "Новостройки в кредит",
		"9970033":   "Новостройки для инвестиций",
		"261567":    "Квартиры в новостройках",
		"261607":    "Новостройки от застройщиков",
		"m":         "Квартиры в новостройках у моря",
		"261650":    "Квартиры с отделкой в новостройках",
		"9970037":   "Новостройки без посредников",
		"997004":    "Новостройки рядом с школой",
		"997005":    "Новостройки для студентов",
		"997006":    "Квартиры в новостройках для большой семьи",
		"997007":    "Новостройки для семей с детьми",
		"997008":    "Новостройки для молодоженов",
		"997009":    "Новостройки для пенсионеров",
		"9970010":   "Квартиры маленькой площади в новостройках",
		"9970011":   "Новостройки с гардеробной",
		"9970012":   "Новостройки с большими окнами",
		"9970013":   "Новостройки с большой кухней",
		"9970014":   "Новостройки с большой лоджией",
		"9970015":   "Новостройки с большим балконом",
		"9970016":   "Новостройки с большим санузлом",
		"997001":    "Новостройки для инвестиций",
		"9970018":   "Квартиры в новостройках рядом с детсадом",
		"9970019":   "Квартиры в новостройках рядом с парком",
		"9970020":   "Квартиры в новостройках рядом с развитой инфраструктурой",
		"9970021":   "Новостройки в экологически чистом районе",
		"1100003":   "Бесплатный подбор квартир в новостройках",
		"1100004":   "Каталог новостроек",
		"1100001":   "Сервис по подбору новостроек",
		"1100002":   "Портал новостроек",
		"9970029":   "Квартиры в жилых комплексах от застройщиков",
		"9970024":   "Квартиры по акциям в новостройках",
		"9970026":   "Видовые квартиры в новостройках",
		"9970028":   "Смарт-квартиры в новостройках",
		"999100":    "1-ком квартиры – вторичное жилье",
		"999101":    "2- ком квартиры – вторичное жилье",
		"999102":    "3-ком квартиры – вторичное жилье",
		"999103":    "Квартиры-студии - вторичное жилье",
		"999104":    "Дешевая вторичка",
		"999105":    "Недорогое вторичное жилье",
		"999106":    "Вторичное жилье в ипотеку",
		"999107":    "Квартиры от собственников",
		"999108":    "Квартиры от хозяина",
		"9970038":   "Все новостройки и вторичка",
		"901006":    "Жилье бизнес-класса",
		"901009":    "Жилье премиум-класса",
		"901003":    "Элитное жилье в Центре",
		"901005":    "Квартиры бизнес-класса",
		"901008":    "Квартиры премиум-класса",
		"901002":    "Элитные квартиры в Центре",
		"901007":    "Новостройки премиум-класса",
		"901001":    "Элитные новостройки в Центре",
		"9970034":   "Новостройки в благоустроенных районах",
		"997003":    "Новостройки рядом с метро",
		"200000145": "Новостройки от застройщиков от 20 млн",
		"200000148": "Квартиры в новостройках Москвы от 20 млн",
		"200000147": "Элитные новостройки в Москве от 50 млн",
		"200000146": "Новостройки от застройщиков от 2,5 млн",
	}

	if _, ok := customTitles[k]; ok {
		return customTitles[k], nil
	}
	if k == "" {
		location := models.Location{}
		err := r.locations.Find(bson.M{"city_id": cityID, "path": rayon}).One(&location)
		if err != nil {
			return "", err
		}
		return GenerateTitleFromLocation(location), nil
	}
	title := models.Title{}
	err := r.titles.Find(bson.M{"_id": bson.ObjectIdHex(k)}).One(&title)
	return title.Title, err
}

func GenerateTitleFromLocation(location models.Location) string {
	prefix := "Новостройки в"
	if location.Type == "streets" {
		fmt.Println(string([]rune(location.NameSite)[0:2]))
		if string([]rune(location.NameSite)[0:2]) == "в " {
			prefix = "Новостройки "
		} else {
			prefix = "Новостройки на"
		}
	}
	return fmt.Sprintf(`%s %s`, prefix, location.NameSite)
}
