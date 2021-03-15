import React from "react";
import { Image, StyleSheet, View } from "react-native";
import logo from "../assets/wombo.png";
import PrimaryButton from "../components/PrimaryButton";

const Welcome = ({ navigation }) => (
  <View style={styles.root}>
    <Image source={logo} style={styles.logo} />
    <PrimaryButton
      label={"Let's go!"}
      style={styles.continueButton}
      onPress={() => navigation.push("photo")}
    />
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
  },
  logo: {
    width: "70%",
    resizeMode: "contain",
    flex: 1,
  },
  continueButton: {
    width: "75%",
    marginVertical: 85,
  },
});

export default Welcome;
