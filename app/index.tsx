import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-5xl text-blue-700 font-bold capitalize tracking-[.4rem]">
        Let's get started
      </Text>
    </View>
  );
}
