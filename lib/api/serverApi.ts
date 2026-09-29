import { User } from "@/types/user";
import { axiosClient as api } from "./api";
import { Location } from "@/types/location";

export const getUserById = async (userId: string): Promise<User> => {
  const { data } = await api.get<User>(`/users/${userId}`);
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>("/users/current");
  return data;
};

interface UserLocationsResponse {
  locations: Location[];
  total: number;
  isEmpty: boolean;
}

export const getUserLocations = async (
  userId: string,
): Promise<UserLocationsResponse> => {
  const { data } = await api.get<UserLocationsResponse>(
    `/users/${userId}/locations`,
  );
  return data;
};
