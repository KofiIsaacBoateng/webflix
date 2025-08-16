import Categories from "@/components/Categories";
import Header from "@/components/Header";
import { Hollywood, TrendNow } from "@/components/Recommendations";
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
      </ScrollView>
    </>
  );
};

export default index;
