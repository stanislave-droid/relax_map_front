"use client";

import LocationsList from "@/components/sections/LocationsList/LocationsList";
import Button from "@/components/ui/Button/Button";
import { fetchLocations } from "@/lib/api/clientApi";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import css from "./Locations.module.css";

export default function LocationsClient() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["locations"],
    queryFn: ({ pageParam }) => fetchLocations({ page: pageParam, limit: 6 }),
    initialPageParam: 1,
    initialData: { pages: [], pageParams: [] },
    getNextPageParam: (lastPage) =>
      lastPage.totalPages >= lastPage.page + 1 ? lastPage.page + 1 : undefined,
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
