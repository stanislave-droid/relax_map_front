"use client";

import LocationsList from "@/components/sections/LocationsList/LocationsList";
import Button from "@/components/ui/Button/Button";
import { fetchLocations } from "@/lib/api/clientApi";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import css from "./Locations.module.css";
import { useSearchParams } from "next/navigation";
import { SortBy, SortDirection } from "@/types/location";
import { getSearch } from "@/utils/getSearch";

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

export default function LocationsClient() {
  const params = useSearchParams();

  const SearchParams = new URLSearchParams(params.toString());
  const region = SearchParams.get("region") || undefined;
  const type = SearchParams.get("type") || undefined;
  const search = getSearch(SearchParams.get("search") || "");
  const sortBy = SearchParams.get("sortBy") || undefined;
  const sortDirection = SearchParams.get("sortDirection") || undefined;

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: ["locations", region, type, sortBy, search],
      queryFn: ({ pageParam }) =>
        fetchLocations({
          page: pageParam,
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
      initialData: { pages: [], pageParams: [] },
      getNextPageParam: (lastPage) =>
        lastPage.totalPages >= lastPage.page + 1
          ? lastPage.page + 1
          : undefined,
      placeholderData: keepPreviousData,
      refetchOnMount: false,
    });

  const locations = data.pages.flatMap((page) => page.locations);

  return locations && locations.length !== 0 ? (
    <div>
      <LocationsList
        locations={locations}
        isOwnProfile={false}
        className={css.locationsList}
      />
      {hasNextPage && (
        <Button
          disabled={isLoading || isFetching}
          className={css.showMoreBtn}
          onClick={() => {
            fetchNextPage();
          }}
        >
          Показати ще
        </Button>
      )}
    </div>
  ) : (
    <p className={css.notFound}>Локацій не знайдено</p>
  );
}
