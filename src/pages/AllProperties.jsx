import { useEffect } from "react";
import Loader from "../components/FunctionalComponents/Loader";
import PropertyCard from "../components/FunctionalComponents/PropertyCard";
import useFetchData from "../utils/useFetch";
import useDocumentTitle from "../utils/dynamicTitle";

const AllProperties = () => {
    const { data, isLoading } = useFetchData();
    useDocumentTitle("All Properties | ParallaX Properties");
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <div className=" p-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-[88px] justify-center mx-3 lg:mx-32 gap-5 ">
                {data.map((property) => (
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

export default AllProperties;
