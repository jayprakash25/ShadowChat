import { NextResponse } from "next/server";
import  { NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (token) {
    if (
      url.pathname === "/signin" ||
      url.pathname === "/sign-up" ||
      url.pathname === "/verify" ||
      url.pathname === "/"
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

  } else {
    // Redirect unauthenticated users away from protected pages
    if (url.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }


  return NextResponse.next()
}

// See "Matching Paths" 
export const config = {
  matcher: ["/signin", "/sign-up", "/", "/dashboard/:path*", "/verify/:path*"],
};
