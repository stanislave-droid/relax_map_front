import { Location } from "./location";

export interface User {
  _id: string;
  avatarUrl: string;
  name: string;
  articlesAmount: number;
}

export interface UserLocationsResponse {
  locations: Location[];
  page: number;
  perPage: number;
  totalPages: number;
  totalLocations: number;
  isEmpty: boolean;
}
