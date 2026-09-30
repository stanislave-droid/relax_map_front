"use client";

import LocationsList from "@/components/sections/LocationsList/LocationsList";
import Button from "@/components/ui/Button/Button";
import { fetchLocations } from "@/lib/api/clientApi";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import css from "./Locations.module.css";
import { useSearchParams } from "next/navigation";
import { SortBy, SortDirection } from "@/types/location";

export default function LocationsClient() {
  const searchParams = useSearchParams();
  const limit = searchParams.get("limit");
  const region = searchParams.get("region");
  const type = searchParams.get("type");
  const search = searchParams.get("search");
  const sortBy = searchParams.get("sortBy");
  const sortDirection = searchParams.get("sortDirection");

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: ["locations"],
      queryFn: ({ pageParam }) =>
        fetchLocations({
          page: pageParam,
          limit: limit ? +limit : 6,
          region: region ?? undefined,
          type: type ?? undefined,
          search: search ?? undefined,
          sortBy: sortBy ? (sortBy as SortBy) : undefined,
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

  return (
    <>
      {locations && locations.length !== 0 && (
        <div className="container" aria-label="locations">
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
      )}
    </>
  );
}
