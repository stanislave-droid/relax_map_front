import "@/components/ui/common.module.css";
import clsx from "clsx";
import css from "./EditLocationPage.module.css";
import { Metadata } from "next";
import { fetchLocationById } from "@/lib/api/serverApi";
import LocationForm from "@/components/forms/LocationForm2/LocationForm2";

export const metadata: Metadata = {
  title: "Редагування місця — RelaxMap",
  description: "Service for searching places to relax",
  openGraph: {
    title: "Редагування місця — RelaxMap",
    description: "Service for searching places to relax",
    images: [
      {
        url: "/opengraph-image.jpg",
        height: 1200,
        width: 630,
        alt: "Relax Map",
      },
    ],
    url: process.env.NEXT_PUBLIC_SITE_URL,
    type: "article",
  },
};

interface EditLocationProps {
  params: Promise<{ locationId: string }>;
}

export default async function EditLocation({ params }: EditLocationProps) {
  const { locationId } = await params;
  const location = await fetchLocationById(locationId);

  return (
    <main className={css.main}>
      <div className={clsx("container", css.container)}>
        <h1 className={css.pageTitle}>Редагування місця</h1>
        <div>
          <LocationForm location={location} />
        </div>
      </div>
    </main>
  );
}
