import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import "./css/slick.min.css"
import "./css/slick-theme.min.css"
import { LightgalleryProvider, LightgalleryItem, useLightgallery } from "react-lightgallery";
import "lightgallery.js/dist/css/lightgallery.css";

const Gallery = () => {
  const slider = useRef(null);
  const [images, setImages] = useState([])
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
  };


  useEffect(() => {
    setImages(domainSettings.domain.Photos);
  }, [domainSettings.domain.Advantages]);
  return (
    <section className="hod_str">
      <div className="tm">{domainSettings.domain.PhotosTitle}</div>
      <LightgalleryProvider style={{ display: "none" }} >
        <Slider ref={slider} className="hd_slid" {...settings}>
          {Object.keys(images).map((key) => {
            return (
              <div key={key} className="hod_in">
                <div className="hod_gal">
                  <LightgalleryItem group={"photo"} src={"https://admin.leadactiv.ru/file-store/" + images[key]} thumb={"https://admin.leadactiv.ru/file-store/" + key}>
                    <img src={"https://admin.leadactiv.ru/file-store/" + key} />
                  </LightgalleryItem>
                </div>
              </div>
            );
          })}
        </Slider>
      </LightgalleryProvider>
    </section>
  );
};

export default Gallery;
