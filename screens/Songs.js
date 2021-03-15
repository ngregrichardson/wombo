import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Navbar from "../components/Navbar";
import Song from "../components/Song";
import WomboButton from "../components/WomboButton";
import { Audio } from "expo-av";

const Songs = ({ navigation, route }) => {
  const [songs, setSongs] = useState();
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlayingSong, setIsPlayingSong] = useState(null);
  const playingSongRef = useRef();

  useEffect(() => {
    // TODO get songs from endpoint
    setSongs([
      {
        id: 0,
        title: "We're not gonna take it",
        artist: "Twisted Sister",
        isNew: true,
        startGradient: "#AE3DA8",
        endGradient: "#F80269",
        uri:
          "https://download.all-mp3-free.xyz/e/Twisted-Sister-Were-Not-Gonna-Take-It.mp3",
      },
      {
        id: 1,
        title: "All Star",
        artist: "Smash Mouth",
        isNew: true,
        startGradient: "#FF707C",
        endGradient: "#FD4764",
        uri: "https://archive.org/download/AllStar/SmashMouth-AllStar_64kb.mp3",
      },
      {
        id: 2,
        title: "Tunak Tunak Tun",
        artist: "Daler Mehndi",
        isNew: true,
        startGradient: "#F6D265",
        endGradient: "#FBA187",
        uri: "https://download.mp3-j.icu/s/Daler-Mehndi-Tunak-Tunak-Tun.mp3",
      },
      {
        id: 3,
        title: "Dame Tu Cosita",
        artist: "El Chombo",
        isNew: false,
        startGradient: "#4FFFDC",
        endGradient: "#78FEC5",
        uri:
          "http://dl2.wapkizfile.info/ddl/0616d42e9b36257402d699b495a574b3/pagalworld4u+wapkiz+com/Dame-Tu-Cosita-(pagalworld4u.wapkiz.com).mp3",
      },
      {
        id: 4,
        title: "What Is Love",
        artist: "Haddaway",
        isNew: false,
        startGradient: "#0BCEFE",
        endGradient: "#465DFF",
      },
      {
        id: 5,
        title: "Chug Jug",
        artist: "Leviathan",
        isNew: false,
        startGradient: "#A12CE6",
        endGradient: "#5205FE",
      },
    ]);
  }, []);

  const handleToggleIsSelected = async (id) => {
    if (selectedSong && selectedSong.id === id) {
      playingSongRef.current?.stopAsync();
      playingSongRef.current = null;
      setSelectedSong(null);
      setIsPlayingSong(null);
    } else {
      const song = songs.find((s) => s.id === id);
      playingSongRef.current?.stopAsync();
      setSelectedSong(song);
      setIsPlayingSong(song);
      if (song.uri) {
        let { sound } = await Audio.Sound.createAsync(
          { uri: song.uri },
          { shouldPlay: true }
        );
        playingSongRef.current = sound;
      }
    }
  };

  const handleToggleIsPlaying = async (id) => {
    if (isPlayingSong && isPlayingSong.id === id) {
      playingSongRef.current?.pauseAsync();
      setIsPlayingSong(null);
      return;
    }
    const song = songs.find((s) => s.id === id);
    if ((isPlayingSong && isPlayingSong.id !== id) || !isPlayingSong) {
      setSelectedSong(song);
      setIsPlayingSong(song);
      if (song.uri) {
        let { sound } = await Audio.Sound.createAsync(
          { uri: song.uri },
          { shouldPlay: true }
        );
        playingSongRef.current = sound;
      }
    }
  };

  return (
    <>
      <Navbar navigation={navigation} />
      <FlatList
        data={songs}
        keyExtractor={(item) => item.title}
        contentContainerStyle={[
          styles.root,
          selectedSong ? styles.selectedRoot : null,
        ]}
        renderItem={({ item }) => (
          <Song
            {...item}
            onToggleIsPlaying={handleToggleIsPlaying}
            onToggleIsSelected={handleToggleIsSelected}
            isSelected={selectedSong && item.id === selectedSong.id}
            isPlaying={isPlayingSong && item.id === isPlayingSong.id}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
      />
      {selectedSong ? (
        <View style={styles.continueButtonContainer} pointerEvents={"box-none"}>
          <WomboButton
            style={styles.continueButton}
            onPress={() => {
              setIsPlayingSong(null);
              navigation.push("loading", {
                image: route.params.image,
                song: selectedSong,
              });
            }}
          />
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#000",
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  selectedRoot: {
    paddingTop: 20,
    paddingBottom: 200,
  },
  divider: {
    width: "100%",
    height: 20,
  },
  continueButtonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 50,
    zIndex: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Songs;
