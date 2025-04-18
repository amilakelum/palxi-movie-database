"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import MediaGrid from "@/components/media-grid"
import SearchForm from "@/components/search-form"
import { searchMedia } from "@/lib/tmdb-client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("query") || ""
  const [results, setResults] = useState<{ movies: any[]; tvShows: any[] }>({ movies: [], tvShows: [] })
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("movies")

  useEffect(() => {
    async function fetchResults() {
      if (!query) return

      setIsLoading(true)
      try {
        const data = await searchMedia(query)
        setResults({
          movies: data.movies,
          tvShows: data.tvShows,
        })
      } catch (error) {
        console.error("Error searching:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [query])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search</h1>
      <SearchForm initialQuery={query} />

      {query && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Results for "{query}"</h2>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Tabs defaultValue="movies" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="movies">Movies ({results.movies.length})</TabsTrigger>
                <TabsTrigger value="tvShows">TV Shows ({results.tvShows.length})</TabsTrigger>
              </TabsList>
              <TabsContent value="movies">
                {results.movies.length > 0 ? (
                  <MediaGrid items={results.movies} type="movie" />
                ) : (
                  <p className="text-muted-foreground">No movies found matching your search.</p>
                )}
              </TabsContent>
              <TabsContent value="tvShows">
                {results.tvShows.length > 0 ? (
                  <MediaGrid items={results.tvShows} type="tv" />
                ) : (
                  <p className="text-muted-foreground">No TV shows found matching your search.</p>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      )}
    </div>
  )
}
