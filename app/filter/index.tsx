import FilterLists from "@/components/FilterLists";
import { countryFilter, genreFilter, yearFilter } from "@/utils/filter";
import { Feather, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const { width } = Dimensions.get("screen");
type QvF = { qv: string; title: string };

interface Filters {
  genre: QvF | undefined;
  country: QvF | undefined;
  year: QvF | undefined;
}

interface SelectedFiltersType {
  movie: Filters;
  tv: Filters;
}

const Index = () => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const scrollRef = useRef<FlatList>(null);
  const { title, qv, type } = useLocalSearchParams<
    QvF & { type: "movie" | "tv" }
  >();
  const [activeTab, setActiveTab] = useState<"movie" | "tv">(type);
  const [activeModal, setActiveModal] = useState<
    "genre" | "country" | "year" | null
  >(null);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFiltersType>({
    tv: {
      genre: undefined,
      country: title ? { title, qv } : undefined,
      year: undefined,
    },
    movie: {
      genre: undefined,
      country: title ? { title, qv } : undefined,
      year: undefined,
    },
  });

  const handleOnMomentumScrollEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const activeIndex = Math.round(offsetX / width);
    if (activeIndex === 0) {
      setActiveTab("movie");
    } else {
      setActiveTab("tv");
    }
  };

  const updateTab = (tab: "movie" | "tv") => {
    setActiveTab(tab);
    if (tab === "movie") {
      scrollRef.current?.scrollToIndex({ index: 0, animated: true });
      return;
    }

    scrollRef.current?.scrollToIndex({ index: 1, animated: true });
  };

  useEffect(() => {
    updateTab(type);
  }, [type]);

  return (
    <View className="flex-1 bg-[#101010]">
      {/***** header */}
      <View className="h-[15%]" style={{ paddingTop: top + 10 }}>
        {/**** header header */}
        <View
          style={{ borderBottomWidth: StyleSheet.hairlineWidth }}
          className="flex-row items-center justify-between px-3 pb-3 border-b-[#fff8]"
        >
          <Pressable onPress={() => router.back()}>
            <FontAwesome5 name="angle-left" color="#fffc" size={24} />
          </Pressable>
          <Text className="text-center text-[#fffd] font-bold text-[1.2rem]">
            Filter
          </Text>
          <Pressable onPress={() => router.navigate("/search")}>
            <Feather name="search" color="#fffc" size={18} />
          </Pressable>
        </View>

        {/***** header tabs */}
        <View className="flex-row gap-4 pt-3 pl-3">
          <Pressable
            onPress={() => updateTab("movie")}
            className="items-center"
          >
            <Text style={{ color: activeTab === "movie" ? "#fff" : "#fffa" }}>
              Movie
            </Text>
            {activeTab === "movie" && (
              <View className="w-7 h-1 rounded-full bg-[#fff]" />
            )}
          </Pressable>
          <Pressable onPress={() => updateTab("tv")} className="items-center">
            <Text style={{ color: activeTab === "tv" ? "#fff" : "#fffa" }}>
              TV/Series
            </Text>
            {activeTab === "tv" && (
              <View className="w-7 h-1 rounded-full bg-[#fff]" />
            )}
          </Pressable>
        </View>

        {/**** modal filter */}
        {activeModal && (
          <ModalContent
            activeModal={activeModal}
            closeModal={() => setActiveModal(null)}
            selectedFilter={selectedFilters[activeTab][activeModal]}
            action={(filter) =>
              setSelectedFilters((prev) => ({
                ...prev,
                [activeTab]: { ...prev[activeTab], [activeModal]: filter },
              }))
            }
            filters={
              activeModal === "genre"
                ? genreFilter
                : activeModal === "country"
                ? countryFilter
                : yearFilter
            }
          />
        )}
      </View>

      {/**** data */}
      <FlatList
        ref={scrollRef}
        data={["movie", "tv"]}
        renderItem={({ item }: { item: "movie" | "tv" }) => (
          <FilterLists
            setActiveModal={(type) => setActiveModal(type)}
            selectedFilters={selectedFilters[item]}
            activeTab={activeTab}
            tab={item}
          />
        )}
        horizontal
        pagingEnabled
        getItemLayout={(_, index) => ({
          length: width * 2,
          offset: width * index,
          index,
        })}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => handleOnMomentumScrollEnd(e)}
        keyExtractor={(_, index) => index.toString()}
        className="flex-1 w-ful"
      />
    </View>
  );
};

type ModalViewType = PropsWithChildren & {
  activeModal: string | null;
  closeModal: () => void;
  selectedFilter: QvF | undefined;
};

const ModalView = ({
  children,
  activeModal,
  closeModal,
  selectedFilter,
}: ModalViewType) => {
  const { top } = useSafeAreaInsets();
  return (
    <Modal
      animationType="fade"
      statusBarTranslucent
      navigationBarTranslucent
      backdropColor="#000c"
      visible={activeModal ? true : false}
      onRequestClose={closeModal}
    >
      <View className="flex-1" style={{ paddingTop: top + 10 }}>
        <View
          className="flex-row items-center justify-between border-b-[#fff9] pb-3 px-3"
          style={{ borderBottomWidth: StyleSheet.hairlineWidth }}
        >
          <Text className="font-bold uppercase text-[1.2rem] text-[#fff]">
            {selectedFilter?.title || ""}
          </Text>
          <Pressable onPress={closeModal}>
            <FontAwesome name="close" color="#fff" size={24} />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  );
};

const ModalContent = ({
  children,
  activeModal,
  closeModal,
  action,
  filters,
  selectedFilter,
}: ModalViewType & {
  action: (filter: { qv: string; title: string } | undefined) => void;
  filters: { qv: string; title: string }[];
}) => {
  const handleItemPress = (
    filter: { qv: string; title: string } | undefined
  ) => {
    action(filter);
    closeModal();
  };
  return (
    <ModalView
      selectedFilter={selectedFilter}
      closeModal={closeModal}
      activeModal={activeModal}
    >
      <ScrollView className="mt-3" contentContainerClassName="gap-3 pb-5 px-3">
        <Pressable onPress={() => handleItemPress(undefined)}>
          <Text className="text-[#fffc] text-[1.3rem]" numberOfLines={1}>
            All
          </Text>
        </Pressable>
        {filters.map((filter, index) => (
          <Pressable
            onPress={() => handleItemPress(filter)}
            key={index}
            className="mb-5"
          >
            <Text className="text-[#fffc] text-[1.3rem]" numberOfLines={1}>
              {filter.title}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </ModalView>
  );
};

export default Index;
