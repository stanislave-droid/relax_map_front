import { api } from "@/app/api/api";
import { logErrorResponse } from "@/app/api/auth/_utils/utils";
import { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{ userId: string }>;
};

interface Location {
  name: string;
  description: string;
  image: string;
  locationType: string;
  region: string;
  ownerId: string;
  feedbacksId: string[];
  rate?: number | null | undefined;
  coordinates?: {
    lat: number;
    lon: number;
  };
}

interface LocationsApiResponse {
  locations: Location[];
  page: number;
  limit: number;
  totalPages: number;
  totalLocations: number;
}

export async function GET(request: Request, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const { userId } = await params;

    const locationsResponse = await api<LocationsApiResponse>(`/api/users/${userId}/locations`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    const { locations, totalLocations } = locationsResponse.data;

    return NextResponse.json(
      {
        locations,
        total: totalLocations,
        isEmpty: totalLocations === 0,
      },
      { status: locationsResponse.status },
    );
  } catch (error) {
    console.error(error);

    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json({ error: error.message, response: error.response?.data }, { status: error.status });
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
