import type { Metadata } from "next";
import { getMe, getUserById, getUserLocations } from "@/lib/api/serverApi";
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
  };
}

export default async function ProfilePage({ params }: Props) {
  const { userId } = await params;

  const currentUser = await getMe();
  const user = await getUserById(userId);
  const locationsData = await getUserLocations(userId);
  const isEmpty = locationsData.isEmpty;

  const isOwner = userId === currentUser._id;

  return (
    <main>
      <ProfileInfo user={user} />
      {isEmpty && <ProfilePlaceholder isOwnProfile={isOwner} />}
      {!isEmpty && (
        <div>
          {locationsData.locations.map((location) => (
            <LocationCard
              key={location._id}
              location={location}
              locationLink={`/locations/${location._id}`}
              editLink={isOwner ? `/locations/${location._id}/edit` : undefined}
            />
          ))}
        </div>
      )}
    </main>
  );
}
