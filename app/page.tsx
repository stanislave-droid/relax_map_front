// "use client";

import css from "./page.module.css";
import AdvantagesBlock from "@/components/sections/AdvantagesBlock/AdvantagesBlock";
import HeroBlock from "../components/sections/HeroBlock/HeroBlock";
import ReviewsBlock from "@/components/sections/ReviewsBlock/ReviewsBlock";

export default function Home() {
  return (
    <main className={css.main}>
      <HeroBlock />
      <AdvantagesBlock />
      <ReviewsBlock title="Останні відгуки" />
    </main>
  );
}
