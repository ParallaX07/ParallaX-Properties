import Marquee from "react-fast-marquee";
import BannerSlider from "../BannerSlider/BannerSlider";
import useDocumentTitle from "../../utils/dynamicTitle";
import useFetchData from "../../utils/useFetch";
import AOS from "aos";
import "aos/dist/aos.css";

import { useCallback, useEffect, useState } from "react";
import CountUpComponent from "../FunctionalComponents/CountUpComponent";
import PropertySwiper from "../FunctionalComponents/PropertySwiper/PropertySwiper";
import PropertyCard from "../FunctionalComponents/PropertyCard";
import LoadingCard from "../FunctionalComponents/LoadingCard";

const marqueeImages = [
    "https://i.ibb.co/nnxSfYt/brand-3.png",
    "https://i.ibb.co/f0gQtsQ/brand-2.png",
    "https://i.ibb.co/c2b2jf3/brand-1.png",
    "https://i.ibb.co/zf5VX3d/brand-6.png",
    "https://i.ibb.co/c6d8ycN/brand-5.png",
    "https://i.ibb.co/N1ZybFG/brand-4.png",
];

const HomeBody = () => {
    useDocumentTitle("Home | ParallaX Properties");

    const { data, isLoading } = useFetchData();

    const forRent = data.filter((property) => property.status === "rent");
    const forSale = data.filter((property) => property.status === "sale");

    const [selectedCategory, setSelectedCategory] = useState("penthouse");
    const [filteredProperty, setFilteredProperty] = useState([]);

    const [propertyLoading, setPropertyLoading] = useState(true);

    const handleCategoryChange = useCallback((category) => {
        setSelectedCategory(category);
    }, []);

    useEffect(() => {
        let timeoutId;
        setPropertyLoading(true);
        if (selectedCategory === "penthouse") {
            setFilteredProperty(
                data.filter((project) => project.segment_name === "penthouse")
            );
        } else {
            setFilteredProperty(
                data.filter(
                    (project) => project.segment_name === selectedCategory
                )
            );
        }
        timeoutId = setTimeout(() => {
            setPropertyLoading(false);
        }, 2000);

        AOS.init({
            duration: 2000,
        });

        return () => {
            clearTimeout(timeoutId);
        };
    }, [selectedCategory, data]);

    const active =
        "text-primary font-bold bg-white custom-shadow px-3 py-2 rounded-3xl";
    const inactive =
        "text-black hover:text-primary font-bold custom-shadow px-3 py-2 rounded-3xl";

    return (
        <>
            <div className="lg:h-[calc(100dvh-80px)] bg-gradient-to-t from-primary to-accent lg:py-10 lg:pb-0 pb-4 flex lg:flex-row flex-col-reverse gap-5 justify-between lg:mt-[80px] mt-[88px]">
                <div className="mx-3 lg:ml-10 lg:mt-32 flex justify-between flex-col">
                    <div>
                        <h1 className="animate__animated animate__fadeInDown font-black text-4xl lg:text-7xl">
                            We will find the perfect home for you
                        </h1>
                        <p className="animate__animated animate__fadeInUp mt-6 lg:mt-8 font-medium text-gray-700 lg:text-lg">
                            Forget endless scrolling and dead-end emails.
                            We&apos;ll make the search exciting and efficient
                            and find properties that tick all your the boxes!
                        </p>
                    </div>
                    <div className="lg:mb-20 lg:my-10 mt-6 flex gap-6 mx-auto lg:mx-0">
                        <CountUpComponent end={1500} label="Properties Ready" />
                        <CountUpComponent end={700} label="Happy Customers" />
                    </div>
                </div>
                <BannerSlider />
            </div>
            {/* companies */}
            <div className="lg:mx-32 mx-3 mt-8">
                <h1 className="mb-5 font-bold">
                    Trusted by over 150+ companies
                </h1>
                <Marquee>
                    {marqueeImages.map((src, index) => (
                        <img key={index} src={src} alt="" />
                    ))}
                </Marquee>
                {/* featured properties */}
                <section className="mt-10 lg:mt-20 lg:mx-auto ">
                    <h2 className="text-center text-4xl font-extrabold">
                        Featured Properties
                    </h2>
                    <p className="text-center lg:max-w-[600px] mx-auto mt-4 font-medium">
                        Step inside and discover your dream home. Our featured
                        properties showcase the best of the best, from stunning
                        design details to prime locations. Get ready to be
                        wowed!
                    </p>
                    <nav className="flex flex-wrap lg:justify-start justify-center gap-3 lg:mx-auto w-fit mt-8">
                        <button
                            onClick={() => handleCategoryChange("penthouse")}
                            className={
                                selectedCategory === "penthouse"
                                    ? `${active}`
                                    : `${inactive}`
                            }
                        >
                            Penthouse
                        </button>
                        <button
                            onClick={() =>
                                handleCategoryChange("beachfront property")
                            }
                            className={
                                selectedCategory === "beachfront property"
                                    ? `${active}`
                                    : `${inactive}`
                            }
                        >
                            Beachfront Properties
                        </button>
                        <button
                            onClick={() => handleCategoryChange("resort")}
                            className={
                                selectedCategory === "resort"
                                    ? `${active}`
                                    : `${inactive}`
                            }
                        >
                            Resorts
                        </button>
                        <button
                            onClick={() =>
                                handleCategoryChange("private island")
                            }
                            className={
                                selectedCategory === "private island"
                                    ? `${active}`
                                    : `${inactive}`
                            }
                        >
                            Private Islands
                        </button>
                        <button
                            onClick={() => handleCategoryChange("villa")}
                            className={
                                selectedCategory === "villa"
                                    ? `${active}`
                                    : `${inactive}`
                            }
                        >
                            Villas
                        </button>
                        <button
                            onClick={() => handleCategoryChange("mansion")}
                            className={
                                selectedCategory === "mansion"
                                    ? `${active}`
                                    : `${inactive}`
                            }
                        >
                            Mansions
                        </button>
                    </nav>
                    {/* featured properties cards */}
                    <div
                        id="featured-properties"
                        data-aos="fade-up"
                        className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 py-8 justify-center"
                    >
                        {propertyLoading ? (
                            <>
                                <LoadingCard />
                                <LoadingCard />
                                <LoadingCard />
                            </>
                        ) : (
                            filteredProperty.map((property) => (
                                <PropertyCard
                                    key={property.id}
                                    property={property}
                                    showStatus={false}
                                />
                            ))
                        )}
                    </div>
                </section>
            </div>
            <div
                data-aos="fade"
                data-aos-anchor-placement="bottom-center"
                className="mt-10 lg:mt-20 bg-gradient-to-tl py-10 from-accent via-white to-white"
            ></div>

            {/* for rent section */}
            <section
                id="rent"
                data-aos="fade"
                data-aos-anchor-placement="top-center"
                data-aos-easing="linear"
                data-aos-duration="1500"
                className="px-3 bg-gradient-to-bl lg:py-5 from-accent via-white to-white"
            >
                <h2 className="text-center text-4xl font-extrabold">
                    For Rent
                </h2>
                <p className="text-center lg:max-w-[600px] mx-auto my-4 font-medium">
                    Find your next home with us. We have a wide range of
                    properties available for rent. From cozy apartments to
                    spacious villas, we have it all!
                </p>
                <div className="lg:mx-32 text-sm">
                    <PropertySwiper
                        isLoading={isLoading}
                        properties={forRent}
                    />
                </div>
            </section>
            {/* for sale section */}
            <section
                id="sale"
                data-aos="fade"
                data-aos-anchor-placement="top-center"
                className="px-3 mt-10 lg:mt-20 bg-gradient-to-tr from-accent via-white to-white pb-10"
            >
                <h2 className="text-center text-4xl font-extrabold">
                    For Sale
                </h2>
                <p className="text-center lg:max-w-[600px] mx-auto my-4 font-medium">
                    Find your dream home with us. We have a wide range of
                    properties available for sale. From cozy apartments to
                    spacious villas, we have it all!
                </p>
                <div className="lg:mx-32">
                    <PropertySwiper
                        isLoading={isLoading}
                        properties={forSale}
                    />
                </div>
            </section>
        </>
    );
};

export default HomeBody;
