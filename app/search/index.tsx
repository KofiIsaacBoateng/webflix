import { searchAPI } from "@/api/api";
import genre from "@/api/genre";
import { TMDB_BASE_IMAGE_PATH } from "@/utils/images";
import {
  AntDesign,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Index = () => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const [input, setInput] = useState("");
  const [data, setData] = useState<any[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const updateInput = (text: string) => {
    setInput(text);
  };

  const fetchData = async (term?: string) => {
    try {
      setLoading(true);
      if (term) updateInput(term);
      const results = await searchAPI(term || input);
      setData(results);
    } catch (error) {
      console.log("Error fetching search data: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ paddingTop: top + 5 }} className="flex-1 bg-[#101010]">
      {/***** header */}
      <View
        style={{ borderBottomWidth: StyleSheet.hairlineWidth }}
        className="flex-row items-center gap-4 px-5 pb-2 border-b-[#fff5]"
      >
        <Pressable onPress={() => router.back()}>
          <FontAwesome name="angle-left" size={30} color="#fff" />
        </Pressable>
        <View className="flex-1 flex-row items-center pl-5 pr-2 rounded-md bg-[#fff3]">
          <Feather name="search" size={15} color="#fffc" />
          <TextInput
            autoFocus
            onFocus={() => setData(undefined)}
            inputMode="search"
            returnKeyLabel="Search"
            returnKeyType="search"
            value={input}
            onChangeText={updateInput}
            onSubmitEditing={(e) => fetchData()}
            placeholder="Stranger things"
            className="text-[#fff] text-[.9rem] font-light py-2 flex-1 mr-2"
            cursorColor="lime"
            placeholderTextColor="#fff5"
          />
          {data && (
            <Pressable
              onPress={() => {
                setInput("");
                setData(undefined);
              }}
              className="ml-auto"
            >
              <Ionicons name="close-circle-sharp" size={18} color="#fffa" />
            </Pressable>
          )}

          {!data && (
            <Pressable
              disabled={input.length === 0}
              onPress={() => fetchData()}
              className="ml-auto mr-2"
            >
              <Text className="text-[lime] capitalize font-light">Search</Text>
            </Pressable>
          )}
        </View>
      </View>
      {input.length === 0 ? (
        <View className="flex-1">
          {/**** recent search items */}
          <View className="gap-2 px-3 py-3">
            <View className="flex-row items-center justify-between">
              <Text className="font-light text-[#fffc] text-[1.1rem]">
                Recents
              </Text>
              <Pressable
                onPress={() => null}
                className="flex-row items-center gap-1"
              >
                <Feather name="trash-2" color="#fffc" size={15} />
                <Text className="text-[#fffc] font-light text-[.9rem]">
                  Clear
                </Text>
              </Pressable>
            </View>
            <View className="flex-row flex-wrap gap-3 items-center">
              <SearchTerms title="Snowfall" action={fetchData} />
              <SearchTerms
                title="Mission Impossible: The final reconing"
                action={fetchData}
              />
              <SearchTerms title="Dexter" action={fetchData} />
              <SearchTerms title="Stranger things" action={fetchData} />
              <SearchTerms title="Superman" action={fetchData} />
              <SearchTerms title="F1" action={fetchData} />
            </View>
          </View>

          {/**** what everyone is searching */}
          <View className="gap-2 px-3 mt-5">
            <Text className="font-bold text-[#fff] text-[1.3rem]">
              🔥 Everyone is searching...
            </Text>
            <View className="flex-row flex-wrap gap-3 items-center">
              <SearchTerms title="Snowfall" action={fetchData} />
              <SearchTerms
                title="Mission Impossible: The final reconing"
                action={fetchData}
              />
              <SearchTerms title="Dexter" action={fetchData} />
              <SearchTerms title="Stranger things" action={fetchData} />
              <SearchTerms title="Superman" action={fetchData} />
              <SearchTerms title="F1" action={fetchData} />
            </View>
          </View>
        </View>
      ) : !data && !loading && input.length > 0 ? (
        <RecommendationList action={fetchData} input={input} />
      ) : (
        <View className="flex-1">
          {loading && (
            <View className="absolute top-0 left-0 bottom-1/2 right-0 bg-transparent items-center justify-center">
              <ActivityIndicator size="small" color="lime" />
            </View>
          )}

          <FlatList
            data={data || []}
            renderItem={({ item, index }) => <Card data={item} />}
            className="mt-5"
            contentContainerClassName="px-3 gap-5 pb-5"
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
};

const SearchTerms = ({
  action,
  title,
}: {
  action: (title: string) => void;
  title: string;
}) => {
  return (
    <Pressable
      onPress={() => action(title)}
      className="bg-[#fff1] px-3 py-2 rounded-[4px] max-w-[150px]"
    >
      <Text className="text-[#fffc]  text-[.9rem]" numberOfLines={1}>
        {title}
      </Text>
    </Pressable>
  );
};

const RecommendationList = ({
  input,
  action,
}: {
  input: string;
  action: (term: string) => void;
}) => {
  const [data, setData] = useState<{ match: string; rest: string }[] | []>([]);
  const [loading, setLoading] = useState(false);

  // get title recommendations
  const fetchList = async () => {
    try {
      setLoading(true);
      let result = await searchAPI(input);
      result = result.map(
        (item: any, index: number) => item.title || item.name
      );
      let startsWith = result
        .filter((title: string) => title.startsWith(input))
        .filter(
          (title: string, index: number, self: string[]) =>
            self.indexOf(title) === index
        );
      if (startsWith.length > 0) {
        result = startsWith.map((item: string) => {
          return {
            match: item.slice(0, item.indexOf(input.slice(-1)) + 1),
            rest: item.slice(item.indexOf(input.slice(-1)) + 1),
          };
        });
      } else {
        result = result.map((item: string) => ({ match: "", rest: item }));
      }
      setData(result);
    } catch (error) {
      console.log("error in search term list: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(fetchList, 2000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [input]);

  return (
    <View className="relative flex-1">
      <FlatList
        data={data}
        className="flex-1 pt-3 px-3"
        contentContainerClassName="gap-3 pb-3"
        renderItem={({ item }) => (
          <RecommendationItem match={item} action={action} />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      {loading && (
        <View className="absolute top-0 left-0 bottom-1/2 right-0 bg-transparent items-center justify-center">
          <ActivityIndicator size="small" color="lime" />
        </View>
      )}
    </View>
  );
};

const RecommendationItem = ({
  match: { match, rest },
  action,
}: {
  match: { match: string; rest: string };
  action: (term: string) => void;
}) => {
  return (
    <Pressable
      onPress={() => action(match + rest)}
      className="flex-row items-center py-3"
    >
      <Feather name="search" size={15} color="#fff8" className="mr-3" />
      <Text className="text-[#00ff0075] font-medium text-[1.1rem]">
        {match.toLowerCase()}
      </Text>
      <Text className="text-[#fffa] font-medium text-[1.1rem]">
        {rest.toLowerCase()}
      </Text>
    </Pressable>
  );
};

const Card = ({ data }: { data: any }) => {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.navigate(`/movies/${data.id}`)}>
      <View className="flex-row gap-2">
        <Image
          source={{ uri: `${TMDB_BASE_IMAGE_PATH}w500${data.poster_path}` }}
          className="w-1/5 h-[100px] rounded-md "
        />
        <View className="flex-1 self-center gap-3">
          <Text
            className="text-white font-medium text-[1.3rem]"
            numberOfLines={1}
          >
            {data.title || data.name}
          </Text>
          <View className="flex-row items-center gap-2 w-full">
            {data.media_type === "movie" ? (
              <>
                <MaterialCommunityIcons
                  name="movie-check"
                  size={12}
                  color="#fff"
                />
                <View className="w-[1px] h-3 bg-[#fffa]" />
              </>
            ) : data.media_type === "tv" ? (
              <>
                <Feather name="tv" size={12} color={"#fff"} />
                <View className="w-[1px] h-3 bg-[#fffa]" />
              </>
            ) : (
              <></>
            )}
            {data.vote_average && (
              <>
                <View className="flex-row items-center gap-1">
                  <AntDesign name="star" color="goldenrod" size={12} />
                  <Text className="text-[#fff] font-semibold text-[.9rem]">
                    {data.vote_average.toFixed(1)}
                  </Text>
                </View>
                <View className="w-[1px] h-3 bg-[#fffa]" />
              </>
            )}
            {(data.first_air_date || data.release_date) && (
              <>
                <Text className="text-[#fff] text-[.9rem] font-semibold">
                  {data.first_air_date?.split("-")[0] ||
                    data.release_date?.split("-")[0]}
                </Text>
              </>
            )}
            {data.genre_ids?.length > 0 && (
              <>
                <View className="w-[1px] h-3 bg-[#fffa]" />
                <Text className="text-[#fff] text-[.9rem] capitalize font-semibold">
                  {genre[data.genre_ids[0]]}
                </Text>
              </>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default Index;
