import type { Metadata } from "next";
import css from "./page.module.css";
import AdvantagesBlock from "@/components/sections/AdvantagesBlock/AdvantagesBlock";
import HeroBlock from "@/components/sections/HeroBlock/HeroBlock";
import type { FeedbacksApiResponse } from "@/types/feedback";
import type { Location } from "@/types/location";
// import PopularLocationsBlock from "@/components/home/PopularLocationsBlock/PopularLocationsBlock";
// import ReviewsBlock from "@/components/home/ReviewsBlock/ReviewsBlock";

interface LocationsApiResponse {
  locations: Location[];
  total: number;
  isEmpty: boolean;
}

export const metadata: Metadata = {
  title: "RelaxMap — Відкривай природні куточки України",
  description: "Відкривай природні куточки України разом з RelaxMap.",
  openGraph: {
    title: "RelaxMap — Відкривай природні куточки України",
    description: "Відкривай природні куточки України разом з RelaxMap.",
    images: ["/og-image.jpg"],
  },
};

async function getFeedbacks(): Promise<FeedbacksApiResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/feedbacks?page=1&limit=3`,
    { next: { revalidate: 3600 } },
  );
  if (!response.ok) throw new Error("Failed to fetch feedbacks");
  return response.json();
}

async function getLocations(): Promise<LocationsApiResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/locations?sortBy=rate&sortDirection=desc`,
    { next: { revalidate: 3600 } },
  );
  if (!response.ok) throw new Error("Failed to fetch locations");
  return response.json();
}

export default async function Home() {
  const [_feedbacksData, _locationsData] = await Promise.all([
    getFeedbacks(),
    getLocations(),
  ]);

  return (
    <main className={css.main}>
      <HeroBlock />
      <AdvantagesBlock />
      {/* <PopularLocationsBlock locations={locationsData.locations} /> */}
      {/* <ReviewsBlock reviews={feedbacksData.feedbacks.map(f => ({
        id: f._id,
        rating: f.rate,
        text: f.description,
        authorName: f.userName,
        locationType: f.locationId.name,
      }))} /> */}
    </main>
  );
}
