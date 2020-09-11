import { Ionicons, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';
import HomeScreen from '../screens/HomeScreen';
import OtherUserDetailsScreen from '../screens/OtherUserDetailsScreen';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  // const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Entries">
      <BottomTab.Screen
        name="Entries"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-cash" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Others"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-person" color={color} />,
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
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator screenOptions={{ headerShown: false }}>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={HomeScreen}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerShown: false }}
      />
      <TabTwoStack.Screen
        name="OtherUserDetailsScreen"
        component={OtherUserDetailsScreen}
        options={{
          headerBackImage: () => <AntDesign name="arrowleft" size={16} color="black" />
        }}
      />
    </TabTwoStack.Navigator>
  );
}
