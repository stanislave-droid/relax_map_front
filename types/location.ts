export interface Location {
  _id: string;
  image: string;
  name: string;
  description: string;
  locationType: string;
  region: string;
  rate: number;
  ownerId: string;
  feedbacksId: string[];
  coordinates: Coordinates;
}

export type SortBy = "rate" | "updatedAt";
export type SortDirection = "asc" | "desc";
export const LOCATIONS_PATH = "/all-locations";
export const SortByArray: (SortBy | "popular")[] = [
  "popular",
  "rate",
  "updatedAt",
];

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface fetchLocationsProps {
  page?: number;
  limit?: number;
  region?: string;
  type?: string;
  search?: string;
  sortBy?: SortBy;
  sortDirection?: SortDirection;
}

export interface UpdateLocationData {
  image?: string;
  name?: string;
  description?: string;
  locationType?: string;
  region?: string;
  coordinates?: Coordinates;
}
