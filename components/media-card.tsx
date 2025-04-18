import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

interface MediaCardProps {
  item: any
  type: "movie" | "tv"
}

export default function MediaCard({ item, type }: MediaCardProps) {
  const title = type === "movie" ? item.title : item.name
  const releaseDate = type === "movie" ? item.release_date : item.first_air_date
  const formattedDate = formatDate(releaseDate)

  // Update the link to point to the correct route
  const detailsLink = `/${type}/${item.id}`

  // Prepare image URL
  const imageUrl = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "/placeholder.svg"

  return (
    <Card className="overflow-hidden group h-full flex flex-col">
      <Link href={detailsLink} className="relative block aspect-[2/3] overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
            <span>{item.vote_average.toFixed(1)}</span>
          </Badge>
        </div>
      </Link>
      <CardContent className="p-3 flex-1 flex flex-col">
        <h3 className="font-semibold line-clamp-1 mb-1">
          <Link href={detailsLink}>{title}</Link>
        </h3>
        <p className="text-xs text-muted-foreground">{formattedDate}</p>
      </CardContent>
    </Card>
  )
}
