import { useRef } from 'react';
import Slider from 'react-slick';

const Gallery = () => {
  const slider = useRef(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
  };

  const images = [
    '/photo/1m.jpg',
    '/photo/2m.jpg',
    '/photo/3m.jpg',
    '/photo/4m.jpg',
    '/photo/5m.jpg',
    '/photo/6m.jpg',
    '/photo/7m.jpg',
    '/photo/8m.jpg',
    '/photo/9m.jpg',
    '/photo/10m.jpg',
    '/photo/11m.jpg',
  ];
  return (
    <section className="hod_str">
      <div className="tm">Фотогалерея</div>
      <div className="hd_slid slick-initialized slick-slider slick-dotted">
        <button
          className="slick-prev slick-arrow"
          aria-label="Previous"
          type="button"
          style={{ display: 'inline-block' }}
        >
          Previous
        </button>
        <Slider ref={slider} className="hd_slid" {...settings}>
          {images.map((image) => {
            return (
              <div key={image} className="hod_in">
                <div className="hod_gal">
                  <img src={image} />
                </div>
              </div>
            );
          })}
        </Slider>
        <button
          className="slick-next slick-arrow"
          aria-label="Next"
          type="button"
          style={{ display: 'inline-block' }}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Gallery;
