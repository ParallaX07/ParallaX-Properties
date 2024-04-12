import useFetchData from "../../utils/useFetch";
import LoadingCard from "../FunctionalComponents/LoadingCard";
import PropertyCard from "../FunctionalComponents/PropertyCard";

const Penthouse = () => {
    const {data, isLoading} = useFetchData();
    const penthouses = data.filter((property) => property.segment_name === "penthouse");

    if (isLoading) {
        return (
            <>
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
            </>
        );
    }

    return (
        <>
        {
            penthouses.map((property) => (
                <PropertyCard key={property.id} property={property} showStatus={false}/>
            ))
        }
        </>
    );
};

export default Penthouse;