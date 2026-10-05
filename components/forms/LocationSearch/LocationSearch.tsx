"use client";

import { useState } from "react";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import css from "./LocationSearch.module.css";

export default function LocationSearch() {
  const [location, setLocation] = useState("");

  function handleSearch() {
    console.log("Пошук:", location);
  }

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Оберіть розташування</h2>

      <div className={css.searchRow}>
        <Input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Назва розташування"
        />

        <Button type="button" variant="secondary" onClick={handleSearch}>
          Пошук
        </Button>
      </div>
    </div>
  );
}
