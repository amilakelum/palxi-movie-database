// Server-side TMDB API functions

// Using the provided API key
const TMDB_API_KEY =
  process.env.TMDB_API_KEY || "95c16c539a4a990696994964a59389b3";
const BASE_URL = "https://api.themoviedb.org/3";

// Helper function to make API requests
async function fetchFromTMDB(
  endpoint: string,
  params: Record<string, string> = {}
) {
  const queryParams = new URLSearchParams({
    api_key: TMDB_API_KEY,
    ...params,
  });

  try {
    const response = await fetch(
      `${BASE_URL}${endpoint}?${queryParams.toString()}`
    );

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching from TMDB:", error);
    throw error;
  }
}

// Get trending movies with 24 items per page
export async function getTrendingMovies(
  timeWindow: "day" | "week" = "week",
  page = 1
) {
  // Calculate the actual TMDB API pages we need
  const tmdbPage1 = Math.floor(((page - 1) * 24) / 20) + 1;
  const tmdbPage2 = tmdbPage1 + 1;

  // Fetch two consecutive pages
  const [page1Data, page2Data] = await Promise.all([
    fetchFromTMDB(`/trending/movie/${timeWindow}`, {
      page: tmdbPage1.toString(),
    }),
    fetchFromTMDB(`/trending/movie/${timeWindow}`, {
      page: tmdbPage2.toString(),
    }),
  ]);

  // Combine results from both pages
  const allResults = [...page1Data.results, ...page2Data.results];

  // Calculate the start index for our custom pagination
  const startIdx = ((page - 1) * 24) % 20;

  // Slice exactly 24 items
  const results = allResults.slice(startIdx, startIdx + 24);

  // Calculate the total number of pages with 24 items per page
  const totalPages = Math.ceil(page1Data.total_results / 24);

  return {
    results,
    page,
    total_pages: totalPages,
    total_results: page1Data.total_results,
  };
}

// Get top rated movies with 24 items per page
export async function getTopRatedMovies(page = 1) {
  // Calculate the actual TMDB API pages we need
  const tmdbPage1 = Math.floor(((page - 1) * 24) / 20) + 1;
  const tmdbPage2 = tmdbPage1 + 1;

  // Fetch two consecutive pages
  const [page1Data, page2Data] = await Promise.all([
    fetchFromTMDB("/movie/top_rated", { page: tmdbPage1.toString() }),
    fetchFromTMDB("/movie/top_rated", { page: tmdbPage2.toString() }),
  ]);

  // Combine results from both pages
  const allResults = [...page1Data.results, ...page2Data.results];

  // Calculate the start index for our custom pagination
  const startIdx = ((page - 1) * 24) % 20;

  // Slice exactly 24 items
  const results = allResults.slice(startIdx, startIdx + 24);

  // Calculate the total number of pages with 24 items per page
  const totalPages = Math.ceil(page1Data.total_results / 24);

  return {
    results,
    page,
    total_pages: totalPages,
    total_results: page1Data.total_results,
  };
}

// Get trending TV shows with 24 items per page
export async function getTrendingTVShows(
  timeWindow: "day" | "week" = "week",
  page = 1
) {
  // Calculate the actual TMDB API pages we need
  const tmdbPage1 = Math.floor(((page - 1) * 24) / 20) + 1;
  const tmdbPage2 = tmdbPage1 + 1;

  // Fetch two consecutive pages
  const [page1Data, page2Data] = await Promise.all([
    fetchFromTMDB(`/trending/tv/${timeWindow}`, { page: tmdbPage1.toString() }),
    fetchFromTMDB(`/trending/tv/${timeWindow}`, { page: tmdbPage2.toString() }),
  ]);

  // Combine results from both pages
  const allResults = [...page1Data.results, ...page2Data.results];

  // Calculate the start index for our custom pagination
  const startIdx = ((page - 1) * 24) % 20;

  // Slice exactly 24 items
  const results = allResults.slice(startIdx, startIdx + 24);

  // Calculate the total number of pages with 24 items per page
  const totalPages = Math.ceil(page1Data.total_results / 24);

  return {
    results,
    page,
    total_pages: totalPages,
    total_results: page1Data.total_results,
  };
}

// Get top rated TV shows with 24 items per page
export async function getTopRatedTVShows(page = 1) {
  // Calculate the actual TMDB API pages we need
  const tmdbPage1 = Math.floor(((page - 1) * 24) / 20) + 1;
  const tmdbPage2 = tmdbPage1 + 1;

  // Fetch two consecutive pages
  const [page1Data, page2Data] = await Promise.all([
    fetchFromTMDB("/tv/top_rated", { page: tmdbPage1.toString() }),
    fetchFromTMDB("/tv/top_rated", { page: tmdbPage2.toString() }),
  ]);

  // Combine results from both pages
  const allResults = [...page1Data.results, ...page2Data.results];

  // Calculate the start index for our custom pagination
  const startIdx = ((page - 1) * 24) % 20;

  // Slice exactly 24 items
  const results = allResults.slice(startIdx, startIdx + 24);

  // Calculate the total number of pages with 24 items per page
  const totalPages = Math.ceil(page1Data.total_results / 24);

  return {
    results,
    page,
    total_pages: totalPages,
    total_results: page1Data.total_results,
  };
}

