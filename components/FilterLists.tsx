import { FontAwesome5 } from "@expo/vector-icons";
import React, { PropsWithChildren } from "react";
import { Dimensions, FlatList, Pressable, Text, View } from "react-native";

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
}: FilterListsType) => {
  // const [data, setData] = useState<Data>({ movie: [], tv: [] });
  // const [loading, setLoading] = useState(false);

  return (
    <View className="flex-1">
      {/**** filter header */}
      <View className="px-4 flex-row gap-4 items-cneter">
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
      <FlatList
        data={[1]}
        renderItem={({ item, index }) => <></>}
        className="w-full"
        style={{ width }}
        keyExtractor={(_, index) => index.toString()}
      />
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

export default FilterLists;
