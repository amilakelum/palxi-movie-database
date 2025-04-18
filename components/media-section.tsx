import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import MediaCard from "@/components/media-card"

interface MediaSectionProps {
  title: string
  items: any[]
  type: "movie" | "tv"
  viewAllHref: string
}

export default function MediaSection({ title, items, type, viewAllHref }: MediaSectionProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Button variant="ghost" size="sm" asChild>
          <Link href={viewAllHref} className="flex items-center gap-1">
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map((item) => (
          <MediaCard key={item.id} item={item} type={type} />
        ))}
      </div>
    </section>
  )
}
