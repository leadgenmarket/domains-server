import LocationPin from "../location-pin"

const CityTitle = ({ params, index, length }) => {
    return (
        <div className="city_title" style={{ color: `#${params.main_color}`, display: "flex", fontSize: "28px", paddingLeft: 0 }}><LocationPin fill={"#" + params.main_color} /> {domainSettings.city.Name} {index != null ? <span>Шаг {domainSettings.rayon === "" ? index + 1 : index}/{domainSettings.rayon !== "" ? length - 1 : length}</span> : ""}</div>
    )
}

export default CityTitle