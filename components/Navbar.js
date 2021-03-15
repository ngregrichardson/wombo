import React from "react";
import { Image, StyleSheet, View } from "react-native";
import TouchableScale from "./TouchableScale";
import { MaterialIcons } from "@expo/vector-icons";
import logo from "../assets/wombo.png";

const hitSlopRect = { left: 10, right: 10, bottom: 10, top: 10 };

const Navbar = ({ navigation }) => {
  return (
    <View style={styles.root}>
      <TouchableScale onPress={navigation.goBack} hitSlop={hitSlopRect}>
        <MaterialIcons name={"chevron-left"} size={35} color={"white"} />
      </TouchableScale>
      <Image source={logo} style={styles.logo} />
      <TouchableScale
        onPress={() => navigation.push("about")}
        hitSlop={hitSlopRect}
      >
        <MaterialIcons name={"help-outline"} size={35} color={"white"} />
      </TouchableScale>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    width: "100%",
  },
  logo: {
    width: "40%",
    resizeMode: "contain",
  },
});

export default Navbar;
