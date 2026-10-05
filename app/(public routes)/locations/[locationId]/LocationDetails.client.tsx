"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchLocationById, getUserById } from "@/lib/api/clientApi";
import LocationDescription from "@/components/location/LocationDescription/LocationDescription";
import LocationInfoBlock from "@/components/location/LocationInfoBlock/LocationInfoBlock";
import css from "./LocationDetailsClient.module.css";
import GoogleMap from "@/components/Map/Map";

interface LocationDetailsClientProps {
  id: string;
}

export default function LocationDetailsClient({
  id,
}: LocationDetailsClientProps) {
  const { data: location, isError: isLocationError } = useQuery({
    queryKey: ["location", id],
    queryFn: () => fetchLocationById(id),
    refetchOnMount: false,
  });

  const { data: author, isError: isAuthorError } = useQuery({
    queryKey: ["author", location?.ownerId],
    queryFn: () => getUserById(location!.ownerId),
    enabled: !!location,
    refetchOnMount: false,
  });

  if (isLocationError || isAuthorError || !location || !author) {
    throw new Error("Не вдалося завантажити локацію");
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
            name: author.name,
            avatarUrl: null,
          }}
        />
      </div>

      <div className={css.description}>
        <LocationDescription description={location.description} />
        {
          <GoogleMap
            lat={location.coordinates.lat}
            lon={location.coordinates.lon}
            title={location.name}
          />
        }
      </div>
    </main>
  );
}
