import * as React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  FlatList,
} from "react-native";

import { Text, View } from "../components/Themed";

function Item({ result }: any) {
  return (
    <View style={styles.list}>
      <Text>{result.round}</Text>
      <Text>{result.score[0]}</Text>
      <Text>{result.score[1]}</Text>
      <Text>{result.score[2]}</Text>
      <Text>{result.score[3]}</Text>
    </View>
  );
}

export default function PointsTable({ navigation }: any) {
  const [savedNames, setSavedNames] = React.useState([]);
  const [savedScores, setSavedScores] = React.useState([]);

  React.useEffect(() => {
    AsyncStorage.getItem("savedNames").then((data) => {
      if (data !== null) {
        setSavedNames(JSON.parse(data));
      }
    });
  }, savedNames);

  React.useEffect(() => {
    AsyncStorage.getItem("savedScores").then((data) => {
      if (data !== null) {
        setSavedScores(JSON.parse(data));
      }
    });
  }, savedScores);

  let totalScore = [0, 0, 0, 0];
  let result: any;
  for (result of savedScores) {
    totalScore[0] += result.score[0];
    totalScore[1] += result.score[1];
    totalScore[2] += result.score[2];
    totalScore[3] += result.score[3];
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
          data={savedScores}
          renderItem={({ item }) => <Item result={item} />}
          keyExtractor={(item: any) => item.round}
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