// Get movie details
export async function getMovieDetails(id: string) {
  return fetchFromTMDB(`/movie/${id}`, {
    append_to_response: "credits,videos,similar",
  });
}

// Get TV show details
export async function getTVShowDetails(id: string) {
  return fetchFromTMDB(`/tv/${id}`, {
    append_to_response: "credits,videos,similar",
  });
}

// Get a random backdrop for the hero section
export async function getRandomBackdrop() {
  try {
    const trendingAll = await fetchFromTMDB("/trending/all/day");
    const itemsWithBackdrops = trendingAll.results.filter(
      (item: any) => item.backdrop_path
    );

    if (itemsWithBackdrops.length === 0) {
      return {
        title: "Palxi Movie Database",
        overview: "Discover trending and top-rated movies and TV shows",
        backdrop_path: "/rLb2cwF3Pazuxaj0sRXQ037tGI.jpg", // Fallback backdrop
        media_type: "movie",
        id: 872585,
      };
    }

    const randomIndex = Math.floor(Math.random() * itemsWithBackdrops.length);
    return itemsWithBackdrops[randomIndex];
  } catch (error) {
    console.error("Error getting random backdrop:", error);
    return {
      title: "Palxi Movie Database",
      overview: "Discover trending and top-rated movies and TV shows",
      backdrop_path: "/rLb2cwF3Pazuxaj0sRXQ037tGI.jpg", // Fallback backdrop
      media_type: "movie",
      id: 872585,
    };
  }
}

// Get genres for movies
export async function getMovieGenres() {
  return fetchFromTMDB("/genre/movie/list");
}

// Get genres for TV shows
export async function getTVGenres() {
  return fetchFromTMDB("/genre/tv/list");
}

// Discover movies by genre with 24 items per page
export async function discoverMoviesByGenre(genreId: string, page = 1) {
  // Calculate the actual TMDB API pages we need
  const tmdbPage1 = Math.floor(((page - 1) * 24) / 20) + 1;
  const tmdbPage2 = tmdbPage1 + 1;

  // Fetch two consecutive pages
  const [page1Data, page2Data] = await Promise.all([
    fetchFromTMDB("/discover/movie", {
      with_genres: genreId,
      page: tmdbPage1.toString(),
      sort_by: "popularity.desc",
    }),
    fetchFromTMDB("/discover/movie", {
      with_genres: genreId,
      page: tmdbPage2.toString(),
      sort_by: "popularity.desc",
    }),
  ]);

  // Combine results from both pages
  const allResults = [...page1Data.results, ...page2Data.results];

  // Calculate the start index for our custom pagination
  const startIdx = ((page - 1) * 24) % 20;

  // Slice exactly 24 items
  const results = allResults.slice(startIdx, startIdx + 24);

  // Calculate the total number of pages with 24 items per page
  const totalPages = Math.ceil(page1Data.total_results / 24);

  return {
    results,
    page,
    total_pages: totalPages,
    total_results: page1Data.total_results,
  };
}

// Discover TV shows by genre with 24 items per page
export async function discoverTVShowsByGenre(genreId: string, page = 1) {
  // Calculate the actual TMDB API pages we need
  const tmdbPage1 = Math.floor(((page - 1) * 24) / 20) + 1;
  const tmdbPage2 = tmdbPage1 + 1;

  // Fetch two consecutive pages
  const [page1Data, page2Data] = await Promise.all([
    fetchFromTMDB("/discover/tv", {
      with_genres: genreId,
      page: tmdbPage1.toString(),
      sort_by: "popularity.desc",
    }),
    fetchFromTMDB("/discover/tv", {
      with_genres: genreId,
      page: tmdbPage2.toString(),
      sort_by: "popularity.desc",
    }),
  ]);

  // Combine results from both pages
  const allResults = [...page1Data.results, ...page2Data.results];

  // Calculate the start index for our custom pagination
  const startIdx = ((page - 1) * 24) % 20;

  // Slice exactly 24 items
  const results = allResults.slice(startIdx, startIdx + 24);

  // Calculate the total number of pages with 24 items per page
  const totalPages = Math.ceil(page1Data.total_results / 24);

  return {
    results,
    page,
    total_pages: totalPages,
    total_results: page1Data.total_results,
  };
}
