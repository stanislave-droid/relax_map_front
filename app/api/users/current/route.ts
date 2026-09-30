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

// import { api } from "@/app/api/api";
// import { logErrorResponse } from "@/app/api/auth/_utils/utils";
// import { isAxiosError } from "axios";
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const cookieStore = await cookies();

//     const response = await api.get("/api/users/current", {
//       headers: {
//         Cookie: cookieStore.toString(),
//       },
//     });

//     return NextResponse.json(response.data, {
//       status: response.status,
//     });
//   } catch (error) {
//     console.error(error);

//     if (isAxiosError(error)) {
//       logErrorResponse(error.response?.data);

//       return NextResponse.json(
//         {
//           error: error.message,
//           response: error.response?.data,
//         },
//         {
//           status: error.response?.status ?? 500,
//         },
//       );
//     }

//     logErrorResponse({ message: (error as Error).message });

//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 },
//     );
//   }
// }
