import { TMDB_BASE_IMAGE_PATH } from "@/utils/images";
import React from "react";
import { Image, Pressable, Text } from "react-native";

interface MovieCardType {
  source: string;
  title: string;
  action: () => void;
}

const MovieCard = ({ source, title, action }: MovieCardType) => {
  return (
    <Pressable
      onPress={action}
      className="w-[105px] h-[180px] rounded-md bg-[#232323] overflow-hidden"
    >
      <Image
        source={{ uri: `${TMDB_BASE_IMAGE_PATH}w780${source}` }}
        className="w-full h-[155px]"
        resizeMode="contain"
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
