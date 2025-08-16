import fetchMovies from "./fetchMovies";

export const fetchTrending = async (type: "day" | "week") => {
  const today = new Date();
  const year = today.getFullYear();
  const routeName = `trending/all/${type}?api_key=${process.env.EXPO_PUBLIC_API_KEY}&language=en-US`;
  const queryParams = `&sort_by=popularity.desc&first_air_date.gte=${year}-01-01`;

  const result = await fetchMovies({ queryParams, routeName });

  return result
    .filter((data, index: number) => data.original_language === "en")
    .slice(0, 10);
};
