"use client";

// import clsx from "clsx";
import css from "./page.module.css";
// import Icon from "@/components/ui/Icon/Icon";
import HeroBlock from "../components/sections/HeroBlock/HeroBlock";

export default function Home() {
  return (
    <main className={css.main}>
      <HeroBlock />
    </main>
  );
}
