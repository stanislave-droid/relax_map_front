export interface Feedback {
  _id: string;
  ownerId: string;
  rate: number;
  description: string;
  userName: string;
  locationId: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface FeedbacksApiResponse {
  page: number;
  limit: number;
  totalFeedbacks: number;
  totalPages: number;
  feedbacks: Feedback[];
}
