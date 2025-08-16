const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3/",
  ACCESS_TOKEN: process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN}`,
  },
};

export default async ({
  queryParams,
  routeName,
}: {
  queryParams: string;
  routeName: string;
}) => {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}${routeName}${queryParams}`,
    {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    }
  );

  if (!response.ok) {
    console.log("error: ", await response.json());
    throw Error(
      `Failed to fetch movies during: [${routeName || "null"} : ${queryParams}]`
    );
  }

  const result = await response.json();

  return result.results;
};
