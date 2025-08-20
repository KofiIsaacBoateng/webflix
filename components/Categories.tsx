import {
  all,
  bollywood,
  hollywood,
  kdrama,
  nollywood,
  western,
} from "@/utils/images";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
const { width } = Dimensions.get("screen");

const categories = [
  { title: "all", src: all, qv: undefined, name: undefined },
  { title: "hollywood", src: hollywood, qv: "US", name: "United States" },
  { title: "nollywood", src: nollywood, qv: "NG", name: "Nigeria" },
  { title: "bollywood", src: bollywood, qv: "IN", name: "India" },
  { title: "western", src: western, qv: "US", name: "United States" },
  { title: "kdrama", src: kdrama, qv: "KR", name: "South Korea" },
];
const Categories = () => {
  const router = useRouter();
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
        {categories.map(({ title, src, qv, name }, index) => (
          <Pressable
            onPress={() =>
              router.navigate({
                pathname: "./filter",
                params: { title: name, qv },
              })
            }
            key={index}
          >
            <ImageBackground
              source={src}
              resizeMode="cover"
              className=" w-[105px] h-[50px] flex-row items-center px-3 rounded-sm overflow-hidden"
            >
              <LinearGradient
                className="absolute top-0 left-0 right-0 bottom-0 z-20"
                colors={["#0009", "#0008", "#0006", "#0005", "#0002", "#0001"]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
              />
              <Text className="text-[#fff] capitalize font-semibold text-[1rem] z-20">
                {title}
              </Text>
            </ImageBackground>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;
