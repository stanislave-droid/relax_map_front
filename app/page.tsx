// "use client";

import css from "./page.module.css";
import AdvantagesBlock from "@/components/sections/AdvantagesBlock/AdvantagesBlock";
import HeroBlock from "../components/sections/HeroBlock/HeroBlock";
import ReviewsBlock from "@/components/sections/ReviewsBlock/ReviewsBlock";
import PopularLocationsBlock from "@/components/sections/PopularLocationsBlock/PopularLocationsBlock";
import { fetchLocations, getAllFeedbacks } from "@/lib/api/serverApi";

export default async function Home() {
  const [response, feedbacksResponse] = await Promise.all([
    fetchLocations({
      limit: 9,
      sortBy: "rate",
      sortDirection: "desc",
    }),
    getAllFeedbacks().catch(() => null),
  ]);

  return (
    <main className={css.main}>
      <HeroBlock />
      <AdvantagesBlock />
      <PopularLocationsBlock locations={response.locations} />
      <ReviewsBlock
        title="Останні відгуки"
        feedbacks={feedbacksResponse?.feedbacks ?? []}
        showLocation
      />
    </main>
  );
}
