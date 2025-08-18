import { MaskedIcon } from "@/components/Icons";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const RootLayout = () => {
  return (
    <Tabs
      screenOptions={{
        header: () => null,
        tabBarInactiveTintColor: "#fffa",
        tabBarActiveTintColor: "#fffd",
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#212121",
          height: "auto",
          paddingTop: 5,
          borderTopWidth: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarLabelStyle: { fontSize: 9, textAlign: "center" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaskedIcon icon="mci" name="home-lightning-bolt" />
            ) : (
              <MaterialCommunityIcons
                name="home-lightning-bolt-outline"
                size={22}
                color="#fffa"
              />
            ),
        }}
      />
      <Tabs.Screen
        name="music"
        options={{
          title: "Music",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaskedIcon icon="ion" name="musical-notes" />
            ) : (
              <Ionicons name="musical-notes-outline" size={22} color="#fffa" />
            ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: "Bookmarks",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaskedIcon icon="fa" name="bookmark" />
            ) : (
              <FontAwesome name="bookmark-o" size={22} color="#fffa" />
            ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Me",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaskedIcon icon="ion" name="person" />
            ) : (
              <Ionicons name="person-outline" size={22} color="#fffa" />
            ),
        }}
      />
    </Tabs>
  );
};

export default RootLayout;
