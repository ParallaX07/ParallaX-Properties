import PropTypes from "prop-types";
import { CiMap } from "react-icons/ci";
import { IoBedOutline } from "react-icons/io5";
import { TbBath, TbRulerMeasure } from "react-icons/tb";
import { Link } from "react-router-dom";
import PropertyDetail from "./PropertyDetail";

const PropertyCard = ({ property, showStatus }) => {
    const hide = !showStatus ? "hidden" : "";
    const color = property.status === "sale" ? "bg-green-500" : "bg-red-500";

    return (
        <div className="p-4 rounded-3xl custom-shadow flex flex-col flex-grow justify-around lg:min-h-full relative border border-gray-100">
            <img
                className="rounded-2xl h-[210px] object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
                src={property.image}
                alt=""
            />
            <div className="my-3">
                <h2 className="text-2xl font-extrabold hover:text-primary">
                    {property.estate_title}
                </h2>
                <p className="flex gap-2 items-center mt-2">
                    <CiMap className="lg:text-xl" />
                    {property.location}
                </p>
                <p className="text-xl text-primary font-bold lg:mt-4">
                    $ {property.price}
                </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
                <PropertyDetail
                    IconComponent={IoBedOutline}
                    label="Beds"
                    value={property.beds.toString()}
                />
                <PropertyDetail
                    IconComponent={TbBath}
                    label="Baths"
                    value={property.baths.toString()}
                />
                <PropertyDetail
                    IconComponent={TbRulerMeasure}
                    label="Sq ft"
                    value={property.area.toString()}
                />
            </div>
            <Link to={`/property/${property.id}`}>
                <button className="text-white mt-6 px-3 py-2 w-full bg-primary hover:bg-transparent hover:text-black font-medium rounded-lg border-2 border-transparent hover:border-primary">
                    View Property
                </button>
            </Link>
            <div
                className={`px-2 py-1 ${hide} ${color} text-white font-extrabold text-sm w-fit absolute top-4 left-0 rounded-r-full`}
            >
                For {property.status}
            </div>
        </div>
    );
};

PropertyCard.propTypes = {
    property: PropTypes.object.isRequired,
    showStatus: PropTypes.bool,
};

export default PropertyCard;
