import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";

function newGame(navigation: any) {
  // Clear local state
  navigation.navigate("PointsTableScreen");
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
