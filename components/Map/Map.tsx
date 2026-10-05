"use client";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
} from "@vis.gl/react-google-maps";
import css from "./Map.module.css";
import clsx from "clsx";
import { useEffect, useRef } from "react";

interface GoogleMapProps {
  lat?: number;
  lon?: number;
  title?: string;
  className?: string;
}

export default function GoogleMap({
  lat = 0,
  lon: lng = 0,
  title,
  className,
}: GoogleMapProps) {
  const map = useRef(null);
  useEffect(() => {}, []);

  return (
    <APIProvider apiKey={process.env.NEXT_PRIVATE_MAP_API || ""}>
      <Map
        className={clsx(css.map, className)}
        defaultCenter={{ lat, lng }}
        defaultZoom={9}
        mapId="LocationsGoogleMap"
        onCenterChanged={() => {}}
      >
        <AdvancedMarker position={{ lat, lng }} title={title} />
      </Map>
    </APIProvider>
  );
}
