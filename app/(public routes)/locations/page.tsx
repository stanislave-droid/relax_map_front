import { fetchLocations } from "@/lib/api/serverApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import LocationsClient from "./Locations.client";

export default async function Locations() {
  const queryClient = new QueryClient();

  await queryClient.query({
    queryKey: ["locations"],
    queryFn: () => fetchLocations({}),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LocationsClient />
    </HydrationBoundary>
  );
}
