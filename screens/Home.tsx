import * as React from "react";
import { StyleSheet, TouchableOpacity, AsyncStorage } from "react-native";

import { Text, View } from "../components/Themed";

async function newGame(navigation: any) {
  try {
    await AsyncStorage.removeItem("savedScores");
    await AsyncStorage.removeItem("savedNames");
    await AsyncStorage.removeItem("savedNamesDropdown");
    navigation.navigate("Setup");
  } catch (err) {
    console.log(err);
  }
}

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => newGame(navigation)}>
        <Text>New Game</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("PointsTableScreen")}
      >
        <Text>Continue Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
