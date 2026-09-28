import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { api } from "../../api";

export async function POST() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const sessionId = cookieStore.get("sessionId")?.value;

  try {
    await api.post(
      "/api/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Cookie: `sessionId=${sessionId}; accessToken=${accessToken}; refreshToken=${refreshToken}`,
        },
      },
    );
  } catch (error) {
    console.error("Logout backend error:", error);
  } finally {
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
  }

  return NextResponse.json(
    {
      success: true,
      message: "Вихід успішний",
    },
    { status: 200 },
  );
}
