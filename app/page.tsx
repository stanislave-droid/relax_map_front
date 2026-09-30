// "use client";

import css from "./page.module.css";
import AdvantagesBlock from "@/components/sections/AdvantagesBlock/AdvantagesBlock";
import HeroBlock from "../components/sections/HeroBlock/HeroBlock";
import ReviewsBlock from "@/components/sections/ReviewsBlock/ReviewsBlock";
import PopularLocationsBlock from "@/components/sections/PopularLocationsBlock/PopularLocationsBlock";
import { fetchLocations } from "@/lib/api/clientApi";

export default async function Home() {
  const response = await fetchLocations({
    limit: 9,
    sortBy: "rate",
    sortDirection: "desc",
  });

  return (
    <main className={css.main}>
      <HeroBlock />
      <AdvantagesBlock />
      <PopularLocationsBlock locations={response.locations} />
      <ReviewsBlock title="Останні відгуки" />
    </main>
  );
}
