"use client";

// import clsx from "clsx";
import css from "./page.module.css";
// import Icon from "@/components/ui/Icon/Icon";
import HeroBlock from "../components/sections/HeroBlock/HeroBlock";

export default function Home() {
  const handleSearch = (searchQuery: string) => {
    console.log("Пошуковий запит:", searchQuery);
  };

  return (
    <main className={css.main}>
      <HeroBlock onSearch={handleSearch} />
      {/* <div className={clsx("container")}>
        <h1 className={clsx("main-headding")}>
          <Icon name="logo" width={129} height={36} />
        </h1>
      </div> */}
    </main>
  );
}
