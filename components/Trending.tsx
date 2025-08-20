import { fetchTrending } from "@/api/api";
import genre from "@/api/genre";
import useFetch from "@/hooks/useFetch";
import { TMDB_BASE_IMAGE_PATH } from "@/utils/images";
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
} from "react-native";
const { width, height } = Dimensions.get("screen");
const MINI_WIDTH = width * 0.7;
const MINI_SPACING = 10;

const Trending = () => {
  const { loading, data } = useFetch(() => fetchTrending("week"), true);
  const mainRef = useRef<FlatList>(null);
  const miniRef = useRef<FlatList>(null);
  const manualRef = useRef<"main" | "mini" | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (data?.length > 0 && isFocused) {
      const interval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % data.length;
        scrollBoth(nextIndex, null);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [currentIndex, data, isFocused]);

  const scrollBoth = (index: number, origin: "main" | "mini" | null) => {
    setCurrentIndex(index);

    if (origin !== "main") {
      mainRef.current?.scrollToIndex({ index, animated: true });
    }

    if (origin !== "mini") {
      miniRef.current?.scrollToIndex({ index, animated: true });
    }
  };

  const handleScrollMomentumEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
    origin: "main" | "mini"
  ) => {
    // if (manualRef.current === origin) {
    //   manualRef.current = null; // reset for next real scroll
    //   return;
    // }

    const offsetX = e.nativeEvent.contentOffset.x;
    let pageWidth;
    if (origin === "main") pageWidth = width;
    else pageWidth = MINI_WIDTH + MINI_SPACING;

    const updatedIndex = Math.round(offsetX / pageWidth);
    // manualRef.current = origin;
    scrollBoth(updatedIndex, origin);
  };

  return (
    <View className={`w-full`} style={{ height: height * 0.4 }}>
      {loading ? (
        <View className="w-full h-full items-center justify-center">
          <ActivityIndicator size="small" color={"#fffa"} />
        </View>
      ) : data?.length > 0 ? (
        <>
          <FlatList
            ref={mainRef}
            data={data}
            renderItem={({ item }) => (
              <View className={`h-full`} style={{ width }}>
                <ImageBackground
                  source={{
                    uri: `${TMDB_BASE_IMAGE_PATH}w92${item.backdrop_path}`,
                  }}
                  className="w-full h-[100%] justify-end z-10"
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
                      "#0000",
                      "#0000",
                      "#0000",
                      "#0000",
                      "#0000",
                      "#0000",
                      "#0000",
                      "#0003",
                      "#0005",
                      "#000a",
                      "#000c",
                    ]}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    className="absolute top-0 left-0 right-0 bottom-0 z-20"
                  />
                  <Image
                    source={{
                      uri: `${TMDB_BASE_IMAGE_PATH}original${item.backdrop_path}`,
                    }}
                    className={`w-full h-[100%] absolute left-0 top-[60px] `}
                    resizeMode="cover"
                  />
                </ImageBackground>
              </View>
            )}
            horizontal
            snapToInterval={width}
            decelerationRate="fast"
            onMomentumScrollEnd={(e) => handleScrollMomentumEnd(e, "main")}
            getItemLayout={(_, index) => ({
              length: width,
              offset: index * width,
              index,
            })}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
          />

          <FlatList
            ref={miniRef}
            data={data}
            renderItem={({ item }) => (
              <View
                className={`h-[100px] flex-row items-end`}
                style={{ width: width * 0.7 }}
              >
                <Image
                  source={{
                    uri: `${TMDB_BASE_IMAGE_PATH}w500${item.poster_path}`,
                  }}
                  className="h-[60px] w-[45px] rounded-lg overflow-hidden absolute left-3 bottom-[5px] z-10"
                  resizeMode="contain"
                />
                <View
                  className={`flex-row items-center bg-[#ccc4] pl-[60px] py-[8px] pr-[10px] rounded-lg`}
                  style={{ width: width * 0.7, gap: 12 }}
                >
                  <View>
                    <Text
                      className="text-[#fffd] font-semibold w-[120px]"
                      numberOfLines={1}
                    >
                      {item.title || item.name}
                    </Text>
                    <View className="flex-row items-center gap-1 w-[120px]">
                      {item.media_type === "movie" ? (
                        <MaterialCommunityIcons
                          name="movie-check"
                          size={12}
                          color="#fffd"
                        />
                      ) : item.media_type === "tv" ? (
                        <Feather name="tv" size={12} color={"#fffd"} />
                      ) : (
                        <></>
                      )}
                      <View className="w-[1px] h-3 bg-[#fffc]" />
                      <Text className="text-[#fffd] text-[.8rem] font-semibold">
                        {item.first_air_date?.split("-")[0] ||
                          item.release_date?.split("-")[0]}
                      </Text>
                      <View className="w-[1px] h-3 bg-[#fffc]" />
                      <Text className="text-[#fffa] text-[.8rem] capitalize font-semibold">
                        {genre[item.genre_ids[0]]}
                      </Text>
                    </View>
                  </View>
                  <View className="w-7 h-7 ml-auto items-center justify-center rounded-full overflow-hidden">
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
            contentContainerStyle={{ paddingRight: MINI_WIDTH * 0.2 }}
            horizontal
            decelerationRate="fast"
            onMomentumScrollEnd={(e) => handleScrollMomentumEnd(e, "mini")}
            snapToInterval={MINI_WIDTH + MINI_SPACING}
            getItemLayout={(_, index) => ({
              length: MINI_WIDTH + MINI_SPACING,
              offset: index * (MINI_WIDTH + MINI_SPACING),
              index,
            })}
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
