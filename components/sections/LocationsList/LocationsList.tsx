import { Location } from "@/types/location";
import css from "./LocationsList.module.css";
import LocationCard from "@/components/ui/LocationCard/LocationCard";
import clsx from "clsx";

interface LocationsListProps {
  locations: Location[];
  isOwnProfile: boolean;
  className?: string;
}

export default function LocationsList({
  locations,
  isOwnProfile,
  className,
}: LocationsListProps) {
  return (
    <ul className={clsx(css.locationsList, className)}>
      {locations.map((location) => (
        <li key={location._id}>
          <LocationCard
            location={location}
            locationLink={`${process.env.NEXT_PUBLIC_SITE_URL}/locations/${location._id}`}
            editLink={
              isOwnProfile
                ? `${process.env.NEXT_PUBLIC_SITE_URL}/locations/create/${location._id}`
                : undefined
            }
          />
        </li>
      ))}
    </ul>
  );
}
