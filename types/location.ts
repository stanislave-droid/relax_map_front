export interface Location {
  _id: string;
  image: string;
  name: string;
  description: string;
  locationType: string;
  region: string;
  rate: number;
  ownerId: string;
  feedbacksId?: string[];
  coordinates?: {
    lat: number;
    lon: number;
  };
}
