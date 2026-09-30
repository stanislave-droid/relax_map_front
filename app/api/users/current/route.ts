import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { api } from "@/app/api/api";
import { isAxiosError } from "axios";

export async function GET() {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse.json(
      { authenticated: false, user: null },
      { status: 401 },
    );
  }
  try {
    const response = await api.get("/api/users/current", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return NextResponse.json({
      authenticated: true,
      user: response.data,
    });
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      cookiesStore.delete("accessToken");

      return NextResponse.json(
        { authenticated: false, user: null },
        { status: 401 },
      );
    }
    return NextResponse.json(
      { authenticated: false, user: null },
      { status: 500 },
    );
  }
}
