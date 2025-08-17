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
import { ScrollView } from "react-native";

const index = () => {
  return (
    <>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 w-full bg-[#010101]"
        contentContainerClassName="gap-2 pb-[100px]"
        scrollEventThrottle={1}
      >
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
      </ScrollView>
    </>
  );
};

export default index;
