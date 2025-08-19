import { TMDB_BASE_IMAGE_PATH } from "@/utils/images";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, Text } from "react-native";

interface MovieCardType {
  source: string;
  title: string;
  id: string;
}

const MovieCard = ({ source, title, id }: MovieCardType) => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.navigate(`./movies/${id}`)}
      className="w-[105px] h-[180px] rounded-md bg-[#232323] overflow-hidden"
    >
      <Image
        source={{ uri: `${TMDB_BASE_IMAGE_PATH}w780${source}` }}
        className="w-full h-[155px] z-10"
        resizeMode="cover"
      />
      <Image
        source={{ uri: `${TMDB_BASE_IMAGE_PATH}w92${source}` }}
        className="absolute top-0 w-full h-[155px] z-0"
        resizeMode="cover"
        blurRadius={100}
      />
      <Text
        numberOfLines={1}
        className="text-[.9rem] text-[#fffa] px-2 my-auto"
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default MovieCard;
