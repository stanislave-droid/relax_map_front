export interface Feedback {
  _id: string;
  userName: string;
  ownerId?: string;
  rate: number;
  description: string;
  locationId?: {
    _id: string;
    name: string;
  };
}

export interface FeedbacksResponse {
  page: number;
  limit: number;
  totalFeedbacks: number;
  totalPages: number;
  feedbacks: Feedback[];
}
