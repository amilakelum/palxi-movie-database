import MediaGrid from "@/components/media-grid";
import { getTopRatedMovies } from "@/lib/tmdb";
import type { Metadata } from "next";
import { ApiErrorMessage } from "@/components/api-error-message";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import Pagination from "@/components/pagination";

export const metadata: Metadata = {
  title: "Top Rated Movies | Palxi",
  description: "Discover the highest rated movies of all time",
};

interface TopRatedMoviesPageProps {
  searchParams: Promise<{ page?: string }>; // Explicitly type as a promise
}

export default async function TopRatedMoviesPage({
  searchParams,
}: TopRatedMoviesPageProps) {
  const params = await searchParams; // Resolve the promise
  const currentPage = Number(params.page) || 1; // Use resolved params

  try {
    const topRatedMovies = await getTopRatedMovies(currentPage);
    const totalPages =
      topRatedMovies.total_pages > 500 ? 500 : topRatedMovies.total_pages;

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold">Top Rated Movies</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              Showing {topRatedMovies.results.length} of{" "}
              {topRatedMovies.total_results} movies
            </span>
          </div>
        </div>

        <Suspense fallback={<LoadingGrid />}>
          <MediaGrid items={topRatedMovies.results} type="movie" />

          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl="/movies/top-rated"
            />
          </div>
        </Suspense>
      </div>
    );
  } catch (error) {
    return <ApiErrorMessage />;
  }
}

function LoadingGrid() {
  return (
    <div className="flex justify-center items-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
