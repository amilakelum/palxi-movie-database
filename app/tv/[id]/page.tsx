import Image from "next/image"
import { Star, Calendar, Clock, Tv } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getTVShowDetails } from "@/lib/tmdb"
import MediaCard from "@/components/media-card"
import { ApiErrorMessage } from "@/components/api-error-message"
import { notFound } from "next/navigation"

interface TVShowDetailsPageProps {
  params: {
    id: string
  }
}

export default async function TVShowDetailsPage({ params }: TVShowDetailsPageProps) {
  const { id } = params

  // Check if the ID is a special route name and redirect if necessary
  if (id === "trending" || id === "top-rated") {
    notFound()
  }

  try {
    const details = await getTVShowDetails(id)

    return (
      <>
        {/* Backdrop */}
        <div className="relative h-[50vh] w-full">
          {details.backdrop_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
              alt={details.name}
              fill
              priority
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-muted" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
        </div>

        <div className="container mx-auto px-4 -mt-32 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 lg:gap-12">
            {/* Poster */}
            <div className="aspect-[2/3] relative rounded-lg overflow-hidden shadow-xl">
              {details.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                  alt={details.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">No image</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{details.name}</h1>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {details.first_air_date && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(details.first_air_date).getFullYear()}
                    </Badge>
                  )}
                  {details.episode_run_time?.[0] && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {details.episode_run_time[0]} min
                    </Badge>
                  )}
                  {details.vote_average > 0 && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      {details.vote_average.toFixed(1)}
                    </Badge>
                  )}
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Tv className="h-3 w-3" />
                    TV Show
                  </Badge>
                </div>
              </div>

              {details.overview && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Overview</h2>
                  <p className="text-muted-foreground">{details.overview}</p>
                </div>
              )}

              {details.genres && details.genres.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Genres</h2>
                  <div className="flex flex-wrap gap-2">
                    {details.genres.map((genre: any) => (
                      <Badge key={genre.id} variant="secondary">
                        {genre.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {details.number_of_seasons && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Seasons</h2>
                  <p className="text-muted-foreground">
                    {details.number_of_seasons} {details.number_of_seasons === 1 ? "Season" : "Seasons"} (
                    {details.number_of_episodes} {details.number_of_episodes === 1 ? "Episode" : "Episodes"})
                  </p>
                </div>
              )}

              {details.credits?.cast && details.credits.cast.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Cast</h2>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {details.credits.cast.slice(0, 10).map((person: any) => (
                      <div key={person.id} className="flex-shrink-0 w-20">
                        <div className="aspect-[2/3] relative rounded-md overflow-hidden mb-1">
                          {person.profile_path ? (
                            <Image
                              src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                              alt={person.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-muted flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">No image</span>
                            </div>
                          )}
                        </div>
                        <p className="text-xs font-medium line-clamp-1">{person.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{person.character}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Similar Content */}
          {details.similar?.results && details.similar.results.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Similar TV Shows</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {details.similar.results.slice(0, 6).map((item: any) => (
                  <MediaCard key={item.id} item={item} type="tv" />
                ))}
              </div>
            </div>
          )}
        </div>
      </>
    )
  } catch (error) {
    return <ApiErrorMessage />
  }
}
