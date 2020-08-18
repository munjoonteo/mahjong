import * as React from "react";
import { StyleSheet, TouchableOpacity, AsyncStorage } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import { Text, View } from "../components/Themed";
import { Switch } from "react-native-gesture-handler";

async function addScore(
  names: any[],
  winner: string,
  loser: string,
  score: any,
  zimo: boolean,
  navigation: any
) {
  if (winner === "" || winner === loser) {
    return;
  }

  if (loser === "" && zimo === false) {
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

    if (!zimo) {
      for (let i = 0; i < 4; i++) {
        if (names[i] === winner) {
          newScore.score[i] += score.pay;
        } else if (names[i] === loser) {
          newScore.score[i] -= score.pay;
        }
      }
    } else {
      for (let i = 0; i < 4; i++) {
        if (names[i] === winner) {
          newScore.score[i] += (score.pay / 2) * 3;
        } else {
          newScore.score[i] -= score.pay / 2;
        }
      }
    }

    savedScores.push(newScore);
    await AsyncStorage.setItem("savedScores", JSON.stringify(savedScores));
    navigation.goBack();
  } catch (err) {
    console.log(err);
  }
}

export default function HomeScreen({ navigation }: any) {
  const [loser, setLoser] = React.useState("");
  const [winner, setWinner] = React.useState("");
  const [zimo, setZimo] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [savedNames, setSavedNames] = React.useState([]);

  const toggleZimo = () => setZimo((previousState) => !previousState);

  const scores: any = [
    {
      label: "3",
      pay: 4,
    },
    {
      label: "4",
      pay: 8,
    },
    {
      label: "5",
      pay: 12,
    },
    {
      label: "6",
      pay: 16,
    },
    {
      label: "7",
      pay: 24,
    },
    {
      label: "8",
      pay: 32,
    },
    {
      label: "9",
      pay: 48,
    },
    {
      label: "10",
      pay: 64,
    },
    {
      label: "11",
      pay: 128,
    },
    {
      label: "12",
      pay: 256,
    },
  ];

  React.useEffect(() => {
    AsyncStorage.getItem("savedNamesDropdown").then((data) => {
      if (data !== null) {
        setSavedNames(JSON.parse(data));
      }
    });
  }, savedNames);

  return (
    <View style={styles.container}>
      <DropDownPicker
        placeholder="Loser"
        items={savedNames}
        containerStyle={{ height: 40 }}
        onChangeItem={(item) => {
          setLoser(item);
        }}
      />
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
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={zimo ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleZimo}
        value={zimo}
      />
      <TouchableOpacity
        onPress={() =>
          addScore(savedNames, winner, loser, score, zimo, navigation)
        }
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
