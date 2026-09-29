import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../api";
import { parseSetCookie } from "cookie";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../_utils/utils";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const apiRes = await api.post("auth/refresh", null, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    const setCookie = apiRes.headers["set-cookie"];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      for (const cookieStr of cookieArray) {
        const parsed = parseSetCookie(cookieStr);

        if (parsed.value) {
          cookieStore.set(parsed.name, parsed.value, parsed);
        }
      }
      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json({ success: false }, { status: 401 });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      const cookieStore = await cookies();
      cookieStore.delete("sessionId");
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");

      return NextResponse.json({ success: false }, { status: 401 });
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ success: false }, { status: 401 });
  }
}



// const cookieOptions = {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production",
//   sameSite: "lax" as const,
//   path: "/",
// };

// export async function POST() {
//   const cookieStore = await cookies();
//   const refreshToken = cookieStore.get("refreshToken")?.value;

//   if (!refreshToken) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const apiRes = await api.post("auth/refresh", null, {
//       headers: {
//         Cookie: cookieStore.toString(),
//       },
//     });

//     const setCookie = apiRes.headers["set-cookie"];

//     if (setCookie) {
//       const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
//       for (const cookieStr of cookieArray) {
//         const parsed = parseSetCookie(cookieStr);

//         if (parsed.value) {
//           cookieStore.set(parsed.name, parsed.value, {
//             ...cookieOptions,
//             maxAge: parsed.maxAge,
//             expires: parsed.expires,
//           });
//         }
//       }

//       return NextResponse.json(
//         { message: "Session refreshed" },
//         { status: 200 },
//       );
//     }

//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   } catch (error) {
//     if (isAxiosError(error)) {
//       const status = error.response?.status;

//       if (status === 401 || status === 403) {
//         cookieStore.delete("accessToken");
//         cookieStore.delete("refreshToken");
//         return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//       }

//       logErrorResponse(error.response?.data);
//       return NextResponse.json({ message: "Backend error" }, { status: 503 });
//     }

//     logErrorResponse({ message: (error as Error).message });
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 },
//     );
//   }
// }