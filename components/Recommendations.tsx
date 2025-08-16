import { fetchTrending } from "@/api/api";
import useFetch from "@/hooks/useFetch";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import HeaderLinks from "./HeaderLinks";
import MovieCard from "./MovieCard";

export const TrendNow = () => {
  const { loading, reFetch, reset, data, error } = useFetch(
    () => fetchTrending("day"),
    true
  );

  return (
    <View className="mt-2 gap-1">
      <HeaderLinks
        title="Trending now🔥"
        actionTitle="all"
        action={() => null}
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
              action={() => null}
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

export const Hollywood = () => {
  const { loading, reFetch, reset, data, error } = useFetch(
    () => fetchTrending("day"),
    true
  );

  return (
    <View className="mt-2 gap-1">
      <HeaderLinks
        title="Hollywood movie"
        actionTitle="all"
        action={() => null}
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
              action={() => null}
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
