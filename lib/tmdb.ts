// Server-side TMDB API functions

// Using the provided API key
const TMDB_API_KEY = process.env.TMDB_API_KEY || "95c16c539a4a990696994964a59389b3"
const BASE_URL = "https://api.themoviedb.org/3"

// Helper function to make API requests
async function fetchFromTMDB(endpoint: string, params: Record<string, string> = {}) {
  const queryParams = new URLSearchParams({
    api_key: TMDB_API_KEY,
    ...params,
  })

  try {
    const response = await fetch(`${BASE_URL}${endpoint}?${queryParams.toString()}`)

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching from TMDB:", error)
    throw error
  }
}

// Get trending movies
export async function getTrendingMovies(timeWindow: "day" | "week" = "week") {
  return fetchFromTMDB(`/trending/movie/${timeWindow}`)
}

// Get top rated movies
export async function getTopRatedMovies() {
  return fetchFromTMDB("/movie/top_rated")
}

// Get trending TV shows
export async function getTrendingTVShows(timeWindow: "day" | "week" = "week") {
  return fetchFromTMDB(`/trending/tv/${timeWindow}`)
}

// Get top rated TV shows
export async function getTopRatedTVShows() {
  return fetchFromTMDB("/tv/top_rated")
}

// Get movie details
export async function getMovieDetails(id: string) {
  return fetchFromTMDB(`/movie/${id}`, { append_to_response: "credits,videos,similar" })
}

// Get TV show details
export async function getTVShowDetails(id: string) {
  return fetchFromTMDB(`/tv/${id}`, { append_to_response: "credits,videos,similar" })
}

// Get a random backdrop for the hero section
export async function getRandomBackdrop() {
  try {
    const trendingAll = await fetchFromTMDB("/trending/all/day")
    const itemsWithBackdrops = trendingAll.results.filter((item: any) => item.backdrop_path)

    if (itemsWithBackdrops.length === 0) {
      return {
        title: "Palxi Movie Database",
        overview: "Discover trending and top-rated movies and TV shows",
        backdrop_path: "/rLb2cwF3Pazuxaj0sRXQ037tGI.jpg", // Fallback backdrop
        media_type: "movie",
        id: 872585,
      }
    }

    const randomIndex = Math.floor(Math.random() * itemsWithBackdrops.length)
    return itemsWithBackdrops[randomIndex]
  } catch (error) {
    console.error("Error getting random backdrop:", error)
    return {
      title: "Palxi Movie Database",
      overview: "Discover trending and top-rated movies and TV shows",
      backdrop_path: "/rLb2cwF3Pazuxaj0sRXQ037tGI.jpg", // Fallback backdrop
      media_type: "movie",
      id: 872585,
    }
  }
}

// Get genres for movies
export async function getMovieGenres() {
  return fetchFromTMDB("/genre/movie/list")
}

// Get genres for TV shows
export async function getTVGenres() {
  return fetchFromTMDB("/genre/tv/list")
}

// Discover movies by genre
export async function discoverMoviesByGenre(genreId: string, page = 1) {
  return fetchFromTMDB("/discover/movie", {
    with_genres: genreId,
    page: page.toString(),
    sort_by: "popularity.desc",
  })
}

// Discover TV shows by genre
export async function discoverTVShowsByGenre(genreId: string, page = 1) {
  return fetchFromTMDB("/discover/tv", {
    with_genres: genreId,
    page: page.toString(),
    sort_by: "popularity.desc",
  })
}
