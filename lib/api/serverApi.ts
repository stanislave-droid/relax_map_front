import { axiosClient as api } from "./api";

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
