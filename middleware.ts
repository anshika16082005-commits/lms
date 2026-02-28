import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);

  if (!token && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  console.log("Middleware triggered:", request.nextUrl.pathname);
  console.log(secret, token);

  try {
    const { payload } = await jwtVerify(token!, secret);
    console.log(payload);
    const userId = (payload as { id: string }).id;
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", userId);

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/my-courses", "/createcourse", "/api/course/createCourse"],
};
