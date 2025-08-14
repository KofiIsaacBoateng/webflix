import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet } from "react-native";

const SelectedIcon = ({ icon, name, color }: any) => {
  switch (icon) {
    case "fa":
      return (
        <FontAwesome
          name={name}
          size={28}
          color={color || "#fff"}
          style={{ overflow: "hidden" }}
        />
      );
    case "mci":
      return (
        <MaterialCommunityIcons
          name={name}
          size={28}
          color={color || "#fff"}
          style={{ overflow: "hidden" }}
        />
      );
    default:
      return (
        <Ionicons
          name={name}
          size={28}
          color={color || "#fff"}
          style={{ overflow: "hidden" }}
        />
      );
  }
};

const MaskedIcon = ({ icon, name }: { icon: string; name: string }) => {
  return (
    <MaskedView maskElement={<SelectedIcon name={name} icon={icon} />}>
      <LinearGradient
        colors={["deepskyblue", "lime"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <SelectedIcon name={name} icon={icon} color="transparent" />
    </MaskedView>
  );
};

export { MaskedIcon };

const styles = StyleSheet.create({});
