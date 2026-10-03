import { getMe, getUserLocations } from "@/lib/api/serverApi";
import ProfilePlaceholder from "@/components/profile/ProfilePlaceholder/ProfilePlaceholder";
import LocationCard from "@/components/ui/LocationCard/LocationCard";
import ProfileInfo from "@/components/profile/ProfileInfo/ProfileInfo";
import type { Metadata } from "next";

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
  const locationsData = await getUserLocations(user._id);
  const isEmpty = locationsData.isEmpty;

  return (
    <main className="container">
      <ProfileInfo user={user} />
      {isEmpty && <ProfilePlaceholder isOwnProfile={true} />}
      {!isEmpty && (
        <div>
          {locationsData.locations.map((location) => (
            <LocationCard
              key={location._id}
              location={location}
              locationLink={`/locations/${location._id}`}
              editLink={`/locations/${location._id}/edit`}
            />
          ))}
        </div>
      )}
    </main>
  );
}
