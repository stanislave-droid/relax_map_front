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
  const SearchParams = await searchParams;

  const region = (SearchParams.region as string) || undefined;
  const type = (SearchParams.type as string) || undefined;
  const search = getSearch((SearchParams.search as string) || "");
  const sortBy = (SearchParams.sortBy as string) || undefined;
  const sortDirection = SearchParams.sortDirection || undefined;

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
