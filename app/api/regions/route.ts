import { NextResponse } from "next/server";
import { api } from "../api";

interface BackendRegion {
  _id: string;
  region: string;
  slug: string;
  level: string;
  note: string;
}

interface Region {
  id: string;
  name: string;
  slug: string;
}

export async function GET() {
  try {
    const response = await api.get<BackendRegion[]>("/api/categories/regions");

    const regions: Region[] = response.data.map((region) => ({
      id: region._id,
      name: region.region,
      slug: region.slug,
    }));

    return NextResponse.json(regions, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("Failed to fetch regions:", error);

    return NextResponse.json([], { status: 500 });
  }
}
