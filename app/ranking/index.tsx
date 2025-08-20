/* eslint-disable react-hooks/exhaustive-deps */

import { rankingFetch } from "@/api/api";
import { TMDB_BASE_IMAGE_PATH } from "@/utils/images";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height } = Dimensions.get("screen");
const navLists = [
  { name: "Toplists", id: "toplist" },
  { name: "Movie", id: "hollywood" },
  { name: "Western TV", id: "western" },
  { name: "Ghanaian", id: "gh" },
  { name: "K-Drama", id: "kDrama" },
  { name: "C-Drama", id: "cDrama" },
  { name: "Anime", id: "anime" },
  { name: "Bollywood", id: "bollywood" },
  { name: "Nollywood", id: "nollywood" },
  { name: "Animated Film", id: "animated" },
];

type navData = { name: string; id: string };
interface NavType {
  name: string;
  id: string;
  update: () => void;
  activeNav: navData;
}

const Index = () => {
  const { route } = useLocalSearchParams<{ route: string }>();
  const [activeNav, setActiveNav] = useState(navLists[Number(route) || 0]);
  const [ranks, setRanks] = useState({});
  const [page, setPage] = useState({
    toplist: 1,
    hollywood: 1,
    bollywood: 1,
    western: 1,
    gh: 1,
    kDrama: 1,
    cDrama: 1,
    anime: 1,
    animated: 1,
    nollywood: 1,
  });
  const [loading, setLoading] = useState(false);
  const { top, bottom } = useSafeAreaInsets();
  const router = useRouter();

  const update = (item: navData) => {
    setLoading(true);
    setActiveNav(item);
    setLoading(false);
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const func = rankingFetch[activeNav.id];
      const data = await func(page[activeNav.id]);
      setRanks((prev) => ({
        ...prev,
        [activeNav.id]: prev[activeNav.id]
          ? [...prev[activeNav.id], ...data]
          : data,
      }));
    } catch (error) {
      console.log("ranking error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ranks[activeNav.id]) return;

    fetchData();
  }, [activeNav]);

  useEffect(() => {
    if (!ranks[activeNav.id]) return;
    fetchData();
  }, [page]);

  return (
    <View className="flex-1 bg-[#101010]">
      {/*** Header */}
      <View
        style={{
          paddingTop: top + 10,
          paddingBottom: 10,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: "#fffa",
        }}
        className="flex-row items-center px-5"
      >
        <Pressable onPress={() => router.back()}>
          <FontAwesome name="angle-left" color="#fffc" size={30} />
        </Pressable>
        <Text className="text-white capitalize text-[1.3rem] font-semibold mx-auto">
          Ranking
        </Text>
      </View>

      {/***** main */}
      <View className="flex-1 flex-row">
        {/*** side bar */}
        <View className="w-1/4 h-full bg-[#212121]">
          {navLists.map((el, index) => (
            <NavElement
              key={el.id}
              {...el}
              update={() => update(el)}
              activeNav={activeNav}
            />
          ))}
        </View>
        {/**** contents */}
        <View className="flex-1 h-full">
          {loading && !ranks[activeNav.id] ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator color={"lime"} size="large" />
            </View>
          ) : ranks[activeNav.id]?.length > 0 ? (
            <FlatList
              data={ranks[activeNav.id]}
              ListHeaderComponent={
                <Text className="text-white font-bold uppercase">
                  {activeNav.name}
                </Text>
              }
              ListHeaderComponentStyle={{
                marginTop: 15,
                marginBottom: 5,
              }}
              ListFooterComponent={
                loading ? (
                  <View className="my-2">
                    <ActivityIndicator color="lime" size="small" />
                  </View>
                ) : ranks[activeNav.id].length >= 60 ? (
                  <Text className="text-center my-2 text-[.9rem] text-[#fff8]">
                    ---- No content ----
                  </Text>
                ) : null
              }
              contentContainerClassName="gap-3 px-3"
              style={{ marginBottom: bottom + 5 }}
              showsVerticalScrollIndicator={false}
              onEndReached={({ distanceFromEnd }) => {
                if (ranks[activeNav.id]?.length >= 60) return;
                // if (distanceFromEnd < 310) return;
                setPage((prev) => ({
                  ...prev,
                  [activeNav.id]: prev[activeNav.id] + 1,
                }));
              }}
              onEndReachedThreshold={0}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => <Card data={item} />}
            />
          ) : (
            <></>
          )}
        </View>
      </View>
    </View>
  );
};

const NavElement = ({ id, name, update, activeNav }: NavType) => {
  const isActive = activeNav.id === id;
  return (
    <Pressable
      onPress={update}
      style={{ backgroundColor: isActive ? "#101010" : "transparent" }}
      className="flex-row items-center py-5"
    >
      {isActive && <View className="w-[3px] h-5 bg-[#0f09] rounded-full" />}
      <Text
        style={{ color: isActive ? "#00ff0099" : "#fffc" }}
        className={`font-medium ml-4`}
      >
        {name}
      </Text>
    </Pressable>
  );
};

const Card = ({ data }: { data: any }) => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.navigate(`./movies/${data.id}`)}
      className="flex-row gap-2 py-2"
    >
      <View className="w-[80px] h-[110px]">
        <Image
          source={{ uri: `${TMDB_BASE_IMAGE_PATH}w500${data.poster_path}` }}
          className="w-full h-full rounded-md"
        />
      </View>
      <View className=" flex-1 justify-between">
        <Text
          className="text-[#fffc] font-semibold text-[1.2rem]"
          numberOfLines={1}
        >
          {data.name || data.title}
        </Text>
        <View className="flex-row items-end justify-between">
          <View className="flex-row gap-1 items-center">
            <FontAwesome name="star" size={10} color="goldenrod" />
            <Text className="font-extrabold text-[goldenrod] text-[1rem]">
              {data.vote_average.toFixed(1)}
            </Text>
          </View>
          <Pressable className="flex-row items-center gap-1 px-4 py-1 rounded-md overflow-hidden">
            <LinearGradient
              colors={["#04428e", "#08bb7f", "#08bb7f"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="absolute top-0 bottom-0 left-0 right-0"
            />
            <FontAwesome5 name="angle-down" size={20} color="#fffc" />
            <Text className="text-[#fffc] font-extrabold ">Checkout</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export default Index;
