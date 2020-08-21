import * as React from "react";
import { StyleSheet, FlatList } from "react-native";

import { Text, View } from "../components/Themed";

function Item({ result }: any) {
  return (
    <View style={styles.list}>
      <Text style={styles.text}>{result.label}</Text>
      <Text style={styles.text}>{result.pay}</Text>
      <Text style={styles.text}>{result.pay / 2}</Text>
      <Text style={styles.text}>{result.pay * 1.5}</Text>
    </View>
  );
}

export default function PointsTable() {
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
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <Text style={styles.text}>Faan</Text>
        <Text style={styles.text}>Payouts{"\n"}Winner</Text>
        <Text style={styles.text}>Self-draw{"\n"}Loser</Text>
        <Text style={styles.text}>Self-draw{"\n"}Winner</Text>
      </View>
      <FlatList
        data={scores}
        renderItem={({ item }) => <Item result={item} />}
        keyExtractor={(item: any) => item.label}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  list: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 15,
  },
});
