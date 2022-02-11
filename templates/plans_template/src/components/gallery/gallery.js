import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import "./css/slick.min.css"
import "./css/slick-theme.min.css"
import { LightgalleryProvider, LightgalleryItem, useLightgallery } from "react-lightgallery";
import "lightgallery.js/dist/css/lightgallery.css";

const Gallery = ({params}) => {
  const slider = useRef(null);
  const [images, setImages] = useState([])
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false, 
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
      <div className="slid_wrap">
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
          <div class="slid_nav">
              <div class="slid_nav_el slid_nav_l" onClick={()=>{slider.current.slickPrev()}} style={{backgroundColor: `#${params.main_color}`}}><span></span></div>
              <div class="slid_nav_el slid_nav_r" onClick={()=>{slider.current.slickNext()}} style={{backgroundColor: `#${params.main_color}`}}><span></span></div>
          </div>
      </div>
    </section>
  );
};

export default Gallery;
