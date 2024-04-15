import { useParams } from "react-router-dom";
import useFetchData from "../utils/useFetch";
import { CiMap } from "react-icons/ci";
import PropertyDetail from "../components/FunctionalComponents/PropertyDetail";
import { IoBedOutline } from "react-icons/io5";
import { TbBath, TbRulerMeasure } from "react-icons/tb";
import { LuShapes } from "react-icons/lu";
import { PiGarage } from "react-icons/pi";
import { TiTick } from "react-icons/ti";
import PropTypes from "prop-types";
import { BsDoorOpen } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { memo } from "react";
import Loader from "../components/FunctionalComponents/Loader";
import { FaRegHeart } from "react-icons/fa";
import { addToStorage, getFromStorage } from "../utils/localStorage";
import { MessageContext } from "./Root";
import { AuthContext } from "../Auth/AuthProvider";

/**
 * Renders an overview component with a title, value, and icon.
 *
 * @component
 * @param {string} title - The title of the overview.
 * @param {string} value - The value of the overview.
 * @param {ReactNode} icon - The icon to display in the overview.
 * @returns {JSX.Element} The rendered overview component.
 */
const Overview = memo(({ title, value, icon }) => (
    <div className="flex items-center gap-3">
        <div className="p-2 border border-gray-100 text-2xl rounded-lg text-gray-400">
            {icon}
        </div>
        <div>
            <p className="text-gray-500">{title}:</p>
            <p className="font-bold lg:text-lg capitalize">
                {value} {title === "Area" ? "Sq ft." : ""}
            </p>
        </div>
    </div>
));

Overview.displayName = "Overview";

Overview.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
};

/**
 * Renders a component that displays details with a title and value.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the detail.
 * @param {string} props.value - The value of the detail.
 * @returns {JSX.Element} The rendered Details component.
 */
const Details = memo(({ title, value }) => (
    <div className="grid grid-cols-2">
        <p className="font-bold">{title}</p>
        <p>{value}</p>
    </div>
));

Details.displayName = "Details";

Details.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

