import { fetchTrending } from "@/api/api";
import genre from "@/api/genre";
import useFetch from "@/hooks/useFetch";
import { TMDB_BASE_IMAGE_PATH } from "@/utils/images";
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Text,
  View,
} from "react-native";
const { width, height } = Dimensions.get("screen");

const Trending = () => {
  const { loading, reFetch, reset, data, error } = useFetch(
    () => fetchTrending("week"),
    true
  );

  return (
    <View className={`w-full bg-black`} style={{ height: height * 0.4 }}>
      {loading ? (
        <View className="w-full h-full items-center justify-center">
          <ActivityIndicator size="small" color={"#fffa"} />
        </View>
      ) : data?.length > 0 ? (
        <>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View className={`h-full w-[${width + "px"}]`}>
                <ImageBackground
                  source={{
                    uri: `${TMDB_BASE_IMAGE_PATH}original${item.backdrop_path}`,
                  }}
                  className="w-full h-[100%] justify-end z-30"
                  resizeMode="cover"
                  blurRadius={30}
                >
                  <LinearGradient
                    colors={[
                      "#555e",
                      "#555e",
                      "#555e",
                      "#555d",
                      "#5552",
                      "#5550",
                      "#5550",
                      "#5550",
                      "#5550",
                      "#5550",
                      "#5550",
                      "#5550",
                      "#0004",
                      "#0005",
                      "#0007",
                    ]}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    className="absolute top-0 left-0 right-0 bottom-0 z-20"
                  />
                  <Image
                    source={{
                      uri: `${TMDB_BASE_IMAGE_PATH}original${item.backdrop_path}`,
                    }}
                    className={`w-full h-[100%] absolute left-0 top-[60px] z-10`}
                    resizeMode="cover"
                  />
                </ImageBackground>
              </View>
            )}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
          />

          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View className="h-[100px] w-fit flex-row items-end">
                <Image
                  source={{
                    uri: `${TMDB_BASE_IMAGE_PATH}w500${item.poster_path}`,
                  }}
                  className="h-[60px] w-[45px] rounded-lg overflow-hidden absolute left-3 bottom-[5px] z-10"
                  resizeMode="contain"
                />
                <View
                  className={`flex-row items-center gap-3 bg-[#ccc3] pl-[60px] py-[8px] pr-[10px] w-[${
                    width * 0.7 + "px"
                  }] rounded-lg`}
                >
                  <View>
                    <Text
                      className="text-[#fffa] font-semibold w-[120px]"
                      numberOfLines={1}
                    >
                      {item.title || item.name}
                    </Text>
                    <View className="flex-row items-center gap-1 w-[120px]">
                      {item.media_type === "movie" ? (
                        <MaterialCommunityIcons
                          name="movie-check"
                          size={12}
                          color="#fffa"
                        />
                      ) : item.media_type === "tv" ? (
                        <Feather name="tv" size={12} color={"#fffa"} />
                      ) : (
                        <></>
                      )}
                      <View className="w-[1px] h-3 bg-[#fffa]" />
                      <Text className="text-[#fffa] text-[.8rem] font-semibold">
                        {item.first_air_date?.split("-")[0] ||
                          item.release_date?.split("-")[0]}
                      </Text>
                      <View className="w-[1px] h-3 bg-[#fffa]" />
                      <Text className="text-[#fffa] text-[.8rem] capitalize font-semibold">
                        {genre[item.genre_ids[0]]}
                      </Text>
                    </View>
                  </View>
                  <View className="w-7 h-7 items-center justify-center rounded-full overflow-hidden">
                    <LinearGradient
                      colors={["deepskyblue", "lime"]}
                      className="absolute w-full h-full opacity-90"
                    />
                    <FontAwesome name="angle-right" size={20} color={"#000c"} />
                  </View>
                </View>
              </View>
            )}
            className="absolute bottom-0"
            contentContainerClassName="gap-3 px-2"
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
          />
        </>
      ) : (
        <Text>Error: </Text>
      )}
    </View>
  );
};

export default Trending;
