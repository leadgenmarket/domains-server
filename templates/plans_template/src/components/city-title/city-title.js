import LocationPin from '../location-pin';

const CityTitle = ({ params, index, length }) => {
  return (
    <div className="loc_text">
      <img src={params.logo ? params.logo : '/img/hd_loc2.png'} />
      <span>{domainSettings.city.Name}</span>
    </div>
  );
};

export default CityTitle;
