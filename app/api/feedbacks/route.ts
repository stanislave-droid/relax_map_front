import { api } from "@/app/api/api";
import { logErrorResponse } from "@/app/api/auth/_utils/utils";
import { FeedbacksApiResponse } from "@/types/feedback";
import { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    const page = request.nextUrl.searchParams.get("page") ?? "1";
    const limit = request.nextUrl.searchParams.get("limit") ?? "3";

    const feedbacksResponse = await api.get<FeedbacksApiResponse>(
      "/api/feedbacks",
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
        params: {
          page,
          limit,
        },
      },
    );

    return NextResponse.json(feedbacksResponse.data, {
      status: feedbacksResponse.status,
    });
  } catch (error) {
    console.error(error);

    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        {
          status: error.response?.status ?? 500,
        },
      );
    }

    logErrorResponse({ message: (error as Error).message });

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
