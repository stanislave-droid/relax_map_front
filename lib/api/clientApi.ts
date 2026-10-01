import {
  axiosClient as api,
  axiosClientWithCredentials as authApi,
} from "./api";
import { LocationsResponse } from "@/app/api/locations/route";
import { fetchLocationsProps } from "@/types/location";
import { User } from "@/types/user";
import { Location } from "@/types/location";
import { RegisterSchema } from "@/components/auth/RegistrationForm/RegistrationForm";
import type { AxiosError } from "axios";
import { LoginSchema } from "@/components/auth/LoginForm/LoginForm";

export interface ApiErrorResponse {
  message: string;
  error?: string;
}

export type ApiError = AxiosError<ApiErrorResponse>;

export const register = async (userData: RegisterSchema): Promise<User> => {
  const { data } = await authApi.post<User>("/auth/register", userData);
  return data;
};

export const login = async (userData: LoginSchema): Promise<User> => {
  const { data } = await authApi.post<User>("/auth/login", userData);
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await authApi.get<User>("/users/current");
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

export async function updateLocation(location: Location): Promise<Location> {
  const response = await authApi.patch<Location>(`/locations/${location._id}`, location);

  return response.data;
}
