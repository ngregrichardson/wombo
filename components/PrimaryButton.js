import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const PrimaryButton = ({ label, onPress, style }) => {
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      onPress={onPress}
      style={style}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      <View style={[styles.button, styles.buttonBackground]}>
        <Text style={styles.label}>{label}</Text>
        <View
          style={[
            styles.button,
            styles.buttonForeground,
            pressed ? styles.buttonPressed : null,
          ]}
        >
          {typeof label === "string" ? (
            <Text style={styles.label}>{label}</Text>
          ) : (
            label
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 5,
    borderColor: "#000",
    borderRadius: 15,
    width: "100%",
    paddingVertical: 15,
    alignItems: "center",
  },
  buttonBackground: {
    backgroundColor: "#DE924A",
  },
  buttonForeground: {
    backgroundColor: "#F3C224",
    position: "absolute",
    top: -13,
    left: -3,
  },
  buttonPressed: {
    top: -5,
    left: 0,
    right: 0,
    bottom: -5,
  },
  label: {
    color: "#000",
    fontFamily: "IBMPlexBold",
    fontSize: 16,
  },
});

export default PrimaryButton;

export { styles };
