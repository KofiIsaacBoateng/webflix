import { filterAPI } from "@/api/api";
import { TMDB_BASE_IMAGE_PATH } from "@/utils/images";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { PropsWithChildren, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";

type QvF = { qv: string; title: string };

interface Filters {
  genre: QvF | undefined;
  country: QvF | undefined;
  year: QvF | undefined;
}

type FilterListsType = PropsWithChildren & {
  setActiveModal: (type: "genre" | "country" | "year") => void;
  selectedFilters: Filters;
  tab: "movie" | "tv";
  activeTab: "movie" | "tv";
};

interface FilterButtonTypes {
  setActiveModal: (type: "genre" | "country" | "year") => void;
  selectedFilters: Filters;
  type: "genre" | "country" | "year";
}

const { width } = Dimensions.get("screen");
const FilterLists = ({
  setActiveModal,
  selectedFilters,
  tab,
  activeTab,
}: FilterListsType) => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (reset: boolean = true) => {
    try {
      setLoading(true);
      const result = await filterAPI(
        selectedFilters.genre?.qv,
        selectedFilters.year?.qv,
        tab,
        selectedFilters.country?.qv,
        page
      );
      if (!reset) {
        setData((prev) => [...prev, ...result]);
        return;
      }
      setData(result);
    } catch (error) {
      console.log("filter api error: ", console.log(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // get data when tab changes for the first time
    if (activeTab !== tab) return;
    if (data.length > 0) return;

    fetchData();
    // eslint-disable-next-line
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== tab) return;
    fetchData();

    // eslint-disable-next-line
  }, [selectedFilters]);

  useEffect(() => {
    if (data.length === 0) return;
    fetchData(false);
    // eslint-disable-next-line
  }, [page]);

  return (
    <View className="flex-1" style={{ width }}>
      {/**** filter header */}
      <View className="px-3 flex-row gap-2 items-cneter pb-3">
        <FilterButton
          selectedFilters={selectedFilters}
          setActiveModal={setActiveModal}
          type="genre"
        />
        <FilterButton
          selectedFilters={selectedFilters}
          setActiveModal={setActiveModal}
          type="country"
        />
        <FilterButton
          selectedFilters={selectedFilters}
          setActiveModal={setActiveModal}
          type="year"
        />
      </View>
      {loading && data.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size={"small"} color={"lime"} />
        </View>
      ) : data.length >= 0 ? (
        <FlatList
          data={data}
          renderItem={({ item, index }) => <Card data={item} />}
          ListEmptyComponent={
            <View className="flex-1 h-[500px] items-center justify-center">
              <Text className="text-[#fffa] font-extralight">
                ---- No content ----
              </Text>
            </View>
          }
          ListFooterComponent={
            loading ? (
              <View className="py-3">
                <ActivityIndicator color="lime" size="small" />
              </View>
            ) : data.length >= 60 ? (
              <View className="py-3">
                <Text className="text-center text-[.9rem] text-[#fff8]">
                  ---- No content ----
                </Text>
              </View>
            ) : null
          }
          onEndReachedThreshold={0}
          onEndReached={({ distanceFromEnd }) => {
            if (data.length >= 60) return;

            setPage((prev) => prev + 1);
          }}
          className="flex-1"
          contentContainerClassName="px-1 pt-4 pb-5 gap-5"
          style={{ width }}
          numColumns={3}
          keyExtractor={(_, index) => index.toString()}
        />
      ) : activeTab !== tab ? (
        <View className="flex-1" />
      ) : (
        <Text className="text-white text-center font-bold text-[1.3rem]">
          Error
        </Text>
      )}
    </View>
  );
};

const FilterButton = ({
  setActiveModal,
  selectedFilters,
  type,
}: FilterButtonTypes) => {
  return (
    <Pressable
      onPress={() => setActiveModal(type)}
      style={{
        borderWidth: 1,
        backgroundColor: selectedFilters[type] ? "#fff5" : "transparent",
      }}
      className="rounded-full border-[#fffa] px-3 py-1 flex-row items-center gap-1"
    >
      <Text className="text-white capitalize">
        {selectedFilters[type] ? selectedFilters[type].title : type}
      </Text>
      <FontAwesome5 name="angle-down" size={18} color="#fffa" />
    </Pressable>
  );
};

const Card = ({ data }: { data: any }) => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.navigate(`/movies/${data.id}`)}
      className="gap-1 w-[110px] mx-1"
    >
      <Image
        source={{ uri: `${TMDB_BASE_IMAGE_PATH}w780${data.poster_path}` }}
        className="w-full h-[150px] rounded-md"
      />
      <Text className="text-white font-bold" numberOfLines={2}>
        {data.name || data.title}
      </Text>
    </Pressable>
  );
};

export default FilterLists;
