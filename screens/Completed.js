import { MaterialIcons } from "@expo/vector-icons";
import { Video } from "expo-av";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Navbar from "../components/Navbar";
import PrimaryButton, {
  styles as primaryButtonStyles,
} from "../components/PrimaryButton";

const Completed = ({ navigation, route }) => {
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    const { granted } = await MediaLibrary.requestPermissionsAsync(true);

    if (granted) {
      MediaLibrary.saveToLibraryAsync(route.params.video.uri)
        .then(() => setSaved(true))
        .catch((e) => console.error(e));
    } else {
      console.error("Blocked permissions");
    }
  };

  const handleShare = () => {
    Sharing.shareAsync(route.params.video.uri);
  };

  return (
    <>
      <View style={styles.root}>
        <Navbar navigation={navigation} />
        <View style={styles.videoContainer}>
          <Video
            style={styles.video}
            source={{
              uri: route.params.video.uri,
            }}
            shouldPlay
            useNativeControls={false}
            isLooping
            resizeMode={"contain"}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.inlineButtonsContainer}>
            <PrimaryButton
              label={
                <View style={styles.inlineButtonText}>
                  <MaterialIcons
                    name={"arrow-back"}
                    color={"#000"}
                    size={25}
                    style={styles.inlineButtonIcon}
                  />
                  <Text style={primaryButtonStyles.label}>Again</Text>
                </View>
              }
              onPress={navigation.goBack}
              style={styles.inlineButton}
            />
            <View style={styles.inlineButtonDivider} />
            <PrimaryButton
              label={
                <View style={styles.inlineButtonText}>
                  <MaterialIcons
                    name={"file-download"}
                    color={"#000"}
                    size={25}
                    style={styles.inlineButtonIcon}
                  />
                  <Text style={primaryButtonStyles.label}>Save</Text>
                </View>
              }
              onPress={handleSave}
              style={styles.inlineButton}
            />
          </View>
          <PrimaryButton
            label={
              <View
                style={[
                  styles.inlineButtonText,
                  styles.centeredInlineButtonText,
                ]}
              >
                <MaterialIcons
                  name={"send"}
                  color={"#000"}
                  size={25}
                  style={styles.inlineButtonIcon}
                />
                <Text style={primaryButtonStyles.label}>
                  Send WOMBO to a friend
                </Text>
              </View>
            }
            onPress={handleShare}
            style={styles.button}
          />
        </View>
      </View>
      <Modal visible={saved} transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalBody}>
            <Text style={styles.modalTitle}>Success!</Text>
            <Text style={styles.modalPrompt}>
              Your WOMBO was successfully saved to gallery.
            </Text>
            <View style={styles.modalButtonDivider} />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setSaved(false)}
            >
              <Text style={styles.modalButtonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  videoContainer: {
    borderRadius: 15,
    flex: 1,
    paddingTop: 30,
  },
  video: {
    width: "80%",
    aspectRatio: 1,
    borderRadius: 15,
    maxHeight: "100%",
  },
  buttonsContainer: {
    width: "80%",
    flex: 1,
  },
  inlineButtonsContainer: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 20,
  },
  inlineButton: {
    flex: 1,
  },
  inlineButtonDivider: {
    width: 15,
  },
  button: {
    width: "100%",
  },
  inlineButtonText: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
  },
  inlineButtonIcon: {
    marginRight: 7,
  },
  centeredInlineButtonText: {
    justifyContent: "center",
  },
  modalBackground: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  modalBody: {
    width: "70%",
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  modalTitle: {
    fontFamily: "IBMPlexBold",
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  modalPrompt: {
    fontFamily: "IBMPlex",
    fontSize: 16,
    textAlign: "center",
    padding: 15,
  },
  modalButtonDivider: {
    width: "100%",
    height: 1,
    backgroundColor: "#000",
    marginTop: 10,
  },
  modalButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  modalButtonText: {
    fontFamily: "IBMPlexBold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Completed;
