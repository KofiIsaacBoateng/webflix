import Header from "@/components/Header";
import React from "react";
import { StyleSheet, View } from "react-native";

const index = () => {
  return (
    <View className="flex-1">
      <Header />
      <View className="flex-1 bg-[#000]"></View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
