import * as FileSystem from "expo-file-system";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Navbar from "../components/Navbar";
import * as Progress from "expo-progress";

const prompts = [
  "Transmitting particles through radio waves...",
  "Warming up the thermo-magnetic Wombometer...",
  "Generating fractal resonance harmonics...",
  "Processing quantum intersection matrices...",
  "Uploading psychic connection to the reality plane...",
  "Downloading your mystical creation...",
];

const Loading = ({ navigation, route }) => {
  const [promptIndex, setPromptIndex] = useState(0);
  const [promptTypingIndex, setPromptTypingIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const handleDownloadVideo = async (url) => {
    const downloadResumable = FileSystem.createDownloadResumable(
      url,
      FileSystem.cacheDirectory +
        `cache${Math.floor(Math.random() * 20000)}.mp4`,
      {}
    );

    try {
      const { uri } = await downloadResumable.downloadAsync();
      navigation.replace("completed", { video: { uri } });
    } catch (e) {
      console.error(e);
    }
  };
  const promptTypingIntervalRef = useRef();

  const handleChangePrompt = () => {
    setPromptTypingIndex(0);
    setPromptIndex((curr) => {
      if (curr + 1 >= prompts.length) {
        return 0;
      } else {
        return curr + 1;
      }
    });
  };

  const handleStartTyping = () => {
    clearInterval(promptTypingIntervalRef.current);
    promptTypingIntervalRef.current = setInterval(() => {
      setPromptTypingIndex((curr) => {
        if (curr + 1 <= prompts[promptIndex].length) {
          return curr + 1;
        } else {
          return curr;
        }
      });
    }, 50);
  };

  const handleStart = () => {
    // TODO make API call
    setProgress(0.25);
    setTimeout(() => {
      setProgress(0.5);
      setTimeout(() => {
        setProgress(0.75);
        setTimeout(() => {
          setProgress(1);
          setTimeout(() => {
            handleDownloadVideo("http://clips.vorwaerts-gmbh.de/VfE_html5.mp4");
          }, 1000);
        }, 5000);
      }, 5000);
    }, 5000);
  };

  useEffect(() => {
    handleStart();
    handleStartTyping();
    const promptInterval = setInterval(() => {
      handleChangePrompt();
      handleStartTyping();
    }, 3500);
    return () => clearInterval(promptInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.root}>
      <Navbar navigation={navigation} />
      <View style={styles.content}>
        <Text style={styles.title}>Making Your Wombo</Text>
        <View style={styles.promptContainer}>
          <Text style={styles.prompt}>
            {prompts[promptIndex].slice(0, promptTypingIndex)}
          </Text>
        </View>
        <Progress.Bar
          color={"#fff"}
          progress={progress}
          height={50}
          style={styles.progressBar}
          isAnimated
        />
      </View>
      <View style={styles.content} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    fontFamily: "YeyeyRegular",
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    marginBottom: 30,
  },
  promptContainer: {
    marginBottom: 30,
    paddingHorizontal: 50,
  },
  prompt: {
    fontFamily: "IBMPlex",
    fontSize: 17,
    textAlign: "center",
    color: "#fff",
  },
  progressBar: {
    width: "80%",
    borderRadius: 1000,
    height: 50,
    borderColor: "#fff",
    borderWidth: 4,
  },
});

export default Loading;
