// Client-side TMDB API functions

// We'll use a server endpoint instead of directly calling TMDB API from client
// to avoid exposing the API key

// Search for movies and TV shows
export async function searchMedia(query: string) {
  try {
    const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`)

    if (!response.ok) {
      throw new Error(`Search API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error searching media:", error)
    return { movies: [], tvShows: [] }
  }
}
