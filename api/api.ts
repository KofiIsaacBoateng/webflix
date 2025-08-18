import fetchMovies from "./fetchMovies";

/***
 * toplist .
 * movie .
 * western .
 * black drama -- skip to Ghanaian specials .
 * k drama.
 * c drama.
 * nollywood.
 * bollywood.
 * anime.
 * animated film.
 *
 * ~~ UNIQUES OPTIONS ~~
 * Young adult fiction.
 * Made in Africa.
 * Hot Action movies.
 * Midnight Horror Express.
 * Adventure.
 * Most Trending
 * Global Hits
 * Movie/TV Series --- lotta work
 */

export type mediaType = "tv" | "movie";
export type countryType = "US" | "NG" | "IN" | "CN" | "KR" | "GH" | "GH|NG|SA";
const today = new Date();
const year = today.getFullYear();

export const fetchTrending = async (type: "day" | "week", page = 1) => {
  const routeName = `trending/${
    type === "day" ? "tv" : "all"
  }/${type}?api_key=${process.env.EXPO_PUBLIC_API_KEY}&language=en-US`;
  const queryParams = `&sort_by=popularity.desc&first_air_date.gte=${year}-01-01&oprimary_release_date.gte=${year}-01-01&page=${page.toString()}`;

  const result = await fetchMovies({ queryParams, routeName });

  return result
    .filter((data, index: number) => data.original_language === "en")
    .slice(0, type === "week" ? 10 : undefined);
};

const countryBasedMovies = async (
  media: mediaType,
  country: countryType,
  page = 1
) => {
  const routeName = `discover/${media}?api_key=${process.env.EXPO_PUBLIC_API_KEY}&include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc`;
  const queryParams = `&with_origin_country=${country}&page=${page.toString()}${
    country === "KR" || country === "CN"
      ? `&with_genres=18&with_original_language=${
          country === "KR" ? "ko" : "zh"
        }`
      : country === "IN"
      ? "&with_original_language=hi|te|ta|ml|kn|bn&"
      : ""
  }`;

  const result = await fetchMovies({ routeName, queryParams });

  return result;
};

export const animations = async (isAnime = false, page = 1) => {
  const routeName = `discover/${isAnime ? "tv" : "movie"}?api_key=${
    process.env.EXPO_PUBLIC_API_KEY
  }&include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&page=${page.toString()}`;
  const queryParams =
    "&with_genres=16" + isAnime ? "&with_origin_country=JP" : "";

  const result = await fetchMovies({ routeName, queryParams });

  return result;
};

export const fetchHollywoodMovies = (page: number) =>
  countryBasedMovies("movie", "US", page);
export const fetchNollywoodMovies = (page: number) =>
  countryBasedMovies("movie", "NG", page);
export const fetchBollywoodMovies = (page: number) =>
  countryBasedMovies("movie", "IN", page);
export const fetchGhMovies = (page: number) =>
  countryBasedMovies("movie", "GH", page);
export const fetchKDrama = (page: number) =>
  countryBasedMovies("tv", "KR", page);
export const fetchCDrama = (page: number) =>
  countryBasedMovies("tv", "CN", page);
export const fetchWesternTv = (page: number) =>
  countryBasedMovies("tv", "US", page);

export const rankingFetch = {
  hollywood: fetchHollywoodMovies,
  nollywood: fetchNollywoodMovies,
  bollywood: fetchBollywoodMovies,
  gh: fetchGhMovies,
  kDrama: fetchKDrama,
  cDrama: fetchCDrama,
  western: fetchWesternTv,
  toplist: (page: number) => fetchTrending("day", page),
  anime: (page: number) => animations(true, page),
  animated: (page: number) => animations(false, page),
};

// unique categories
export const fetchAfricanMadeTV = () => countryBasedMovies("tv", "GH|NG|SA");
export const fetchAfricanMadeMovies = () =>
  countryBasedMovies("movie", "GH|NG|SA");

/**** Young Adult fiction */
export const YAFiction = async () => {
  const baseRouteTV = "discover/tv";
  const baseRouteMovie = "discover/movie";
  const initialRouteParams = `?api_key=${process.env.EXPO_PUBLIC_API_KEY}&include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc`;

  const tvRouteName = baseRouteTV + initialRouteParams;
  const mvRouteName = baseRouteMovie + initialRouteParams;
  const routeParamsMv =
    "&with_genres=12,14,878,10749&certification_country=US&certification.lte=PG-13";
  const routeParamsTv =
    "&with_genres=18,10765,10766&certification_country=US&certification.lte=TV-14";

  const [movie, tv] = await Promise.all([
    fetchMovies({ routeName: mvRouteName, queryParams: routeParamsMv }),
    fetchMovies({ routeName: tvRouteName, queryParams: routeParamsTv }),
  ]);

  const combined = [...movie, ...tv];

  combined.sort((a, b) => b.popularity - a.popularity);

  return combined.slice(0, 20); // top 20 young adult fiction
};

/**** Genre Based */
const genreBasedMovies = async (genreId: number, startYear: string) => {
  const routeName = `discover/movie?api_key=${process.env.EXPO_PUBLIC_API_KEY}&include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc`;
  const queryParams = `&with_genres=${genreId}&primary_release_year=${startYear}&with_original_language=en&region=US&vote_count.gte=1000`;

  const result = await fetchMovies({ routeName, queryParams });

  return result;
};

export const hotAction = () => genreBasedMovies(28, "2025");
export const horror = () => genreBasedMovies(27, "2024");
export const adventure = () => genreBasedMovies(12, "2024");
