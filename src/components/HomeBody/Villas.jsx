import useFetchData from "../../utils/useFetch";
import LoadingCard from "../FunctionalComponents/LoadingCard";
import PropertyCard from "../FunctionalComponents/PropertyCard";

const Villas = () => {
    const {data, isLoading} = useFetchData();
    const villas = data.filter((property) => property.segment_name === "villa");

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
            villas.map((property) => (
                <PropertyCard key={property.id} property={property} showStatus={false}/>
            ))
        }
        </>
    );
};

export default Villas;