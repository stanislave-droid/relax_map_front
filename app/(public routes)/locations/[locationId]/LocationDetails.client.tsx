"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchLocationById,
  fetchLocationTypes,
  fetchRegions,
  getFeedbacksByLocation,
  getUserById,
} from "@/lib/api/clientApi";
import LocationDescription from "@/components/location/LocationDescription/LocationDescription";
import LocationInfoBlock from "@/components/location/LocationInfoBlock/LocationInfoBlock";
import ReviewsBlock from "@/components/sections/ReviewsBlock/ReviewsBlock";
import Button from "@/components/ui/Button/Button";
import AddReviewBlock from "@/components/addFeedback/AddReviewModal/AddReviewModal";
import css from "./LocationDetailsClient.module.css";
import Map from "@/components/Map/Map";
import SetMap from "@/components/Map/SetMap";
import { LocationType } from "@/types/locationType";
import { Region } from "@/types/region";

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

  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const { data: locationTypes } = useQuery({
    queryKey: ["locations"],
    queryFn: () => fetchLocationTypes(),
    enabled: !!location,
    refetchOnMount: false,
  });

  const { data: regions } = useQuery({
    queryKey: ["regions"],
    queryFn: () => fetchRegions(),
    enabled: !!location,
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

  const { data: feedbacksData } = useQuery({
    queryKey: ["feedbacks", id],
    queryFn: () => getFeedbacksByLocation(id),
    refetchOnMount: false,
  });

  const locationTypesArray = locationTypes as LocationType[];
  let indexLocationType: number = -1;
  if (locationTypesArray !== undefined) {
    indexLocationType = locationTypesArray.findIndex(
      (locationType) => location.locationType === locationType.slug,
    );
  }
  let locationTypeName = location.locationType;
  if (indexLocationType !== -1) {
    locationTypeName = locationTypesArray[indexLocationType].name;
  }

  const regionsArray = regions as Region[];
  let indexRegion: number = -1;
  if (regionsArray !== undefined) {
    indexRegion = regionsArray.findIndex((region) => (location.region === region.slug));
  }
  let regionName = location.region;
  if (indexRegion !== -1) {
    regionName = regionsArray[indexRegion].name;
  }

  return (
    <main className={css.main}>
      <div className={css.info}>
        <LocationInfoBlock
          name={location.name}
          rating={location.rate}
          region={regionName}
          type={locationTypeName}
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
        <Map
          lat={location.coordinates.lat}
          lon={location.coordinates.lon}
          title={location.name}
        />
      </div>

      <ReviewsBlock
        title="Відгуки"
        feedbacks={feedbacksData?.feedbacks ?? []}
        action={
          <Button onClick={() => setIsReviewOpen(true)}>Залишити відгук</Button>
        }
      />

      <AddReviewBlock
        isOpen={isReviewOpen}
        locationId={id}
        onClose={() => setIsReviewOpen(false)}
      />
    </main>
  );
}
