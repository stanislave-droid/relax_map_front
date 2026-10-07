import { fetchLocations } from "@/lib/api/serverApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import LocationsClient from "./Locations.client";
import { SortDirection, type SortBy } from "@/types/location";
import { getSearch } from "@/utils/getSearch";

interface LocationsProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const getSortBy = (sortBy: string | undefined): SortBy | undefined => {
  if (sortBy && sortBy !== "popular") {
    const sortTypes: SortBy[] = ["rate", "updatedAt"];
    if (sortTypes.includes(sortBy as SortBy)) {
      return sortBy as SortBy;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};

export default async function Locations({ searchParams }: LocationsProps) {
  const queryClient = new QueryClient();
  const params = await searchParams;

  const SearchParams = new URLSearchParams(params.toString());
  const region = SearchParams.get("region") || undefined;
  const type = SearchParams.get("type") || undefined;
  const search = getSearch(SearchParams.get("search") || "");
  const sortBy = SearchParams.get("sortBy") || undefined;
  const sortDirection = SearchParams.get("sortDirection") || undefined;

  await queryClient.infiniteQuery({
    queryKey: ["locations", region, type, getSortBy(sortBy), search],
    queryFn: () =>
      fetchLocations({
        page: 1,
        limit: 6,
        region,
        type,
        search,
        sortBy: getSortBy(sortBy),
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
