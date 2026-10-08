"use client";

import Input from "@/components/ui/Input/Input";
import Select from "@/components/ui/Select/Select";
import css from "./searchBar.module.css";
import { LocationType } from "@/types/locationType";
import { Region } from "@/types/region";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
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

  const type = SearchParams.get("type");
  const region = SearchParams.get("region");
  const sortBy = SearchParams.get("sortBy");

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

  const [previousValue, setPreviousValue] = useState("");

  const handleSelectChange = (
    key: string,
    value: string,
    defaultValue: string,
  ) => {
    if (value != previousValue) {
      setPreviousValue(value);

      handleUpdateParam(key, value !== defaultValue ? value : "");
    }
  };

  return (
    <div className={css.wrapper}>
      <Input
        aria-label="Пошук"
        defaultValue={getSearch(SearchParams.get("search") || "")}
        className={clsx(css.input, css.field)}
        onChange={handleSearch}
      ></Input>
      <div className={css.categoriesWrapper}>
        <Select
          aria-label="Тип"
          value={type || TYPE_DEFAULT}
          onChange={(event) =>
            handleSelectChange("type", event.target.value, TYPE_DEFAULT)
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
          value={region || REGION_DEFAULT}
          onChange={(event) =>
            handleSelectChange("region", event.target.value, REGION_DEFAULT)
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
        value={sortBy || SORT_DEFAULT}
        onChange={(event) =>
          handleSelectChange("sortBy", event.target.value, SORT_DEFAULT)
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
