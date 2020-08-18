import * as React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Image,
} from "react-native";

import { Text, View } from "../components/Themed";

async function newGame(navigation: any) {
  try {
    await AsyncStorage.removeItem("savedScores");
    await AsyncStorage.removeItem("savedNames");
    await AsyncStorage.removeItem("savedNamesDropdown");
    navigation.navigate("SetupScreen");
  } catch (err) {
    console.log(err);
  }
}

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => newGame(navigation)}
      >
        <Text>New Game</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
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
  button: {
    alignItems: "center",
    backgroundColor: "#ccc",
    padding: "2%",
    margin: "10px",
    width: "50%",
    borderRadius: 10,
  },
});
