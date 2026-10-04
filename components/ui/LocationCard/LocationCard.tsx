"use client";

import "../common.module.css";
import { Location } from "@/types/location";
import { LocationType } from "@/types/locationType";
import Image from "next/image";
import Link from "../Link/Link";
import Icon from "../Icon/Icon";
import css from "./LocationCard.module.css";
import RatingStars from "../RatingStars/RatingStars";
import { fetchLocationTypes } from "@/lib/api/clientApi";
import { useEffect, useState } from "react";

interface LocationCardProps {
  location: Location;
  locationLink: string;
  editLink?: string;
}

export default function LocationCard({
  location,
  locationLink,
  editLink,
}: LocationCardProps) {
  const [types, setTypes] = useState<LocationType[] | null>(null);
  
  let locationType: string = location.locationType;
  if (types !== null) {
    const index = types.findIndex((item) => (item.slug === location.locationType))
    if (index !== -1) {
      locationType = types[index].type;
    }
  }

  useEffect(() => {
    async function fetchTypes() {
      const response = await fetchLocationTypes();
      setTypes(response);
    }

    fetchTypes();
  }, []);

  return (
    <div className={css.locationCard}>
      <Image
        src={location.image}
        alt={location.name}
        loading="lazy"
        width={421}
        height={421}
        className={css.locationCardImage}
      />
      <div className={css.locationCardContent}>
        <p className={css.locationType}>{locationType}</p>
        <div className={css.locationRate}>
          <RatingStars value={location.rate} />
        </div>
        <p className={css.locationCardName}>{location.name}</p>
        <div className={css.locationCardLinks}>
          <Link href={locationLink} className={css.locationLink}>
            Переглянути локацію
          </Link>
          {editLink !== undefined && (
            <Link href={editLink} className={css.editLink}>
              <Icon name="edit" width={24} height={24} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
