"use client";

import Input from "@/components/ui/Input/Input";
import Select from "@/components/ui/Select/Select";
import css from "./searchBar.module.css";
import { LocationType } from "@/types/locationType";
import { Region } from "@/types/region";
import clsx from "clsx";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

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
  const { slug } = useParams();

  const [searchField, setSearchField] = useState(() =>
    slug ? slug[3] || "" : "",
  );
  const [region, setRegion] = useState(() => (slug ? slug[1] : REGION_DEFAULT));
  const [type, setType] = useState(() => (slug ? slug[0] : TYPE_DEFAULT));
  const [sort, setSort] = useState(() => (slug ? slug[2] : SORT_DEFAULT));

  useEffect(() => {
    router.push(
      "/all-locations/" +
        `${type}/` +
        `${region}/` +
        `${sort}?` +
        `search=${searchField}`,
    );
  }, [searchField, type, region, sort, router]);

  const delaySearch = useDebouncedCallback(
    (value) => setSearchField(value),
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
        defaultValue={searchField ?? ""}
        className={clsx(css.input, css.field)}
        onChange={handleSearch}
      ></Input>
      <div className={css.categoriesWrapper}>
        <Select
          aria-label="Тип"
          value={type}
          onChange={(event) => setType(event.target.value)}
          className={clsx(css.typesSelect, css.field)}
        >
          <option value={TYPE_DEFAULT} defaultChecked>
            Всі
          </option>
          {types &&
            types.map((type) => (
              <option key={type.slug} value={type.slug}>
                {type.type}
              </option>
            ))}
        </Select>
        <Select
          aria-label="Регіон"
          value={region}
          onChange={(event) => setRegion(event.target.value)}
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
        value={sort}
        onChange={(event) => setSort(event.target.value)}
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
