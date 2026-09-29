import { axiosClient as api } from "./api";
import { LocationsResponse } from "@/app/api/locations/route";
import { fetchLocationsProps } from "@/types/location";
import { User } from "@/types/user";
import { RegisterSchema } from "@/components/auth/RegistrationForm/RegistrationForm";
import type { AxiosError } from "axios";

export interface ApiErrorResponse {
  message: string;
  error?: string;
}

export type ApiError = AxiosError<ApiErrorResponse>;

export const register = async (userData: RegisterSchema): Promise<User> => {
  const { data } = await api.post<User>("/auth/register", userData);
  return data;
};

export const login = async (userData: LoginSchema): Promise<User> => {
    const { data } = await axiosClient.post<User>("/auth/login", userData);
    return data;
};

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
