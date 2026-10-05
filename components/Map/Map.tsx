import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import css from "./Map.module.css";
import clsx from "clsx";

interface GoogleMapProps {
  lat: number;
  lon: number;
  title: string;
  className?: string;
}

export default function GoogleMap({
  lat,
  lon: lng,
  title,
  className,
}: GoogleMapProps) {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_MAP_API || ""}>
      <Map
        className={clsx(css.map, className)}
        defaultCenter={{ lat, lng }}
        defaultZoom={3}
        mapId="LocationGoogleMap"
      >
        <AdvancedMarker position={{ lat, lng }} title={title}></AdvancedMarker>
      </Map>
    </APIProvider>
  );
}
