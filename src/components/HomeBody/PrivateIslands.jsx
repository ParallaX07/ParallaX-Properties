import useFetchData from "../../utils/useFetch";
import LoadingCard from "../FunctionalComponents/LoadingCard";
import PropertyCard from "../FunctionalComponents/PropertyCard";

const PrivateIslands = () => {
    const {data, isLoading} = useFetchData();
    const beachHouses = data.filter((property) => property.segment_name === "private island");

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
            beachHouses.map((property) => (
                <PropertyCard key={property.id} property={property} showStatus={false}/>
            ))
        }
        </>
    );
};

export default PrivateIslands;