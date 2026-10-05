import { fetchLocations } from "@/lib/api/serverApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import LocationsClient from "./Locations.client";
import { type SortBy } from "@/types/location";

interface LocationsProps {
  params: Promise<{ slug: string }>;
}

const getSortBy = (slug: string): SortBy | undefined => {
  if (slug && slug[2] !== "popular") {
    const sortTypes: SortBy[] = ["rate", "updatedAt"];
    if (sortTypes.includes(slug[2] as SortBy)) {
      return slug[2] as SortBy;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};

export default async function Locations({ params }: LocationsProps) {
  const queryClient = new QueryClient();
  const { slug } = await params;

  const region = slug && slug[1] !== "all-regions" ? slug[1] : undefined;
  const type = slug && slug[0] !== "all-types" ? slug[0] : undefined;
  const search = slug && slug[3] ? decodeURIComponent(slug[3]) : "";
  const sortDirection = slug && slug[2] ? "desc" : undefined;

  console.log(search);

  await queryClient.infiniteQuery({
    queryKey: ["locations", region, type, getSortBy(slug)],
    queryFn: () =>
      fetchLocations({
        page: 1,
        limit: 6,
        region,
        type,
        search,
        sortBy: getSortBy(slug),
        sortDirection,
      }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LocationsClient />
    </HydrationBoundary>
  );
}
