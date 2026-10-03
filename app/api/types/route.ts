import { NextResponse } from "next/server";
import { api } from "../api";
import axios from "axios";
import { logErrorResponse } from "../../../app/api/auth/_utils/utils";
import { LocationType } from "../../../types/locationType";

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
    if (axios.isAxiosError(error)) {
      logErrorResponse(error.response?.data);
    } else {
      logErrorResponse({ message: (error as Error).message });
    }
    return NextResponse.json(fallbackTypes, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    });
  }
}
