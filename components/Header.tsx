import { logo } from "@/utils/images";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableWithoutFeedback, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Header = () => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={{ paddingTop: top }}
      className={`absolute top-0 w-full h-[80px] bg-[#00000001] flex-row items-center justify-center gap-2 px-2 pb-1 backdrop-blur-lg z-50`}
    >
      <Image source={logo} alt="Logo" className="h-9 w-9" />
      <TouchableWithoutFeedback onPress={() => router.navigate("/search")}>
        <View className="flex-1 flex-row items-center gap-2 bg-[#9998] px-3 py-3 rounded-md">
          <AntDesign name="search1" size={15} color="#fffd" />
          <Text className="text-[#fffd] text-[.9rem]">To kill a monkey</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Header;
