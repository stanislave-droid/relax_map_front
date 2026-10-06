import { LOCATIONS_PATH } from "@/types/location";
import { redirect } from "next/navigation";

export default function DefaultLocationsPath() {
  redirect(LOCATIONS_PATH);
}
