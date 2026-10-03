import { redirect } from "next/navigation";

export default function DefaultLocationsPath() {
  redirect("/all-locations/all-types/all-regions/popular");
}