const PropertyPage = () => {
    const { id } = useParams();
    const { data, isLoading } = useFetchData();
    const { notifySuccess, notifyError } = useContext(MessageContext);
    const { user } = useContext(AuthContext);
    const [isFavorite, setIsFavorite] = useState(false);

    const currentProperty = data.find((property) => property.id === id);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (currentProperty) {
            document.title = `${currentProperty.estate_title} | ParallaX Properties`;
            const favorites = getFromStorage(user.email);
            setIsFavorite(favorites.includes(currentProperty.id));
        }
    }, [currentProperty, user.email]);

    if (isLoading) return <Loader />;

    /**
     * Handles the favorite functionality for a property.
     */
    const handleFavorite = () => {
        const favorites = getFromStorage(user.email);
        if (!favorites.includes(currentProperty.id)) {
            favorites.push(currentProperty.id);
            notifySuccess(
                `'${currentProperty.estate_title}' added to favorites`
            );
            addToStorage(user.email, [...favorites]);
            setIsFavorite(true);
            return;
        }
        const updatedFavorites = favorites.filter(
            (id) => id !== currentProperty.id
        );
        notifyError(`'${currentProperty.estate_title}' removed from favorites`);
        addToStorage(user.email, [...updatedFavorites]);
        setIsFavorite(false);
    };

    return (
        <>
            <div className="lg:pb-0 pb-4 flex flex-col gap-5 lg:mt-[80px] mt-[88px] mb-10">
                <div className="flex lg:flex-row flex-col lg:h-dvh">
                    <div className="flex w-full">
                        <img
                            className="object-cover lg:rounded-br-xl"
                            src={currentProperty.image}
                            alt={currentProperty.name}
                        />
                    </div>
                    <div className="w-full lg:p-10 p-3 flex justify-center flex-col items-start">
                        <h1 className="animate__animated animate__fadeInDown font-black text-4xl lg:text-7xl text-black">
                            {currentProperty.estate_title}
                        </h1>
                        <div className="flex lg:items-start  flex-col lg:justify-between gap-3 lg:gap-5 lg:mt-8 mt-3">
                            <div className="animate__animated animate__fadeInUp">
                                <div className="flex lg:flex-row flex-col gap-3 lg:items-center">
                                    <p className="">
                                        <span
                                            className={`${
                                                currentProperty.status ===
                                                "rent"
                                                    ? "bg-red-500"
                                                    : "bg-green-500"
                                            } text-white font-extrabold text-sm w-fit rounded-3xl px-2 py-1`}
                                        >
                                            For {currentProperty.status}
                                        </span>
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <p className="flex gap-2 items-center">
                                            <CiMap className="text-xl" />
                                            {currentProperty.location}
                                        </p>
                                        <button
                                            onClick={handleFavorite}
                                            className={`p-2 rounded-xl border-2 text-gray-400 ${
                                                isFavorite
                                                    ? "bg-primary text-white border-primary"
                                                    : "hover:text-white hover:bg-primary hover:border-primary"
                                            }`}
                                        >
                                            <FaRegHeart className="text-2xl" />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-3 lg:mt-4 mt-3">
                                    <PropertyDetail
                                        IconComponent={IoBedOutline}
                                        label="Beds"
                                        value={currentProperty.beds.toString()}
                                    />
                                    <PropertyDetail
                                        IconComponent={TbBath}
                                        label="Baths"
                                        value={currentProperty.baths.toString()}
                                    />
                                    <PropertyDetail
                                        IconComponent={TbRulerMeasure}
                                        label="Sq ft"
                                        value={currentProperty.area.toString()}
                                    />
                                </div>
                            </div>
                            <p className="text-3xl text-primary font-black animate__animated animate__fadeInUp">
                                $ {currentProperty.price}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 lg:mx-5 mx-3 lg:gap-8 gap-3">
                    <div className="mt-8 custom-shadow w-full rounded-xl p-5 animate__animated animate__fadeIn">
                        <p className="font-bold text-xl">Overview</p>
                        <hr className="text-gray-400 my-3" />
                        <div className="grid lg:grid-cols-4 grid-cols-1 items-center gap-6">
                            <Overview
                                title="Rooms"
                                value={(
                                    currentProperty.baths + currentProperty.beds
                                ).toString()}
                                icon={<BsDoorOpen />}
                            />
                            <Overview
                                title="Baths"
                                value={currentProperty.baths.toString()}
                                icon={<TbBath />}
                            />
                            <Overview
                                title="Beds"
                                value={currentProperty.beds.toString()}
                                icon={<IoBedOutline />}
                            />
                            <Overview
                                title="Area"
                                value={currentProperty.area.toString()}
                                icon={<TbRulerMeasure />}
                            />
                            <Overview
                                title="Year Built"
                                value={currentProperty.year_built.toString()}
                                icon={<MdOutlineCalendarMonth />}
                            />
                            <Overview
                                title="Property Type"
                                value={currentProperty.segment_name}
                                icon={<LuShapes />}
                            />
                            <Overview
                                title="Garages"
                                value={currentProperty.garages.toString()}
                                icon={<PiGarage />}
                            />
                        </div>
                    </div>
                    <div className="mt-8 custom-shadow w-full rounded-xl p-5">
                        <h1 className="font-bold text-2xl">Description</h1>
                        <hr className="text-gray-400 my-3" />
                        <p className="text-gray-500 mt-3">
                            {currentProperty.description
                                .split(". ")
                                .map((sentence, index, array) => {
                                    return index !== array.length - 1 ? (
                                        <>
                                            <span>{sentence}.</span>
                                            <br/>
                                            <br/>
                                        </>
                                    ) : (
                                        <span>{sentence}</span>
                                    );
                                })}
                        </p>
                    </div>
                    <div className="mt-8 custom-shadow w-full rounded-xl p-5">
                        <h1 className="font-bold text-2xl">Property Details</h1>
                        <hr className="text-gray-400 my-3" />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 capitalize">
                            <Details
                                title="Property ID"
                                value={currentProperty.id}
                            />
                            <Details
                                title="Property Type"
                                value={currentProperty.segment_name}
                            />
                            <Details
                                title="Year Built"
                                value={currentProperty.year_built.toString()}
                            />
                            <Details
                                title="Garages"
                                value={currentProperty.garages.toString()}
                            />
                            <Details
                                title="Area"
                                value={currentProperty.area.toString()}
                            />
                            <Details
                                title="Rooms"
                                value={(
                                    currentProperty.baths + currentProperty.beds
                                ).toString()}
                            />
                            <Details
                                title="Baths"
                                value={currentProperty.baths.toString()}
                            />
                            <Details
                                title="Beds"
                                value={currentProperty.beds.toString()}
                            />
                        </div>
                    </div>
                    <div className="mt-8 custom-shadow max-w-full rounded-xl p-5">
                        <h1 className="font-bold text-2xl">Facilties</h1>
                        <hr className="text-gray-400 my-3" />
                        <div className="grid grid-cols-1 items-center lg:grid-cols-3 md:grid-cols-2 gap-3 capitalize font-bold">
                            {(currentProperty.facilities || []).map(
                                (facility, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2"
                                    >
                                        <div className="p-1 rounded-lg bg-primary">
                                            <TiTick className="text-white text-2xl " />
                                        </div>
                                        <p>{facility}</p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PropertyPage;
