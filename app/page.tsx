"use client";

import css from "./page.module.css";
import AdvantagesBlock from "@/components/sections/AdvantagesBlock/AdvantagesBlock";
import HeroBlock from "../components/sections/HeroBlock/HeroBlock";

export default function Home() {
  return (
    <main className={css.main}>
<<<<<<< HEAD
      <HeroBlock />
=======
      <HeroBlock onSearch={handleSearch} />
      <AdvantagesBlock />
>>>>>>> origin/development
    </main>
  );
}
