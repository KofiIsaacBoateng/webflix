import {
  adventure,
  animations,
  countryType,
  fetchBollywoodMovies,
  fetchCDrama,
  fetchGhMovies,
  fetchHollywoodMovies,
  fetchKDrama,
  fetchNollywoodMovies,
  fetchTrending,
  fetchWesternTv,
  horror,
  hotAction,
  mediaType,
  YAFiction,
} from "@/api/api";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import HeaderLinks from "./HeaderLinks";
import MovieCard from "./MovieCard";

export const TrendNow = () => {
  const router = useRouter();
  const { loading, reFetch, reset, data, error } = useFetch(
    () => fetchTrending("day"),
    true
  );

  return (
    <View className="mt-2 gap-1">
      <HeaderLinks
        title="Trending now🔥"
        actionTitle="all"
        action={() =>
          router.navigate({
            pathname: "./ranking",
            params: { activeTab: "toplist" },
          })
        }
      />

      {loading ? (
        <View className="w-full h-full items-center justify-center">
          <ActivityIndicator size="small" color={"#fffa"} />
        </View>
      ) : data?.length > 0 ? (
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <MovieCard
              source={item.poster_path}
              title={item.title || item.name}
              id={item.id}
            />
          )}
          contentContainerClassName="gap-2 px-2"
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>Error</Text>
      )}
    </View>
  );
};

interface CountryBasedType {
  func: (page: number) => Promise<any>;
  routeParam?: {
    mediaType: mediaType;
    country: countryType;
  };
  title: string;
  isRanked?: { activeTab: string };
}

const CountryBased = ({
  func,
  routeParam,
  title,
  isRanked,
}: CountryBasedType) => {
  const { loading, reFetch, reset, data, error } = useFetch(func, true);
  const router = useRouter();

  return (
    <View className="mt-2 gap-1">
      <HeaderLinks
        title={title}
        actionTitle="all"
        action={() =>
          router.navigate(
            isRanked
              ? { pathname: "./ranking", params: { route: isRanked.activeTab } }
              : "./special"
          )
        }
      />

      {loading ? (
        <View className="w-full h-full items-center justify-center">
          <ActivityIndicator size="small" color={"#fffa"} />
        </View>
      ) : data?.length > 0 ? (
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <MovieCard
              source={item.poster_path}
              title={item.title || item.name}
              id={item.id}
            />
          )}
          contentContainerClassName="gap-2 px-2"
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>Error</Text>
      )}
    </View>
  );
};

export const Hollywood = () => (
  <CountryBased
    func={fetchHollywoodMovies}
    routeParam={{ mediaType: "movie", country: "US" }}
    title="Hollywood Movie"
    isRanked={{ activeTab: "1" }}
  />
);

export const WesternTV = () => (
  <CountryBased
    func={fetchWesternTv}
    routeParam={{ mediaType: "tv", country: "US" }}
    title="Wester TV"
    isRanked={{ activeTab: "2" }}
  />
);

export const Ghanaian = () => (
  <CountryBased
    func={fetchGhMovies}
    routeParam={{ mediaType: "movie", country: "GH" }}
    title="Ghanaian Special"
    isRanked={{ activeTab: "3" }}
  />
);

export const Bollywood = () => (
  <CountryBased
    func={fetchBollywoodMovies}
    routeParam={{ mediaType: "movie", country: "IN" }}
    title="Hot Bollywood Movies"
    isRanked={{ activeTab: "7" }}
  />
);

export const NollyWood = () => (
  <CountryBased
    func={fetchNollywoodMovies}
    routeParam={{ mediaType: "movie", country: "NG" }}
    title="Latest Nollywood Movies"
    isRanked={{ activeTab: "8" }}
  />
);

export const KDrama = () => (
  <CountryBased
    func={fetchKDrama}
    routeParam={{ mediaType: "tv", country: "KR" }}
    title="K-Drama"
    isRanked={{ activeTab: "4" }}
  />
);

export const CDrama = () => (
  <CountryBased
    func={fetchCDrama}
    routeParam={{ mediaType: "tv", country: "CN" }}
    title="C-Drama"
    isRanked={{ activeTab: "5" }}
  />
);

export const SpecificDisplays = ({
  title,
  func,
  isRanked,
}: CountryBasedType) => {
  const { loading, data } = useFetch(func, true);
  const router = useRouter();

  return (
    <View className="mt-2 gap-1">
      <HeaderLinks
        title={title}
        actionTitle="all"
        action={() =>
          router.navigate(
            isRanked
              ? { pathname: "./ranking", params: { route: isRanked.activeTab } }
              : "./special"
          )
        }
      />

      {loading ? (
        <View className="w-full h-full items-center justify-center">
          <ActivityIndicator size="small" color={"#fffa"} />
        </View>
      ) : data?.length > 0 ? (
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <MovieCard
              source={item.poster_path}
              title={item.title || item.name}
              id={item.id}
            />
          )}
          contentContainerClassName="gap-2 px-2"
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>Error</Text>
      )}
    </View>
  );
};

export const Anime = () => (
  <SpecificDisplays
    func={() => animations(true)}
    title="Anime Express"
    isRanked={{ activeTab: "6" }}
  />
);
export const YAF = () => (
  <SpecificDisplays func={YAFiction} title="Young Adult Fiction" />
);
export const Action = () => (
  <SpecificDisplays func={hotAction} title="Hot Action Movies" />
);
export const Horror = () => (
  <SpecificDisplays func={horror} title="Midnight Horrors" />
);
export const Adventure = () => (
  <SpecificDisplays func={adventure} title="Adventure" />
);
