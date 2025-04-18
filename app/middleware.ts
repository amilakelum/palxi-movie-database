import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle specific redirects for movie and tv routes
  if (pathname === "/movie/trending") {
    return NextResponse.redirect(new URL("/movies/trending", request.url))
  }

  if (pathname === "/movie/top-rated") {
    return NextResponse.redirect(new URL("/movies/top-rated", request.url))
  }

  if (pathname === "/tv/trending") {
    return NextResponse.redirect(new URL("/tv/trending", request.url))
  }

  if (pathname === "/tv/top-rated") {
    return NextResponse.redirect(new URL("/tv/top-rated", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/movie/:path*", "/tv/:path*"],
}
