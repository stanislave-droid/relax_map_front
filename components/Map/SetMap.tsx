import { useState } from "react";
import LocationSearch from "../forms/LocationSearch/LocationSearch";
import GoogleMap from "./Map";
import { placesResponse } from "@/app/api/map/route";
import { findPlace } from "@/lib/api/clientApi";
import { showError } from "../ui/Toast/Toast";
import { Coordinates } from "@/types/location";
import css from "./Map.module.css";

interface SetMapProps {
  setValue: (value: Coordinates) => void;
}

export default function SetMap({ setValue }: SetMapProps) {
  const [place, setPlace] = useState<placesResponse>({
    lat: 0,
    lon: 0,
    name: "",
  });

  const handleSearch = (search: string) => {
    findPlace(search)
      .then((data) => {
        setPlace(data);
        if (setValue) setValue({ lat: data.lat, lon: data.lon });
      })
      .catch((error) => {
        console.log(error.message);
        showError(error.message);
      });
  };

  return (
    <div className={css.setMapWrapper}>
      <LocationSearch onSearch={handleSearch} />
      <GoogleMap lat={place.lat} lon={place.lon} title={place.name} />
    </div>
  );
}
