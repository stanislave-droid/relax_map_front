import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../auth/_utils/utils";

interface Props {
  params: Promise<{ locationId: string }>;
}

export async function POST(req: NextRequest, { params }: Props) {
  try {
    const { locationId } = await params;
    const body = await req.json(); // { rate, description }
    const cookieStore = await cookies();

    const res = await api.post(`/api/feedbacks/${locationId}`, body, {
      headers: { Cookie: cookieStore.toString() },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500 },
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
