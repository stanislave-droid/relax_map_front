import { Coordinates } from "../location";

export interface LocationFormValues {
  image: File | string | null;
  name: string;
  locationType: string;
  region: string;
  description: string;
  coordinates?: Coordinates;
}
