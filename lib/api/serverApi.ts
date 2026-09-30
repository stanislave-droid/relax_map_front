import { fetchLocationsProps } from "@/types/location";
import { axiosClient as api } from "./api";
import { LocationsResponse } from "@/app/api/locations/route";
import { User } from "@/types/user";
import { Location } from "@/types/location";
import { FeedbacksResponse } from "@/types/feedback";
import { cookies } from "next/headers";

export async function fetchLocations({
  page = 1,
  limit = 6,
  region,
  type,
  search,
  sortBy,
  sortDirection,
}: fetchLocationsProps) {
  const cookieStore = await cookies;
  const { data } = await api.get<LocationsResponse>("/locations", {
    headers: {
      Cookie: cookieStore.toString(),
    },
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

export const getUserById = async (userId: string): Promise<User> => {
  const { data } = await api.get<User>(`/users/${userId}`);
  return data;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies;
  const { data } = await api.get<User>("/users/current", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
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

export const getAllFeedbacks = async (
  page = 1,
  limit = 10,
): Promise<FeedbacksResponse> => {
  const { data } = await api.get<FeedbacksResponse>("/feedbacks", {
    params: { page, limit },
  });
  return data;
};
