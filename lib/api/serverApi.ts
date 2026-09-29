import { fetchLocationsProps } from "@/types/location";
import { axiosClient as api } from "./api";
import { cookies } from "next/headers";
import { LocationsResponse } from "@/app/api/locations/route";

export async function fetchLocations({
  page = 1,
  limit = 10,
  region,
  type,
  search,
  sortBy,
  sortDirection,
}: fetchLocationsProps) {
  const { data } = await api.get<LocationsResponse>("/locations", {
    params: {
      page,
      limit,
      region,
      type,
      search,
      sortBy,
      sortDirection,
    },
  });

  return data;
}
