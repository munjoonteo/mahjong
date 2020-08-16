import * as React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
} from "react-native";

import { Text, View } from "../components/Themed";

export default function Setup({ navigation }: any) {
  const [east, setEast] = React.useState("");
  const [south, setSouth] = React.useState("");
  const [west, setWest] = React.useState("");
  const [north, setNorth] = React.useState("");

  const saveNames = async (
    navigation: any,
    east: string,
    south: string,
    west: string,
    north: string
  ) => {
    if (east === "" || south === "" || west === "" || north === "") {
      return;
    }
    let savedNames = [east, south, west, north];
    try {
      await AsyncStorage.setItem("savedNames", JSON.stringify(savedNames));
      navigation.navigate("PointsTableScreen");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Setup</Text>
      <View>
        <TextInput
          style={styles.setName}
          onChangeText={(text) => setNorth(text)}
          value={north}
        />
      </View>
      <View>
        <TextInput
          style={styles.setName}
          onChangeText={(text) => setWest(text)}
          value={west}
        />
        <TextInput
          style={styles.setName}
          onChangeText={(text) => setEast(text)}
          value={east}
        />
      </View>
      <View>
        <TextInput
          style={styles.setName}
          onChangeText={(text) => setSouth(text)}
          value={south}
        />
      </View>
      <TouchableOpacity
        onPress={() => saveNames(navigation, east, south, west, north)}
      >
        <Text>Play!</Text>
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
  setName: {
    height: 40,
    borderWidth: 1,
    borderColor: "black",
  },
});
