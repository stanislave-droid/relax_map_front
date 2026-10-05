"use client";

import {useQuery} from "@tanstack/react-query";
import {fetchLocationById, getUserById} from "@/lib/api/clientApi";
import Spinner from "@/components/ui/Spinner/Spinner";
import LocationDescription from "@/components/location/LocationDescription/LocationDescription";
import LocationInfoBlock from "@/components/location/LocationInfoBlock/LocationInfoBlock";
import css from "./LocationDetailsClient.module.css";


interface LocationDetailsClientProps {
    id: string,
}

export default function LocationDetailsClient({id}: LocationDetailsClientProps) {

    const {data: location, isLoading: isLocationLoading, isError: isLocationError} = useQuery({
        queryKey: ["location", id],
        queryFn: () => fetchLocationById(id),
        refetchOnMount: false,
    });

    const {data: author, isLoading: isAuthorLoading, isError: isAuthorError} = useQuery({
        queryKey: ["author", location?.ownerId],
        queryFn: () => getUserById(location!.ownerId),
        enabled: !!location,
        refetchOnMount: false,
    });


    if (isLocationError || isAuthorError) {
        return (
            <p>Не вдалося завантажити локацію</p>
        )
    }

    if (isLocationLoading || isAuthorLoading || !location || !author) {
        return (
            <Spinner/>
        )
    }

    return (
        <main className={css.main}>
            <div className={css.info}>
                <LocationInfoBlock
                    name={location.name}
                    rating={location.rate}
                    region={location.region}
                    type={location.locationType}
                    imageUrl={location.image}
                    author={{
                        id: author._id,
                        name: author.name
                    }}
                />
            </div>

            <div className={css.description}>
                <LocationDescription description={location.description}/>
                {/*    <LocationMap />*/}
            </div>
        </main>
    )
}

