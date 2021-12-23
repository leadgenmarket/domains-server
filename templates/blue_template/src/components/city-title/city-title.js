import LocationPin from "../location-pin"

const CityTitle = ({params, index, length}) => {
    return (
        <div className="city_title" style={{color:`#${params.main_color}`, display:"flex", fontSize:"28px", paddingLeft:0}}><LocationPin fill={"#"+params.main_color} /> Санкт-Петербург {index!=null?<span>Шаг 2/4</span>:""}</div>
    )
}

export default CityTitle