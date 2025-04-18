import { NextResponse } from "next/server"

// Using the provided API key
const TMDB_API_KEY = process.env.TMDB_API_KEY || "95c16c539a4a990696994964a59389b3"
const BASE_URL = "https://api.themoviedb.org/3"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    const [movieResults, tvResults] = await Promise.all([searchMovies(query), searchTVShows(query)])

    return NextResponse.json({
      movies: movieResults.results || [],
      tvShows: tvResults.results || [],
    })
  } catch (error) {
    console.error("Error searching:", error)
    return NextResponse.json({ error: "Failed to search media" }, { status: 500 })
  }
}

// Search for movies
async function searchMovies(query: string) {
  const params = new URLSearchParams({
    api_key: TMDB_API_KEY,
    query,
    include_adult: "false",
  })

  const response = await fetch(`${BASE_URL}/search/movie?${params.toString()}`)

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`)
  }

  return response.json()
}

// Search for TV shows
async function searchTVShows(query: string) {
  const params = new URLSearchParams({
    api_key: TMDB_API_KEY,
    query,
    include_adult: "false",
  })

  const response = await fetch(`${BASE_URL}/search/tv?${params.toString()}`)

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`)
  }

  return response.json()
}
