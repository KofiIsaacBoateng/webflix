import { fetchTrending, searchAPI } from "@/api/api";
import genre from "@/api/genre";
import useFetch from "@/hooks/useFetch";
import { TMDB_BASE_IMAGE_PATH } from "@/utils/images";
import {
  AntDesign,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
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
  const [recents, setRecents] = useState<string[] | []>([]);
  const [showClearWarning, setShowClearWarning] = useState(false);
  const { data: searchRecommendations } = useFetch(() => fetchTrending("day"));

  const updateInput = (text: string) => {
    setInput(text);
  };

  const fetchData = async (term?: string) => {
    let text: string;
    if (term) {
      updateInput(term);
      text = term;
    } else {
      text = input;
    }
    try {
      setLoading(true);
      const results = await searchAPI(text);
      setData(results);
    } catch (error) {
      console.log("Error fetching search data: ", error);
    } finally {
      await AsyncStorage.setItem("recents", JSON.stringify([text, ...recents]));
      setRecents((prev) => [text, ...prev]);
      setLoading(false);
    }
  };

  const clearRecents = async (clear = false) => {
    if (!clear) {
      setShowClearWarning(true);
      return;
    }

    setShowClearWarning(false);
    await AsyncStorage.removeItem("recents");
    setRecents([]);
  };

  useEffect(() => {
    (async () => {
      let results = await AsyncStorage.getItem("recents");
      if (results) {
        setRecents(JSON.parse(results));
        return;
      }

      setRecents([]);
    })();
  }, []);

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
          {recents.length > 0 && (
            <View className="gap-2 px-3 py-3">
              <View className="flex-row items-center justify-between">
                <Text className="font-light text-[#fffc] text-[1.1rem]">
                  Recents
                </Text>
                <Pressable
                  onPress={() => clearRecents()}
                  className="flex-row items-center gap-1"
                >
                  <Feather name="trash-2" color="#fffc" size={15} />
                  <Text className="text-[#fffc] font-light text-[.9rem]">
                    Clear
                  </Text>
                </Pressable>
              </View>
              <View className="flex-row flex-wrap gap-3 items-center">
                {recents.map((item: string, index) => (
                  <SearchTerms
                    key={index.toString()}
                    title={item}
                    action={fetchData}
                  />
                ))}
              </View>
            </View>
          )}
          {/**** clear recents warning modal */}
          <Modal
            animationType="fade"
            statusBarTranslucent
            navigationBarTranslucent
            transparent
            visible={showClearWarning}
            onRequestClose={() => null}
          >
            <View className="flex-1 px-10 justify-center bg-[#0000]">
              <View className="bg-[#313131] px-5 py-6 rounded-md">
                <Text className="text-white font-extrabold text-[1.2rem] text-center">
                  Clear all recent searches ?
                </Text>
                <Text className="text-[#fffc] mt-2 font-semibold text-center">
                  This act can't be undone, and you'll remove all your recent
                  searches!
                </Text>
                <View className="flex-row justify-center gap-3 mt-8">
                  <Pressable
                    onPress={() => setShowClearWarning(false)}
                    className="min-w-[100px] items-center py-3 rounded-lg bg-[#fefefe33]"
                  >
                    <Text className="font-bold text-white">cancel</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => clearRecents(true)}
                    className="min-w-[110px] items-center py-3 rounded-lg bg-[#10101088]"
                  >
                    <Text className="font-bold text-white">clear</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>

          {/**** what everyone is searching */}
          <View className="gap-2 px-3 mt-5">
            <Text className="font-bold text-[#fff] text-[1.3rem]">
              🔥 Everyone is searching...
            </Text>
            <View className="flex-row flex-wrap gap-3 items-center">
              {searchRecommendations &&
                searchRecommendations.map((data, index) => (
                  <SearchTerms
                    key={index.toString()}
                    title={data.name}
                    action={fetchData}
                  />
                ))}
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
            ListEmptyComponent={
              <View className="flex-1 h-[500px] items-center justify-center">
                <Text className="text-[#fffa] font-extralight">
                  ---- No content ----
                </Text>
              </View>
            }
            ListFooterComponent={
              loading && data && data.length > 0 ? (
                <View className="py-3">
                  <ActivityIndicator color="lime" size="small" />
                </View>
              ) : (data?.length ?? 0) >= 100 ? (
                <View className="py-3">
                  <Text className="text-center text-[.9rem] text-[#fff8]">
                    ---- No content ----
                  </Text>
                </View>
              ) : null
            }
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
  const [data, setData] = useState<
    { match: string; rest: string }[] | undefined
  >(undefined);
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
    const timeout = setTimeout(fetchList, 1000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [input]);

  return (
    <View className="relative flex-1">
      {data && (
        <FlatList
          data={data}
          className="flex-1 pt-3 px-3"
          contentContainerClassName="gap-3 pb-3"
          renderItem={({ item }) => (
            <RecommendationItem match={item} action={action} />
          )}
          ListEmptyComponent={
            <View>
              {!loading && (
                <View className="flex-1 h-[500px] items-center justify-center">
                  <Text className="text-[#fffa] font-extralight">
                    ---- No match found ----
                  </Text>
                </View>
              )}
            </View>
          }
          keyExtractor={(_, index) => index.toString()}
        />
      )}
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
    <View>
      <View className="flex-row gap-2">
        <Image
          source={{ uri: `${TMDB_BASE_IMAGE_PATH}w500${data.poster_path}` }}
          className="w-1/5 h-[100px] rounded-md"
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
            {data.vote_average ? (
              <View className="flex-row items-center gap-1">
                <AntDesign name="star" color="goldenrod" size={12} />
                <Text className="text-[#fff] font-semibold text-[.9rem]">
                  {data.vote_average.toFixed(1)}
                </Text>
                <View className="w-[1px] h-3 bg-[#fffa]" />
              </View>
            ) : (
              <></>
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

        <Pressable
          onPress={() => router.navigate(`/movies/${data.id}`)}
          className="rounded-full w-10 h-10 items-center justify-center bg-[#fffc] self-center"
        >
          <FontAwesome name="angle-right" size={18} color="#555" />
        </Pressable>
      </View>
    </View>
  );
};

export default Index;
