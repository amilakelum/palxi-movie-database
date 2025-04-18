import MediaCard from "@/components/media-card"

interface MediaGridProps {
  items: any[]
  type: "movie" | "tv"
}

export default function MediaGrid({ items, type }: MediaGridProps) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No items found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {items.map((item) => (
        <MediaCard key={item.id} item={item} type={type} />
      ))}
    </div>
  )
}
