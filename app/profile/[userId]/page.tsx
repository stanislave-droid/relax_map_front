import type { Metadata } from "next";
import css from "./page.module.css";
import { getUserById } from "@/lib/api/serverApi";
import ProfileInfo from "@/components/profile/ProfileInfo/ProfileInfo";
import LocationsGrid from "@/components/profile/locationsGrid/LocationsGrid";
import clsx from "clsx";

type Props = {
  params: Promise<{ userId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { userId } = await params;
  const user = await getUserById(userId);

  return {
    title: `Профіль ${user.name} — RelaxMap`,
    description: `Профіль користувача ${user.name} у Relax Map`,
    openGraph: {
      title: `Профіль ${user.name} — RelaxMap`,
      description: `Профіль користувача ${user.name} у Relax Map`,
      images: [
        {
          url: "/opengraph-image.jpg",
          height: 1200,
          width: 630,
          alt: "Relax Map",
        },
      ],
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/profile/${userId}`,
      type: "website",
    },
  };
}

export default async function ProfilePage({ params }: Props) {
  const { userId } = await params;
  const user = await getUserById(userId);

  return (
    <main className={clsx("container", css.main)}>
      <ProfileInfo user={user} />
      <LocationsGrid userId={userId} isOwnProfile={false} />
    </main>
  );
}
