import { User } from "@/types/user";
import { axiosClient as api } from "./api";
import { LocationsResponse } from "@/app/api/locations/route";
import { fetchLocationsProps } from "@/types/location";

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>("/users/current");
  return data;
};

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
