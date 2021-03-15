import { MaterialIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Navbar from "../components/Navbar";
import TouchableScale from "../components/TouchableScale";
import WomboButton from "../components/WomboButton";

const Photo = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(
    null
  );
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [image, setImage] = useState(null);
  const cameraRef = useRef();

  const requestCameraPermissions = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasCameraPermission(status === "granted");
  };

  const requestMediaLibraryPermissions = async () => {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasMediaLibraryPermission(status === "granted");
    }
  };

  useEffect(() => {
    requestCameraPermissions();
    requestMediaLibraryPermissions();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };

  const takeImage = async () => {
    let result = await cameraRef.current.takePictureAsync({
      quality: 1,
    });

    setImage(result);
  };

  const toggleType = () =>
    setType((curr) =>
      curr === Camera.Constants.Type.front
        ? Camera.Constants.Type.back
        : Camera.Constants.Type.front
    );

  if (hasCameraPermission === null || hasMediaLibraryPermission === null) {
    return <View style={styles.root} />;
  }

  return (
    <View style={styles.root}>
      <Navbar navigation={navigation} />
      <View style={styles.cameraContainer}>
        {image ? (
          <Image source={{ uri: image.uri }} style={styles.camera} />
        ) : (
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={type}
            ratio={"1:1"}
          />
        )}
      </View>
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsText}>
          1. Hold the camera at eye level
        </Text>
        <Text style={styles.instructionsText}>
          2. Look directly into the camera
        </Text>
        <View style={styles.instructionsDivider} />
        <Text style={styles.instructionsText}>
          <Text style={styles.boldInstructionsText}>TIP </Text>
          WOMBO works better without your teeth showing
        </Text>
      </View>
      <View style={styles.cameraButtonsContainer}>
        {image ? (
          <WomboButton onPress={() => navigation.push("songs", { image })} />
        ) : (
          <>
            <TouchableScale
              style={styles.cameraHelperButton}
              onPress={
                hasMediaLibraryPermission
                  ? pickImage
                  : requestMediaLibraryPermissions
              }
            >
              <MaterialIcons name={"image"} size={30} color={"white"} />
            </TouchableScale>
            <TouchableScale
              style={styles.cameraButton}
              onPress={
                hasCameraPermission ? takeImage : requestCameraPermissions
              }
            >
              <View style={styles.innerCameraButton} />
            </TouchableScale>
            <TouchableScale
              style={styles.cameraHelperButton}
              onPress={
                hasCameraPermission ? toggleType : requestCameraPermissions
              }
            >
              <MaterialIcons name={"switch-camera"} size={30} color={"white"} />
            </TouchableScale>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
  },
  cameraContainer: {
    borderRadius: 15,
    flex: 1,
    paddingTop: 30,
  },
  camera: {
    width: "80%",
    aspectRatio: 1,
    borderRadius: 15,
    maxHeight: "100%",
  },
  instructionsContainer: {
    backgroundColor: "#FBC12E",
    padding: 15,
    borderRadius: 15,
    width: "80%",
  },
  instructionsText: {
    fontSize: 16,
    fontFamily: "IBMPlex",
  },
  boldInstructionsText: {
    fontFamily: "YeyeyRegular",
  },
  instructionsDivider: {
    width: "100%",
    height: 10,
  },
  cameraButtonsContainer: {
    flex: 0.5,
    alignItems: "center",
    flexDirection: "row",
  },
  cameraHelperButton: {
    padding: 15,
    backgroundColor: "#424242",
    borderRadius: 100,
  },
  cameraButton: {
    backgroundColor: "#808080",
    borderRadius: 500,
    width: "20%",
    aspectRatio: 1,
    marginHorizontal: 20,
    padding: 8,
  },
  innerCameraButton: {
    width: "100%",
    height: "100%",
    borderRadius: 500,
    backgroundColor: "#fff",
  },
});

export default Photo;
