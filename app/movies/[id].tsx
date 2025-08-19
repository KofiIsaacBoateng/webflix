import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const Index = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text className="text-[5rem] font-bold">Movie id: {id}</Text>
    </View>
  );
};

export default Index;
