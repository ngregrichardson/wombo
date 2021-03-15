import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import About from "./screens/About";
import Completed from "./screens/Completed";
import Loading from "./screens/Loading";
import Photo from "./screens/Photo";
import Songs from "./screens/Songs";
import Welcome from "./screens/Welcome";
import {
  IBMPlexSans_400Regular,
  IBMPlexSans_700Bold,
} from "@expo-google-fonts/ibm-plex-sans";

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    YeyeyRegular: require("./assets/fonts/YeyeyRegular.otf"),
    IBMPlex: IBMPlexSans_400Regular,
    IBMPlexBold: IBMPlexSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.root}>
        <StatusBar style={"inverted"} translucent={false} />
        <NavigationContainer theme={DarkTheme}>
          <Stack.Navigator headerMode={"none"}>
            <Stack.Screen name={"welcome"} component={Welcome} />
            <Stack.Screen name={"photo"} component={Photo} />
            <Stack.Screen name={"about"} component={About} />
            <Stack.Screen name={"songs"} component={Songs} />
            <Stack.Screen name={"loading"} component={Loading} />
            <Stack.Screen name={"completed"} component={Completed} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({ root: { flex: 1 } });
