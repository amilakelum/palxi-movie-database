import MediaGrid from "@/components/media-grid";
import { getTopRatedTVShows } from "@/lib/tmdb";
import type { Metadata } from "next";
import { ApiErrorMessage } from "@/components/api-error-message";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import Pagination from "@/components/pagination";

export const metadata: Metadata = {
  title: "Top Rated TV Shows | Palxi",
  description: "Discover the highest rated TV shows of all time",
};

interface TopRatedTVShowsPageProps {
  searchParams: { page?: string };
}

export default async function TopRatedTVShowsPage({
  searchParams,
}: TopRatedTVShowsPageProps) {
  const currentPage = Number(searchParams.page) || 1;

  try {
    const topRatedTVShows = await getTopRatedTVShows(currentPage);
    const totalPages =
      topRatedTVShows.total_pages > 500 ? 500 : topRatedTVShows.total_pages;

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold">Top Rated TV Shows</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              Showing {topRatedTVShows.results.length} of{" "}
              {topRatedTVShows.total_results} TV shows
            </span>
          </div>
        </div>

        <Suspense fallback={<LoadingGrid />}>
          <MediaGrid items={topRatedTVShows.results} type="tv" />

          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl="/tv/top-rated"
            />
          </div>
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error("Error loading top rated TV shows:", error);
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
