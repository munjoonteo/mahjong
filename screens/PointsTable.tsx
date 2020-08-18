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
        <Text style={styles.text}>Round</Text>
        <Text style={styles.text}>{savedNames[0]}</Text>
        <Text style={styles.text}>{savedNames[1]}</Text>
        <Text style={styles.text}>{savedNames[2]}</Text>
        <Text style={styles.text}>{savedNames[3]}</Text>
      </View>
      <ScrollView>
        <FlatList
          data={savedScores}
          renderItem={({ item }) => <Item result={item} />}
          keyExtractor={(item: any) => item.round}
        />
      </ScrollView>
      <View style={styles.list}>
        <Text style={styles.text}>Total</Text>
        <Text style={styles.text}>{totalScore[0]}</Text>
        <Text style={styles.text}>{totalScore[1]}</Text>
        <Text style={styles.text}>{totalScore[2]}</Text>
        <Text style={styles.text}>{totalScore[3]}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AddScoreScreen")}
        >
          <Text>Add score</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    alignItems: "center",
  },
  list: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 18,
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
