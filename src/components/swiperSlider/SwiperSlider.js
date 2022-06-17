import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import "./styleSwiper.css";
import "swiper/css";
import ImageOne from '../../assets/images/1.jpg';
import ImageTwo from '../../assets/images/2.jpg';
import ImageThree from '../../assets/images/3.jpg';
import ImageFour from '../../assets/images/4.jpg';

function SwiperSlider() {
  return (
    <Swiper 
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }} 
        loop={true} 
        modules={[ Autoplay, Navigation ]} 
        className="mySwiper" 
        >
        <SwiperSlide><img src={ImageOne} alt='ImageOne'/></SwiperSlide>
        <SwiperSlide><img src={ImageTwo} alt='ImageTwo'/></SwiperSlide>
        <SwiperSlide><img src={ImageThree} alt='ImageThree'/></SwiperSlide>
        <SwiperSlide><img src={ImageFour} alt='ImageFour'/></SwiperSlide>
    </Swiper>
  )
}

export default SwiperSlider;