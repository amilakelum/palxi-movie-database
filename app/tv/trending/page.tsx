import MediaGrid from "@/components/media-grid";
import { getTrendingTVShows } from "@/lib/tmdb";
import type { Metadata } from "next";
import { ApiErrorMessage } from "@/components/api-error-message";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import Pagination from "@/components/pagination";

export const metadata: Metadata = {
  title: "Trending TV Shows | Palxi",
  description: "Discover the most popular and trending TV shows right now",
};

interface TrendingTVShowsPageProps {
  searchParams: { page?: string };
}

export default async function TrendingTVShowsPage({
  searchParams,
}: TrendingTVShowsPageProps) {
  const currentPage = Number(searchParams.page) || 1;

  try {
    const trendingTVShows = await getTrendingTVShows("week", currentPage);
    const totalPages =
      trendingTVShows.total_pages > 500 ? 500 : trendingTVShows.total_pages;

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold">Trending TV Shows</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              Showing {trendingTVShows.results.length} of{" "}
              {trendingTVShows.total_results} TV shows
            </span>
          </div>
        </div>

        <Suspense fallback={<LoadingGrid />}>
          <MediaGrid items={trendingTVShows.results} type="tv" />

          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl="/tv/trending"
            />
          </div>
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error("Error loading trending TV shows:", error);
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
