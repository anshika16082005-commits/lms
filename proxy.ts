import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);

  if (!token && request.nextUrl.pathname !== "/auth/login") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  console.log("Middleware triggered:", request.nextUrl.pathname);

  try {
    const { payload } = await jwtVerify(token!, secret);
    const userId = (payload as { id: string }).id;
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", userId);

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: [
    "/instructor/:path*",
    "/student/:path*",
    "/admin/:path*",
    "/api/course/createCourse",
    "/api/mycourses",
    "/api/instructor/student",
    "/api/course/enroll",
    "/api/admin/usermanage",
    "/api/notification",
    "/api/users/changepassword",
    "/api/execute",
  ],
};
