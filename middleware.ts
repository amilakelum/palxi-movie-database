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

  // These routes should exist, but just in case they're accessed with the wrong path
  if (pathname === "/tv-shows/trending") {
    return NextResponse.redirect(new URL("/tv/trending", request.url))
  }

  if (pathname === "/tv-shows/top-rated") {
    return NextResponse.redirect(new URL("/tv/top-rated", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/movie/:path*", "/tv-shows/:path*"],
}
