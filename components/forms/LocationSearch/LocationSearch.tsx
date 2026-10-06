"use client";

import { useState } from "react";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import css from "./LocationSearch.module.css";

interface LocationSearchProps {
  onSearch: (search: string) => void;
}

export default function LocationSearch({ onSearch }: LocationSearchProps) {
  const [location, setLocation] = useState("");

  function handleSearch() {
    onSearch(location);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Оберіть розташування</h2>

      <div className={css.searchRow}>
        <Input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Назва розташування"
        />

        <Button type="button" variant="secondary" onClick={handleSearch}>
          Пошук
        </Button>
      </div>
    </div>
  );
}
