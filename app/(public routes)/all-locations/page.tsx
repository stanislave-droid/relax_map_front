<<<<<<< HEAD
import { redirect } from "next/navigation";

export default function DefaultLocationsPath() {
  redirect("/all-locations/all-types/all-regions/popular");
=======
import { LOCATIONS_PATH } from "@/types/location";
import { redirect } from "next/navigation";

export default function DefaultLocationsPath() {
  redirect(LOCATIONS_PATH);
>>>>>>> 2d40f6eb220ae7e370cda688be6d7e43ce1586f3
}
