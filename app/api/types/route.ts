import { NextResponse } from "next/server";
import { api } from "../api";

interface LocationType {
  id: string;
  name: string;
  slug: string;
  iconName: string | null;
}

const fallbackTypes: LocationType[] = [];

export async function GET() {
  try {
    const response = await api.get("/api/categories/types");

    return NextResponse.json(response.data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("Failed to fetch types:", error);
    return NextResponse.json(fallbackTypes, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    });
  }
}
