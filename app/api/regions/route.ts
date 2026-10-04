import { NextResponse } from "next/server";
import { api } from "../api";
import axios from "axios";
import { logErrorResponse } from "@/app/api/auth/_utils/utils";

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
    if (axios.isAxiosError(error)) {
      logErrorResponse(error.response?.data);
    } else {
      logErrorResponse({ message: (error as Error).message });
    }

    return NextResponse.json([], { status: 500 });
  }
}
