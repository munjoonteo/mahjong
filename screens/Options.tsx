import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";

export default function OptionsScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("PointsDataScreen")}
        >
          <Text>Faan to Points Conversion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#ccc",
    padding: "5%",
    margin: 10,
    borderRadius: 10,
    width: "100%",
  },
});
