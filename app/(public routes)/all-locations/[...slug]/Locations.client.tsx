"use client";

import LocationsList from "@/components/sections/LocationsList/LocationsList";
import Button from "@/components/ui/Button/Button";
import { fetchLocations } from "@/lib/api/clientApi";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import css from "./Locations.module.css";
<<<<<<< HEAD
import { useParams, useSearchParams } from "next/navigation";
import { SortBy } from "@/types/location";
=======
import { useParams } from "next/navigation";
import { SortBy } from "@/types/location";
import { getSearch } from "@/utils/getSearch";
>>>>>>> 2d40f6eb220ae7e370cda688be6d7e43ce1586f3

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

export default function LocationsClient() {
<<<<<<< HEAD
  const searchParams = useSearchParams();
  const searchParam = searchParams.get("search");
  const { slug } = useParams();

  const search = typeof searchParam == "string" ? searchParam : undefined;
=======
  const { slug } = useParams();

  const search = slug && getSearch(slug[3]);
>>>>>>> 2d40f6eb220ae7e370cda688be6d7e43ce1586f3
  const region = slug && slug[1] !== "all-regions" ? slug[1] : undefined;
  const type = slug && slug[0] !== "all-types" ? slug[0] : undefined;
  const sortBy = getSortBy(slug as string);
  const sortDirection = sortBy ? "desc" : undefined;

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery({
<<<<<<< HEAD
      queryKey: ["locations"],
=======
      queryKey: ["locations", region, type, sortBy],
>>>>>>> 2d40f6eb220ae7e370cda688be6d7e43ce1586f3
      queryFn: ({ pageParam }) =>
        fetchLocations({
          page: pageParam,
          limit: 6,
          region,
          type,
          search,
          sortBy,
          sortDirection,
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
