import { NextRequest, NextResponse } from "next/server";
import { api } from "../api";
import { logErrorResponse } from "../auth/_utils/utils";
import { isAxiosError } from "axios";
import { Coordinates } from "@/types/location";

export interface placesResponse extends Coordinates {
  name: string;
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const search = req.nextUrl.searchParams.get("search");
    if (!search) {
      throw new Error("Bad request, you should deliver search param");
    }

    const { data } = await api.get(
      `https://nominatim.openstreetmap.org/search?q=${decodeURIComponent(search)}&format=json`,
      {
        headers: {
          "User-Agent": "Relax Map (stasdroner@gmail.com)",
        },
      },
    );

    if (data.length > 0) {
      return NextResponse.json({
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
        name: data[0].name,
      });
    }
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error);
      return NextResponse.json(
        {
          error: error.message,
          response: error?.response?.data,
        },
        { status: error.status },
      );
    }

    logErrorResponse(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
