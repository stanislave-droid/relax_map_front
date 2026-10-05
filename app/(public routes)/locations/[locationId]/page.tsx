import {dehydrate, QueryClient} from "@tanstack/query-core";
import {HydrationBoundary} from "@tanstack/react-query";
import {fetchLocationById, getUserById} from "@/lib/api/serverApi";
import LocationDetailsClient from "@/app/(public routes)/locations/[locationId]/LocationDetails.client";
import {Metadata} from "next";

interface LocationDetailsPageProps {
    params: Promise<{ locationId: string }>;
}

export async function generateMetadata({params}: LocationDetailsPageProps): Promise<Metadata> {
    const {locationId} = await params;
    const location = await fetchLocationById(locationId);

    const title = `${location.name} — RelaxMap`
    const cleanDescription = location.description.replace(/\s+/g, " ").trim();
    const description =
        cleanDescription.length > 160
            ? `${cleanDescription.slice(0, 157)}...`
            : cleanDescription;
    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/locations/${locationId}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url,
            images: [
                {
                    url: location.image,
                    height: 1200,
                    width: 630,
                    alt: location.name,
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [location.image],
        }
    };
}


export default async function LocationDetailsPage({params}: LocationDetailsPageProps) {
    const {locationId} = await params;
    const queryClient = new QueryClient();

    const location = await queryClient.query({
        queryKey: ["location", locationId],
        queryFn: () => fetchLocationById(locationId)
    });

    await queryClient.query({
        queryKey: ["author", location.ownerId],
        queryFn: () => getUserById(location.ownerId)
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <LocationDetailsClient id={locationId}/>
        </HydrationBoundary>
    )
}