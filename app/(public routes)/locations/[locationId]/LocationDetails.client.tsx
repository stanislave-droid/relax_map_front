import {useRouter} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import Modal from "@/components/ui/Modal/Modal";
import {fetchLocationById} from "@/lib/api/clientApi";
import Spinner from "@/components/ui/Spinner/Spinner";
import {Toast} from "next/dist/next-devtools/dev-overlay/components/toast";
import css from "./LocationDetailsClient.module.css";
import LocationCard from "@/components/ui/LocationCard/LocationCard";
import RatingStars from "@/components/ui/RatingStars/RatingStars";
// import clsx from "clsx";
import LocationDescription from "@/components/location/LocationDescription/LocationDescription";


interface LocationDetailsClientProps {
    id: string,
}

export default function LocationDetailsClient({id}: LocationDetailsClientProps) {
    const router = useRouter();

    const {data: location, isLoading, isError} = useQuery({
        queryKey: ["location", id],
        queryFn: () => fetchLocationById(id),
        refetchOnMount: false,
    });

    const handleBack = () => {
        router.back();
    }
    if (isLoading) {
        return (
            <Modal onClose={handleBack}>
                <Spinner/>
            </Modal>
        )
    }

    if (isError) {
        return (
            <Modal onClose={handleBack}>
                <Toast/>
            </Modal>
            )
    }

    return (
        <Modal onClose={handleBack}>
            <main className={css.main}>
                <div className={css.container}>
                    <div className={css.image}>
                        <LocationCard location={location.image} locationLink={""}/>
                    </div>

                    <div className={css.locationInfo}>
                        <RatingStars value={location.rate} className={css.rite}/>
                        <div className={css.title}>
                            <h2>{location?.name}</h2>
                        </div>
                        <div className={css.details}>
                            <p className={css.region}>Регіон: {location?.region}</p>
                            <p>Тип локації: {location?.locationType}</p>
                            <p>Автор статті: {location?.ownerId}</p>
                        </div>
                    </div>
                </div>

                <div className={css.description}>
                    <LocationDescription description={location.description}/>
                </div>

            </main>

        </Modal>
    )

}

