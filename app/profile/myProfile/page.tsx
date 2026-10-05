import { getMe } from "@/lib/api/serverApi";
import ProfileInfo from "@/components/profile/ProfileInfo/ProfileInfo";
import LocationsGrid from "@/components/profile/locationsGrid/LocationsGrid";
import type { Metadata } from "next";
import css from "./page.module.css";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "Мій профіль — Relax Map",
  description: "Ваш профіль у Relax Map",
  openGraph: {
    title: "Мій профіль — Relax Map",
    description: "Ваш профіль у Relax Map",
    images: [
      {
        url: "/opengraph-image.jpg",
        height: 1200,
        width: 630,
        alt: "Relax Map",
      },
    ],
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/profile/myProfile`,
    type: "website",
  },
};

export default async function MyProfilePage() {
  const user = await getMe();

  return (
    <main className={clsx("container", css.main)}>
      <ProfileInfo user={user} />
      <LocationsGrid userId={user._id} isOwnProfile={true} />
    </main>
  );
}
