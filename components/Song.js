import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import TouchableScale from "./TouchableScale";

const Song = ({
  id,
  title,
  artist,
  isNew,
  startGradient,
  endGradient,
  isPlaying,
  isSelected,
  onToggleIsSelected,
  onToggleIsPlaying,
}) => (
  <TouchableScale style={styles.root} onPress={() => onToggleIsSelected(id)}>
    <LinearGradient
      colors={[startGradient, endGradient]}
      style={styles.gradient}
      start={[0, 0]}
      end={[1, 1]}
    >
      <Pressable
        onPress={() => onToggleIsPlaying(id)}
        style={styles.playButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <MaterialIcons
          name={isPlaying ? "pause" : "play-arrow"}
          size={60}
          color={"#000"}
          style={styles.translucentButton}
        />
      </Pressable>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.artist}>{artist}</Text>
      </View>
      <MaterialIcons
        name={isPlaying ? "pause" : "play-arrow"}
        size={60}
        color={"#000"}
        style={styles.hiddenButton}
      />
      {isNew ? (
        <View style={styles.newContainer}>
          <Text style={styles.newText}>New</Text>
        </View>
      ) : null}
      {isSelected ? (
        <View pointerEvents={"none"} style={styles.selectedGradient} />
      ) : null}
    </LinearGradient>
  </TouchableScale>
);

const styles = StyleSheet.create({
  root: { width: "100%" },
  gradient: {
    width: "100%",
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    minHeight: 115,
  },
  selectedGradient: {
    position: "absolute",
    borderWidth: 3,
    borderColor: "#1ADE21",
    borderRadius: 15,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  playButton: {
    justifyContent: "center",
    flex: 1,
  },
  infoContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: "YeyeyRegular",
    color: "#fff",
    textAlign: "center",
    textTransform: "uppercase",
  },
  artist: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    fontFamily: "IBMPlex",
  },
  translucentButton: { opacity: 0.5 },
  hiddenButton: {
    opacity: 0,
    flex: 1,
  },
  newContainer: {
    position: "absolute",
    top: 15,
    right: 15,
    borderRadius: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  newText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 12,
    fontFamily: "IBMPlex",
  },
});

export default Song;
