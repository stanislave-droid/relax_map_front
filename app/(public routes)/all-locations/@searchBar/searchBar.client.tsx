"use client";

import Input from "@/components/ui/Input/Input";
import Select from "@/components/ui/Select/Select";
import css from "./searchBar.module.css";
import { LocationType } from "@/types/locationType";
import { Region } from "@/types/region";
import clsx from "clsx";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { getSearch } from "@/utils/getSearch";
import { LOCATIONS_PATH } from "@/types/location";

interface SearchBarClientProps {
  types: LocationType[];
  regions: Region[];
  activeType: string;
  activeRegion: string;
  search?: string;
}

export const REGION_DEFAULT = "all-regions";
export const TYPE_DEFAULT = "all-types";
export const SORT_DEFAULT = "popular";

export function SearchBarClient({ types, regions }: SearchBarClientProps) {
  const router = useRouter();
  const params = useSearchParams();
  const SearchParams = new URLSearchParams(params.toString());

  const handleUpdateParam = (key: string, value: string) => {
    if (value) {
      SearchParams.set(key, value);
    } else {
      SearchParams.delete(key);
    }

    router.push(`${LOCATIONS_PATH}?${SearchParams.toString()}`);
  };

  const delaySearch = useDebouncedCallback(
    (value) => handleUpdateParam("search", value),
    1000,
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    delaySearch(search.trim());
  };

  return (
    <div className={css.wrapper}>
      <Input
        aria-label="Пошук"
        defaultValue={SearchParams.get("search") || ""}
        className={clsx(css.input, css.field)}
        onChange={handleSearch}
      ></Input>
      <div className={css.categoriesWrapper}>
        <Select
          aria-label="Тип"
          value={SearchParams.get("type") || TYPE_DEFAULT}
          onChange={(event) =>
            handleUpdateParam(
              "type",
              event.target.value !== TYPE_DEFAULT ? event.target.value : "",
            )
          }
          className={clsx(css.typesSelect, css.field)}
        >
          <option value={TYPE_DEFAULT} defaultChecked>
            Всі
          </option>
          {types &&
            types.map((type) => (
              <option key={type.slug} value={type.slug}>
                {type.name}
              </option>
            ))}
        </Select>
        <Select
          aria-label="Регіон"
          value={SearchParams.get("region") || REGION_DEFAULT}
          onChange={(event) =>
            handleUpdateParam(
              "region",
              event.target.value !== REGION_DEFAULT ? event.target.value : "",
            )
          }
          className={clsx(css.regionsSelect, css.field)}
        >
          <option value={REGION_DEFAULT} defaultChecked>
            Всі
          </option>
          {regions &&
            regions.map((region) => (
              <option key={region.slug} value={region.slug}>
                {region.name}
              </option>
            ))}
        </Select>
      </div>
      <Select
        aria-label="Сортування"
        value={SearchParams.get("sortBy") || SORT_DEFAULT}
        onChange={(event) =>
          handleUpdateParam(
            "sortBy",
            event.target.value !== SORT_DEFAULT ? event.target.value : "",
          )
        }
        className={clsx(css.sortSelect, css.field)}
      >
        <option value={SORT_DEFAULT} defaultChecked>
          За популярністю
        </option>
        <option value={"rate"}>За рейтингом</option>
        <option value={"updatedAt"}>Новіші спочатку</option>
      </Select>
    </div>
  );
}
