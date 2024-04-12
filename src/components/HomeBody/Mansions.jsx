import useFetchData from "../../utils/useFetch";
import LoadingCard from "../FunctionalComponents/LoadingCard";
import PropertyCard from "../FunctionalComponents/PropertyCard";

const Mansions = () => {
    const {data, isLoading} = useFetchData();
    const mansions = data.filter((property) => property.segment_name === "mansion");

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
            mansions.map((property) => (
                <PropertyCard key={property.id} property={property} showStatus={false}/>
            ))
        }
        </>
    );
};

export default Mansions;