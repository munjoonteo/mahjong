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
    let savedNamesDropdown = [
      {
        label: east,
      },
      {
        label: south,
      },
      {
        label: west,
      },
      {
        label: north,
      },
    ];
    try {
      await AsyncStorage.setItem(
        "savedNamesDropdown",
        JSON.stringify(savedNamesDropdown)
      );
      await AsyncStorage.setItem("savedNames", JSON.stringify(savedNames));
      navigation.navigate("PointsTableScreen");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.setName}
          placeholder={"North Seat"}
          onChangeText={(text) => setNorth(text)}
          value={north}
        />
      </View>
      <View style={styles.middleRow}>
        <TextInput
          style={styles.setName}
          placeholder={"West Seat"}
          onChangeText={(text) => setWest(text)}
          value={west}
        />
        <TextInput
          style={styles.setName}
          placeholder={"East Seat"}
          onChangeText={(text) => setEast(text)}
          value={east}
        />
      </View>
      <View>
        <TextInput
          style={styles.setName}
          placeholder={"South Seat"}
          onChangeText={(text) => setSouth(text)}
          value={south}
        />
      </View>
      <TouchableOpacity
        onPress={() => saveNames(navigation, east, south, west, north)}
        style={styles.button}
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
  setName: {
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    marginVertical: 10,
    marginHorizontal: 5,
    padding: 5,
  },
  middleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#ccc",
    padding: "2%",
    margin: 10,
    width: "40%",
    borderRadius: 10,
  },
});
