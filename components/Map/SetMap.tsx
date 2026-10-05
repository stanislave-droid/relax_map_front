import { useEffect, useRef, useState } from "react";
import LocationSearch from "../forms/LocationSearch/LocationSearch";
import GoogleMap from "./Map";
import { placesResponse } from "@/app/api/map/route";
import { findPlace } from "@/lib/api/clientApi";
import { showError } from "../ui/Toast/Toast";

export default function SetMap() {
  const [place, setPlace] = useState<placesResponse>({
    lat: 0,
    lon: 0,
    name: "",
  });

  const handleSearch = (search: string) => {
    findPlace(search)
      .then((data) => {
        setPlace(data);
      })
      .catch((error) => {
        console.log(error.message);
        showError(error.message);
      });
  };

  return (
    <div>
      <LocationSearch onSearch={handleSearch} />
      <GoogleMap lat={place.lat} lon={place.lon} title={place.name} />
    </div>
  );
}
