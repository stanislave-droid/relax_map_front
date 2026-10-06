import css from "./page.module.css";
import AdvantagesBlock from "@/components/sections/AdvantagesBlock/AdvantagesBlock";
import HeroBlock from "../components/sections/HeroBlock/HeroBlock";
import ReviewsBlock from "@/components/sections/ReviewsBlock/ReviewsBlock";
import PopularLocationsBlock from "@/components/sections/PopularLocationsBlock/PopularLocationsBlock";
import {
  fetchLocations,
  fetchLocationTypes,
  getAllFeedbacks,
} from "@/lib/api/serverApi";

export const revalidate = 60;

export const revalidate = 60;

export default async function Home() {
  const [response, feedbacksResponse] = await Promise.all([
    fetchLocations({
      limit: 9,
      sortBy: "rate",
      sortDirection: "desc",
    }),
    getAllFeedbacks().catch(() => null),
  ]);

  const responseLocationTypes = await fetchLocationTypes();
  for (const location of response.locations) {
    const index = responseLocationTypes.findIndex(
      (locationType) => location.locationType === locationType.slug,
    );
    if (index !== -1) {
      location.locationType = responseLocationTypes[index].name;
    }
  }

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
