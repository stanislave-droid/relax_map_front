"use client";

import LocationsList from "@/components/sections/LocationsList/LocationsList";
import ProfilePlaceholder from "../ProfilePlaceholder/ProfilePlaceholder";
import { useEffect, useState, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUserLocations } from "@/lib/api/clientApi";
import Button from "@/components/ui/Button/Button";
import Spinner from "@/components/ui/Spinner/Spinner";
import css from "./LocationsGrid.module.css";

interface LocationsGridProps {
  userId: string;
  isOwnProfile: boolean;
}

export default function LocationsGrid({
  userId,
  isOwnProfile,
}: LocationsGridProps) {
  const [limit] = useState(() =>
    typeof window !== "undefined" && window.innerWidth >= 1440 ? 6 : 4,
  );

  const locationsRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: ["userLocations", userId, limit],
      queryFn: ({ pageParam }) =>
        fetchUserLocations({
          userId,
          page: pageParam,
          limit,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.totalPages >= Number(lastPage.page) + 1
          ? Number(lastPage.page) + 1
          : undefined,
    });

  const locations = data?.pages.flatMap((page) => page.locations) ?? [];
  const previousLocationsCount =
    data?.pages
      .slice(0, -1)
      .reduce((total, page) => total + page.locations.length, 0) ?? 0;

  useEffect(() => {
    if (data && data.pages.length > 1) {
      const list = locationsRef.current?.querySelector("ul");
      const newLocation = list?.children[previousLocationsCount] as
        | HTMLElement
        | undefined;

      newLocation?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [data, previousLocationsCount]);

  if (!isLoading && locations.length === 0) {
    return <ProfilePlaceholder isOwnProfile={isOwnProfile} />;
  }

  return (
    <div ref={locationsRef}>
      {!isOwnProfile && <h2 className={css.locationsTitle}>Локації</h2>}

      <LocationsList locations={locations} isOwnProfile={isOwnProfile} />

      {hasNextPage && (
        <>
          {!isFetching && (
            <Button
              type="button"
              className={css.loadMoreButton}
              onClick={() => fetchNextPage()}
            >
              Показати ще
            </Button>
          )}

          {isFetching && (
            <div className={css.spinnerWrapper}>
              <Spinner />
            </div>
          )}
        </>
      )}
    </div>
  );
}
