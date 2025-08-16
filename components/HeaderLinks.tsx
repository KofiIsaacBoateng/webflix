import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface HeaderLinksType {
  action: () => void;
  title: string;
  actionTitle: string;
}

const HeaderLinks = ({ action, title, actionTitle }: HeaderLinksType) => {
  return (
    <Pressable
      onPress={action}
      className="w-full flex-row items-center justify-between px-2 mb-1`"
    >
      <Text className="text-white font-medium capitalize ">{title}</Text>
      <View className="flex-row items-center gap-1">
        <Text className="text-[#fffa] capitalize">{actionTitle}</Text>
        <FontAwesome name="angle-right" size={18} color={"#fffa"} />
      </View>
    </Pressable>
  );
};

export default HeaderLinks;

const styles = StyleSheet.create({});
