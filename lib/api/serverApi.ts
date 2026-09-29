import { fetchLocationsProps } from "@/types/location";
import { axiosClient as api } from "./api";
import { LocationsResponse } from "@/app/api/locations/route";

export async function fetchLocations({
  page = 1,
  limit = 6,
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

import { FeedbacksResponse } from "@/types/feedback";

export const getAllFeedbacks = async (
  page = 1,
  limit = 10,
): Promise<FeedbacksResponse> => {
  const { data } = await api.get<FeedbacksResponse>("/feedbacks", {
    params: { page, limit },
  });
  return data;
};
