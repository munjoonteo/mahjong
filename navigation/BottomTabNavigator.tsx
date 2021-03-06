import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { View } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import Home from "../screens/Home";
import Points from "../screens/PointsTable";
import AddScore from "../screens/AddScore";
import Options from "../screens/Options";
import Setup from "../screens/Setup";
import PointsData from "../screens/PointsData";
import { BottomTabParamList, MainParamList, OptionsParamList } from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Home"
        component={MainNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="md-home" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Options"
        component={OptionsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="md-settings" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const MainStack = createStackNavigator<MainParamList>();

function BlankHeader() {
  return <View></View>;
}

function MainNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="HomeScreen"
        component={Home}
        options={{ headerTitle: "HK Mahjong Points Counter" }}
      />
      <MainStack.Screen
        name="SetupScreen"
        component={Setup}
        options={{ headerTitle: "Setup Game" }}
      />
      <MainStack.Screen
        name="PointsTableScreen"
        component={Points}
        options={{ headerTitle: () => <BlankHeader /> }}
      />
      <MainStack.Screen
        name="AddScoreScreen"
        component={AddScore}
        options={{ headerTitle: () => <BlankHeader /> }}
      />
    </MainStack.Navigator>
  );
}

const OptionsStack = createStackNavigator<OptionsParamList>();

function OptionsNavigator() {
  return (
    <OptionsStack.Navigator>
      <OptionsStack.Screen
        name="OptionsScreen"
        component={Options}
        options={{ headerTitle: "Options" }}
      />
      <OptionsStack.Screen
        name="PointsDataScreen"
        component={PointsData}
        options={{ headerTitle: "Faan to Payouts" }}
      />
    </OptionsStack.Navigator>
  );
}
