import Link from "next/link"
import { Film, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Film className="h-5 w-5 text-primary" />
            <span className="font-semibold">Palxi</span>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/yourusername/palxi-movie-database"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
