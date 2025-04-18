import MediaGrid from "@/components/media-grid"
import { getTrendingTVShows } from "@/lib/tmdb"
import type { Metadata } from "next"
import { ApiErrorMessage } from "@/components/api-error-message"

export const metadata: Metadata = {
  title: "Trending TV Shows | Palxi",
  description: "Discover the most popular and trending TV shows right now",
}

export default async function TrendingTVShowsPage() {
  try {
    const trendingTVShows = await getTrendingTVShows()

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Trending TV Shows</h1>
        <MediaGrid items={trendingTVShows.results} type="tv" />
      </div>
    )
  } catch (error) {
    console.error("Error loading trending TV shows:", error)
    return <ApiErrorMessage />
  }
}
