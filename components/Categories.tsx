import {
  all,
  bollywood,
  hollywood,
  kdrama,
  nollywood,
  western,
} from "@/utils/images";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
const { width, height } = Dimensions.get("screen");

const categories = [
  { title: "all", src: all },
  { title: "hollywood", src: hollywood },
  { title: "nollywood", src: nollywood },
  { title: "bollywood", src: bollywood },
  { title: "western", src: western },
  { title: "kdrama", src: kdrama },
];
const Categories = () => {
  return (
    <View className={` w-[${width + ""}px]`}>
      <Text className="text-white pl-2 my-2 text-[1rem] font-bold">
        Categories
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="h-[50px] px-2 gap-2"
      >
        {categories.map((category, index) => (
          <Pressable onPress={() => null} key={index}>
            <ImageBackground
              source={category.src}
              resizeMode="cover"
              className=" w-[105px] h-[50px] flex-row items-center px-3 rounded-sm overflow-hidden"
            >
              <LinearGradient
                className="absolute top-0 left-0 right-0 bottom-0 z-20"
                colors={["#222c", "#222c", "#222b", "#2229", "#2229"]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
              />
              <Text className="text-[#fffa] capitalize font-semibold text-[1rem] z-20">
                {category.title}
              </Text>
            </ImageBackground>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;
