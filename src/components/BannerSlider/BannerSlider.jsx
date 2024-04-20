import { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./BannerSliderStyles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function BannerSlider() {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty("--progress", 1 - progress);
    };

    return (
        <Swiper
            spaceBetween={30}
            loop={true}
            centeredSlides={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            // navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="mySwiper lg:rounded-tl-[500px] lg:rounded-t-none"
        >
            <SwiperSlide>
                <img
                    src="https://i.ibb.co/kDPmg8x/alexa-real-estate-4.webp"
                    alt=""
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="https://i.ibb.co/6Dq4b7T/KALLES-5-Tips-For-Buying-the-Perfect-Piece-of-Luxury-Real-Estate.jpg"
                    alt=""
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="https://i.ibb.co/djN58xb/DOHENEY-ESTATES-POOL-VIEW-OF-LOS-ANGELES-TWILIGHT-REAL-ESTATE-PHOTOGRAPHY.jpg"
                    alt=""
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="https://i.ibb.co/0hyQbB4/market-luxury-real-estate.jpg"
                    alt=""
                />
            </SwiperSlide>
            <div className="autoplay-progress" slot="container-end">
                <svg viewBox="0 0 48 48" ref={progressCircle}>
                    <circle cx="24" cy="24" r="20"></circle>
                </svg>
                <span ref={progressContent}></span>
            </div>
        </Swiper>
    );
}
