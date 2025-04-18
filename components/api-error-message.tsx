import Link from "next/link"
import { Button } from "@/components/ui/button"

export function ApiErrorMessage() {
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
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="https://www.themoviedb.org/settings/api" target="_blank" rel="noopener noreferrer">
              Get TMDB API Key
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
