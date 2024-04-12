import { useContext, useEffect } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { getFromStorage } from "../../utils/localStorage";
import useFetchData from "../../utils/useFetch";
import PropertyCard from "../FunctionalComponents/PropertyCard";
import Loader from "../FunctionalComponents/Loader";
import "./Favorites.css";
import { Link } from "react-router-dom";
import useDocumentTitle from "../../utils/dynamicTitle";

const Favorites = () => {
    const { data, isLoading } = useFetchData();
    const { user } = useContext(AuthContext);
    const favoritesList = getFromStorage(user.email);
    const favorites = data.filter((property) =>
        favoritesList.includes(property.id)
    );

    useDocumentTitle("Favorite Listings | ParallaX Properties");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    if (!favorites.length) {
        return (
            <div className="flex flex-col justify-center items-center h-[calc(100vh-88px)]">
                <div className="animation">Add listings!</div>
                <Link to="/">
                    <button className="py-2 px-4 bg-primary text-white font-extrabold text-xl rounded-lg">
                        Browse now
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className=" p-4 grid lg:grid-cols-3 grid-cols-1 mt-[88px] justify-center mx-3 lg:mx-32 gap-5 ">
                {favorites.map((property) => (
                    <PropertyCard
                        key={property.id}
                        property={property}
                        showStatus={true}
                    />
                ))}
            </div>
        </>
    );
};

export default Favorites;
