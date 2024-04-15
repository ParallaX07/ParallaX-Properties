// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

import "./PropertySwiper.css";

// import required modules
import { Scrollbar } from "swiper/modules";
import LoadingCard from "../LoadingCard";
import PropertyCard from "../PropertyCard";
import PropTypes from "prop-types";

const breakpoints = {
    640: {
        slidesPerView: 1, // Show only one slide on smaller screens
        spaceBetween: 10, // Add some spacing between slides
    },
    // Up to 1024px (tablets)
    1024: {
        slidesPerView: 3, // Show two slides on medium-sized screens
        spaceBetween: 20, // Increase spacing for better visibility
    },
};

const PropertySwiper = ({ isLoading, properties }) => (
    <Swiper
        scrollbar={{ hide: false }}
        loop={true}
        breakpoints={breakpoints}
        modules={[Scrollbar]}
        className="mySlider"
    >
        {isLoading ? (
            <>
                <SwiperSlide>
                    <LoadingCard />
                </SwiperSlide>
                <SwiperSlide>
                    <LoadingCard />
                </SwiperSlide>
                <SwiperSlide>
                    <LoadingCard />
                </SwiperSlide>
                <SwiperSlide>
                    <LoadingCard />
                </SwiperSlide>
            </>
        ) : (
            properties.map((property) => (
                <SwiperSlide
                    key={property.id}
                    style={{ textAlign: "start", display: "flex", flexDirection: "column", flexGrow: "1", height: "100%"}}
                >
                    <PropertyCard property={property} showStatus={true} className="h-full"/>
                </SwiperSlide>
            ))
        )}
    </Swiper>
);

PropertySwiper.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    properties: PropTypes.array.isRequired,
};

export default PropertySwiper;
