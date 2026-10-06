import css from "./CreateLocationsPage.module.css";
import type { Metadata } from "next";
import clsx from "clsx";
import AddLocation from "@/components/location/AddLocationClient/AddLocation";

export const metadata: Metadata = {
  title: "Додати нову локацію — RelaxMap",
  description: "Service for searching places to relax",
  openGraph: {
    title: "Додати нову локацію — RelaxMap",
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

export default function AddLocationPage() {
  return (
    <main className={css.createLocationsSect}>
      <div className="container">
        <h1 className={clsx("main-headding", css.title)}>
          Додавання нового місця
        </h1>
        <AddLocation />
      </div>
    </main>
  );
}
