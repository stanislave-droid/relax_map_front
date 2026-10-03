import type { Metadata } from "next";
import { getUserById, getUserLocations } from "@/lib/api/serverApi";
import ProfilePlaceholder from "@/components/profile/ProfilePlaceholder/ProfilePlaceholder";
import LocationCard from "@/components/ui/LocationCard/LocationCard";
import ProfileInfo from "@/components/profile/ProfileInfo/ProfileInfo";

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
  const [user, locationsData] = await Promise.all([
    getUserById(userId),
    getUserLocations(userId),
  ]);
  const isEmpty = locationsData.isEmpty;

  return (
    <main className="container">
      <ProfileInfo user={user} />
      {isEmpty && <ProfilePlaceholder isOwnProfile={false} />}
      {!isEmpty && (
        <div>
          {locationsData.locations.map((location) => (
            <LocationCard
              key={location._id}
              location={location}
              locationLink={`/locations/${location._id}`}
              editLink={undefined}
            />
          ))}
        </div>
      )}
    </main>
  );
}
