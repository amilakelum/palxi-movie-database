import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getRandomBackdrop } from "@/lib/tmdb"

export default async function Hero() {
  try {
    const backdrop = await getRandomBackdrop()

    // Update the link to point to the correct route
    const detailsLink = `/${backdrop.media_type}/${backdrop.id}`
    const browseLink = backdrop.media_type === "movie" ? "/movies/trending" : "/tv/trending"

    // Prepare image URL
    const imageUrl = backdrop.backdrop_path
      ? `https://image.tmdb.org/t/p/original${backdrop.backdrop_path}`
      : "/placeholder.svg"

    return (
      <div className="relative rounded-xl overflow-hidden aspect-[21/9]">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={backdrop.title || backdrop.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 max-w-2xl">{backdrop.title || backdrop.name}</h1>
          <p className="text-sm md:text-base text-muted-foreground mb-4 max-w-2xl line-clamp-2 md:line-clamp-3">
            {backdrop.overview}
          </p>
          <div className="flex gap-3">
            <Button asChild>
              <Link href={detailsLink}>View Details</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={browseLink}>Browse {backdrop.media_type === "movie" ? "Movies" : "TV Shows"}</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error loading hero:", error)
    return (
      <div className="relative rounded-xl overflow-hidden aspect-[21/9] bg-muted">
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 max-w-2xl">Palxi Movie Database</h1>
          <p className="text-sm md:text-base text-muted-foreground mb-4 max-w-2xl">
            Discover trending and top-rated movies and TV shows
          </p>
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/movies/trending">Browse Movies</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/tv/trending">Browse TV Shows</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
