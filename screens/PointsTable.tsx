import * as React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  FlatList,
} from "react-native";

import { Text, View } from "../components/Themed";

function Item({ score }: any) {
  return (
    <View style={styles.list}>
      <Text>{score.round}</Text>
      <Text>{score.east}</Text>
      <Text>{score.south}</Text>
      <Text>{score.west}</Text>
      <Text>{score.north}</Text>
    </View>
  );
}

export default function PointsTable({ navigation }: any) {
  const [savedNames, setSavedNames] = React.useState([]);
  const [results, setResults] = React.useState([]);

  React.useEffect(() => {
    AsyncStorage.getItem("savedNames").then((data) => {
      if (data !== null) {
        setSavedNames(JSON.parse(data));
      }
    });
  }, savedNames);

  React.useEffect(() => {
    AsyncStorage.getItem("results").then((data) => {
      if (data !== null) {
        setResults(JSON.parse(data));
      }
    });
  }, results);

  let dummy = [
    {
      round: "1",
      east: 1,
      south: -1,
      west: 0,
      north: 0,
    },
    {
      round: "1",
      east: 1,
      south: -1,
      west: 0,
      north: 0,
    },
  ];

  let totalScore = [0, 0, 0, 0];
  for (let result of dummy) {
    totalScore[0] += result.east;
    totalScore[1] += result.south;
    totalScore[2] += result.west;
    totalScore[3] += result.north;
  }

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <Text>Round</Text>
        <Text>{savedNames[0]}</Text>
        <Text>{savedNames[1]}</Text>
        <Text>{savedNames[2]}</Text>
        <Text>{savedNames[3]}</Text>
      </View>
      <ScrollView>
        <FlatList
          data={dummy}
          renderItem={({ item }) => <Item score={item} />}
          keyExtractor={(item) => item.round}
        />
      </ScrollView>
      <View style={styles.list}>
        <Text>Total</Text>
        <Text>{totalScore[0]}</Text>
        <Text>{totalScore[1]}</Text>
        <Text>{totalScore[2]}</Text>
        <Text>{totalScore[3]}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("AddScoreScreen")}>
        <Text>Add score</Text>
      </TouchableOpacity>
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
