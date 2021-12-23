import LocationPin from "../location-pin"

const CityTitle = ({params, index, length}) => {
    return (
        <div className="city_title" style={{color:`#${params.main_color}`, fontSize:"28px",}}><LocationPin fill={"#"+params.main_color} /> Санкт-Петербург {index!=null?<span>Шаг 2/4</span>:""}</div>
    )
}

export default CityTitle