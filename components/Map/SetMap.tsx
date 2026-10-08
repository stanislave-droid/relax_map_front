import { useState } from "react";
import LocationSearch from "../forms/LocationSearch/LocationSearch";
import GoogleMap from "./Map";
import { PlacesResponse } from "@/app/api/map/route";
import { findPlace } from "@/lib/api/clientApi";
import { showError } from "../ui/Toast/Toast";
import { Coordinates } from "@/types/location";
import css from "./Map.module.css";

interface SetMapProps {
  getValue: (value: Coordinates) => void;
  previousPlace?: PlacesResponse;
  onSearch?: () => void;
}

export default function SetMap({
  getValue,
  previousPlace,
  onSearch,
}: SetMapProps) {
  const [place, setPlace] = useState<PlacesResponse>({
    lat: 0,
    lon: 0,
    name: "",
  });

  if (
    previousPlace &&
    previousPlace.lat !== place.lat &&
    previousPlace.lon !== place.lon
  ) {
    setPlace(previousPlace);
  }

  const handleSearch = (search: string) => {
    findPlace(search)
      .then((data) => {
        setPlace(data);
        if (onSearch) onSearch();
        if (getValue) getValue({ lat: data.lat, lon: data.lon });
      })
      .catch((error) => {
        console.error(error.message);
        showError("Такого місця не має :(");
      });
  };

  return (
    <div className={css.setMapWrapper}>
      <LocationSearch onSearch={handleSearch} />
      <GoogleMap lat={place.lat} lon={place.lon} title={place.name} />
    </div>
  );
}
