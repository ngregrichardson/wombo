import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import TouchableScale from "../components/TouchableScale";

const About = ({ navigation }) => (
  <View style={styles.root}>
    <Text style={styles.title}>WHAT IS WOMBO?</Text>
    <Text style={styles.text}>
      WOMBO is the world's best AI-powered lip sync app.
    </Text>
    <Text style={styles.text}>
      Take a selfie, pick a song, and let WOMBO's powerful deepfake AI handle
      the rest.
    </Text>
    <Text style={styles.text}>
      If you have an questions, issues or ideas, reach out to us at{" "}
      <Text
        style={[styles.text, styles.link]}
        onPress={() => Linking.openURL("mailto:hello@wombo.ai")}
      >
        hello@wombo.ai
      </Text>
    </Text>
    <Text
      style={[styles.text, styles.link]}
      onPress={() => Linking.openURL("https://wombo.ai/privacy")}
    >
      View our Privacy Policy
    </Text>
    <View style={styles.socialButtonsContainer}>
      <TouchableScale
        onPress={() => Linking.openURL("https://discord.gg/SXF2MJ8T6t")}
      >
        <FontAwesome5 name={"discord"} size={40} color={"#7389DA"} />
      </TouchableScale>
      <TouchableScale
        onPress={() => Linking.openURL("https://twitter.com/WOMBO")}
      >
        <FontAwesome5 name={"twitter"} size={40} color={"#1C9BF1"} />
      </TouchableScale>
      <TouchableScale
        onPress={() => Linking.openURL("https://instagram.com/WOMBO.ai")}
      >
        <FontAwesome5 name={"instagram"} size={40} color={"#ffffff"} />
      </TouchableScale>
      <TouchableScale
        onPress={() => Linking.openURL("https://facebook.com/WOMBOai")}
      >
        <FontAwesome5 name={"facebook"} size={40} color={"#1776F2"} />
      </TouchableScale>
    </View>
    <PrimaryButton
      label={"Go Back"}
      style={styles.continueButton}
      onPress={navigation.goBack}
    />
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  title: {
    fontSize: 20,
    color: "white",
    marginBottom: 20,
    fontFamily: "YeyeyRegular",
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "white",
    fontFamily: "IBMPlex",
  },
  link: {
    textDecorationLine: "underline",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  continueButton: {
    width: "100%",
  },
});

export default About;
