import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "./lib/api/serverApi";
import { parseSetCookie } from "cookie";

const privateRoutes = ["/locations/add", "/locations/:locationId", "/profile"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const { pathname } = request.nextUrl;
  const isPrivateRoute = privateRoutes.some((value) =>
    pathname.startsWith(value),
  );
  const isAuthRoute = authRoutes.some((path) => pathname.startsWith(path));

  if (!accessToken) {
    if (refreshToken) {
      const data = await checkSession();
      const setCookie = data.headers["set-cookie"];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookieStr of cookieArray) {
          const parsedCookie = parseSetCookie(cookieStr);
          if (parsedCookie.value)
            cookieStore.set(
              parsedCookie.name,
              parsedCookie.value,
              parsedCookie,
            );
        }

        if (isPrivateRoute) {
          return NextResponse.next({
            headers: { Cookie: cookieStore.toString() },
          });
        } else if (isAuthRoute) {
          return NextResponse.redirect(new URL("/", request.url), {
            headers: { Cookie: cookieStore.toString() },
          });
        }
      }
    } else {
      if (isPrivateRoute) {
        return NextResponse.redirect(new URL("/sign-in", request.url), {
          headers: {
            Cookie: cookieStore.toString(),
          },
        });
      }
    }
  } else {
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/", request.url), {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
    }
  }
}

export const config = {
  matcher: [
    "/profile",
    "/sign-in",
    "/sign-up",
    "/locations/add",
    "/locations/:path*/edit",
  ],
};
