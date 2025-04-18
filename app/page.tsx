import Hero from "@/components/hero"
import MediaSection from "@/components/media-section"
import { getTrendingMovies, getTrendingTVShows, getTopRatedMovies, getTopRatedTVShows } from "@/lib/tmdb"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function Home() {
  try {
    const [trendingMovies, trendingTVShows, topRatedMovies, topRatedTVShows] = await Promise.all([
      getTrendingMovies(),
      getTrendingTVShows(),
      getTopRatedMovies(),
      getTopRatedTVShows(),
    ])

    return (
      <div className="container mx-auto px-4 py-8">
        <Hero />
        <div className="space-y-12 mt-12">
          <MediaSection
            title="Trending Movies"
            items={trendingMovies.results.slice(0, 6)}
            type="movie"
            viewAllHref="/movies/trending"
          />
          <MediaSection
            title="Top Rated Movies"
            items={topRatedMovies.results.slice(0, 6)}
            type="movie"
            viewAllHref="/movies/top-rated"
          />
          <MediaSection
            title="Trending TV Shows"
            items={trendingTVShows.results.slice(0, 6)}
            type="tv"
            viewAllHref="/tv/trending"
          />
          <MediaSection
            title="Top Rated TV Shows"
            items={topRatedTVShows.results.slice(0, 6)}
            type="tv"
            viewAllHref="/tv/top-rated"
          />
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error loading homepage data:", error)
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-4">API Connection Error</h1>
          <p className="text-muted-foreground mb-8">
            Unable to connect to the TMDB API. Please make sure you have set up your TMDB API key in the environment
            variables.
          </p>
          <div className="p-4 bg-muted rounded-lg mb-8 text-left">
            <p className="font-mono text-sm mb-2">TMDB_API_KEY=your_api_key_here</p>
            <p className="text-xs text-muted-foreground">
              Add this to your .env.local file or set it in your deployment environment.
            </p>
          </div>
          <p className="mb-4">
            You can get a free API key by creating an account at{" "}
            <a
              href="https://www.themoviedb.org/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              themoviedb.org
            </a>
          </p>
          <Button asChild>
            <Link href="https://www.themoviedb.org/settings/api" target="_blank" rel="noopener noreferrer">
              Get TMDB API Key
            </Link>
          </Button>
        </div>
      </div>
    )
  }
}
