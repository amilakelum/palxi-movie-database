import MediaGrid from "@/components/media-grid"
import { getTopRatedTVShows } from "@/lib/tmdb"
import type { Metadata } from "next"
import { ApiErrorMessage } from "@/components/api-error-message"

export const metadata: Metadata = {
  title: "Top Rated TV Shows | Palxi",
  description: "Discover the highest rated TV shows of all time",
}

export default async function TopRatedTVShowsPage() {
  try {
    const topRatedTVShows = await getTopRatedTVShows()

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Top Rated TV Shows</h1>
        <MediaGrid items={topRatedTVShows.results} type="tv" />
      </div>
    )
  } catch (error) {
    console.error("Error loading top rated TV shows:", error)
    return <ApiErrorMessage />
  }
}
