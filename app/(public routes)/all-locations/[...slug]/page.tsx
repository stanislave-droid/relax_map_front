import { fetchLocations } from "@/lib/api/serverApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import LocationsClient from "./Locations.client";
import { type SortBy } from "@/types/location";
<<<<<<< HEAD

interface LocationsProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
=======
import { getSearch } from "@/utils/getSearch";

interface LocationsProps {
  params: Promise<{ slug: string }>;
>>>>>>> 2d40f6eb220ae7e370cda688be6d7e43ce1586f3
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

<<<<<<< HEAD
export default async function Locations({
  params,
  searchParams,
}: LocationsProps) {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const SearchParams = await searchParams;

  const region = slug && slug[1] !== "all-regions" ? slug[1] : undefined;
  const type = slug && slug[0] !== "all-types" ? slug[0] : undefined;
  const search =
    typeof SearchParams.search == "string" ? SearchParams.search : undefined;
  const sortDirection = slug && slug[2] ? "desc" : undefined;

  await queryClient.infiniteQuery({
    queryKey: ["locations"],
=======
export default async function Locations({ params }: LocationsProps) {
  const queryClient = new QueryClient();
  const { slug } = await params;

  const region = slug && slug[1] !== "all-regions" ? slug[1] : undefined;
  const type = slug && slug[0] !== "all-types" ? slug[0] : undefined;
  const search = getSearch(slug[3]);
  const sortDirection = slug && slug[2] ? "desc" : undefined;

  await queryClient.infiniteQuery({
    queryKey: ["locations", region, type, getSortBy(slug)],
>>>>>>> 2d40f6eb220ae7e370cda688be6d7e43ce1586f3
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
