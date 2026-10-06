"use client";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
} from "@vis.gl/react-google-maps";
import css from "./Map.module.css";
import clsx from "clsx";
import { useState } from "react";
import { Coordinates } from "@/types/location";

interface GoogleMapProps {
  lat?: number;
  lon?: number;
  title?: string;
  className?: string;
}

function MapController({ lat, lon: lng }: Coordinates) {
  const [coordinates, setCoordinates] = useState({ lat, lng });
  const map = useMap();

  if (!map) return;
  if (coordinates.lat == lat || coordinates.lng == lng) return;
  setCoordinates({ lat, lng });
  map.setCenter({ lat, lng });

  return <></>;
}

export default function GoogleMap({
  lat = 0,
  lon: lng = 0,
  title,
  className,
}: GoogleMapProps) {
  return (
    <APIProvider apiKey={process.env.NEXT_PRIVATE_MAP_API || ""}>
      <Map
        className={clsx(css.map, className)}
        defaultCenter={{ lat, lng }}
        defaultZoom={9}
        mapId="LocationsGoogleMap"
      >
        <MapController lat={lat} lon={lng} />
        <AdvancedMarker position={{ lat, lng }} title={title} />
      </Map>
    </APIProvider>
  );
}
