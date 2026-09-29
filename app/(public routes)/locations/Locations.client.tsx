"use client";

import { fetchLocations } from "@/lib/api/clientApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function LocationsClient() {
  const { data } = useQuery({
    queryKey: ["locations"],
    queryFn: () => fetchLocations({}),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  return <p>{data?.locations.map((location) => location.name)}</p>;
}
