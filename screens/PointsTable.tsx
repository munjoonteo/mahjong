import * as React from "react";
import { StyleSheet, TouchableOpacity, AsyncStorage } from "react-native";

import { Text, View } from "../components/Themed";

export default function PointsTable() {
  const [savedNames, setSavedNames] = React.useState([]);

  React.useEffect(() => {
    AsyncStorage.getItem("savedNames").then((data) => {
      if (data !== null) {
        setSavedNames(JSON.parse(data));
      }
    });
  }, savedNames);

  console.log(savedNames);

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <Text>{savedNames[0]}</Text>
        <Text>{savedNames[1]}</Text>
        <Text>{savedNames[2]}</Text>
        <Text>{savedNames[3]}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  list: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "teal",
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },
});
