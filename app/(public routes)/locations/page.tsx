import { fetchLocations } from "@/lib/api/serverApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import LocationsClient from "./Locations.client";
import { type SortBy, SortDirection } from "@/types/location";

interface LocationsProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function Locations({ searchParams }: LocationsProps) {
  const queryClient = new QueryClient();
  const { page, limit, region, type, search, sortBy, sortDirection } =
    await searchParams;

  await queryClient.infiniteQuery({
    queryKey: ["locations"],
    queryFn: () =>
      fetchLocations({
        page: page ? +page : 1,
        limit: limit ? +limit : 6,
        region,
        type,
        search,
        sortBy: sortBy ? (sortBy as SortBy) : undefined,
        sortDirection: sortDirection
          ? (sortDirection as SortDirection)
          : undefined,
      }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LocationsClient />
    </HydrationBoundary>
  );
}
