import { NextResponse } from "next/server";
import  { NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (
    token &&
    (url.pathname.startsWith("/signin") ||
      url.pathname.startsWith("/signup") ||
      url.pathname.startsWith("/verify") ||
      url.pathname.startsWith("/"))
  ) {
    console.log("token there")
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // return NextResponse.redirect(new URL("/home", request.url));
  if(!token && url.pathname.startsWith('/dashboard')){
    console.log("token not there")
    return NextResponse.redirect(new URL('/signin', request.url))
  }
}

// See "Matching Paths" 
export const config = {
  matcher: ["/sigin", "/sign-up", "/", "/dashboard/:path*", "/verify/:path*"],
};
