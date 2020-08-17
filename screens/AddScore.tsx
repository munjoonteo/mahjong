import * as React from "react";
import { StyleSheet, TouchableOpacity, AsyncStorage } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import { Text, View } from "../components/Themed";

async function addScore(
  names: any[],
  winner: string,
  loser: string,
  score: number
) {
  if (winner === "" || loser === "") {
    return;
  }

  let savedScores = [];
  try {
    const data = await AsyncStorage.getItem("savedScores");
    if (data !== null) {
      savedScores = JSON.parse(data);
    }

    let newScore = {
      round: String(savedScores.length),
      score: [0, 0, 0, 0],
    };

    for (let i = 0; i < 4; i++) {
      if (names[i] === winner) {
        newScore.score[i] += score;
      } else if (names[i] === loser) {
        newScore.score[i] -= score;
      }
    }

    savedScores.push(newScore);
    await AsyncStorage.setItem("savedScores", JSON.stringify(savedScores));
  } catch (err) {
    console.log(err);
  }
}

export default function HomeScreen() {
  const [loser, setLoser] = React.useState("");
  const [winner, setWinner] = React.useState("");
  const [score, setScore] = React.useState(0);
  const [savedNames, setSavedNames] = React.useState([]);

  const scores: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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
      <View>
        <DropDownPicker
          placeholder="Loser"
          items={savedNames}
          containerStyle={{ height: 40 }}
          onChangeItem={(item) => {
            setLoser(item);
          }}
        />
      </View>
      <DropDownPicker
        placeholder="Winner"
        items={savedNames}
        containerStyle={{ height: 40 }}
        onChangeItem={(item) => {
          setWinner(item);
        }}
      />
      <DropDownPicker
        placeholder="Faan"
        items={scores}
        containerStyle={{ height: 40 }}
        onChangeItem={(item) => {
          setScore(item);
        }}
      />
      <TouchableOpacity
        onPress={() => addScore(savedNames, winner, loser, score)}
      >
        <Text>Add Score</Text>
      </TouchableOpacity>

      <Text>Hello</Text>
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
