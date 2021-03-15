import React from "react";
import { StyleSheet, View, Text } from "react-native";
import TouchableScale from "./TouchableScale";

const WomboButton = ({ onPress, style }) => (
  <TouchableScale onPress={onPress} style={[styles.button, style]}>
    <View style={styles.innerButton}>
      <Text style={styles.womboText}>W</Text>
    </View>
  </TouchableScale>
);

const styles = StyleSheet.create({
  button: {
    borderColor: "#1ADE21",
    borderWidth: 5,
    borderRadius: 500,
    width: 100,
    aspectRatio: 1,
    padding: 3,
  },
  innerButton: {
    backgroundColor: "#1ADE21",
    width: "100%",
    height: "100%",
    borderRadius: 500,
    alignItems: "center",
    justifyContent: "center",
  },
  womboText: {
    color: "#fff",
    fontFamily: "YeyeyRegular",
    fontSize: 40,
  },
});

export default WomboButton;
