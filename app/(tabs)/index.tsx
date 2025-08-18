import Categories from "@/components/Categories";
import Header from "@/components/Header";
import {
  Action,
  Adventure,
  Anime,
  Bollywood,
  CDrama,
  Ghanaian,
  Hollywood,
  Horror,
  KDrama,
  NollyWood,
  TrendNow,
  WesternTV,
  YAF,
} from "@/components/Recommendations";
import Trending from "@/components/Trending";
import React from "react";
import { FlatList, View } from "react-native";

const index = () => {
  return (
    <View className="flex-1 bg-[#101010]">
      <Header />
      <FlatList
        data={[1]}
        renderItem={({ index }) => (
          <>
            <Trending />
            <Categories />
            <TrendNow />
            <Hollywood />
            <YAF />
            <WesternTV />
            <Anime />
            <Ghanaian />
            <Bollywood />
            <NollyWood />
            <KDrama />
            <CDrama />
            <Action />
            <Horror />
            <Adventure />
          </>
        )}
        showsVerticalScrollIndicator={false}
        className="flex-1 w-full z-10"
        contentContainerClassName="gap-2 pb-[100px]"
        scrollEventThrottle={1}
        keyExtractor={(_, index) => index.toString()}
      />

      {/* <Image
        source={logo}
        className="absolute bottom-0 left-0 w-1/5 h-[120px]"
        blurRadius={50}
      /> */}
    </View>
  );
};

export default index;
