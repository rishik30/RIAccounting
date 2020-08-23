import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import { LoginScreen } from '../screens/LoginScreen';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
// export default function Navigation() {
//   return createAppContainer(RootNavigator)
  // return (
    // <NavigationContainer
    //   linking={LinkingConfiguration}
    //   theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    //   <RootNavigator />
    // </NavigationContainer>
  // );
// }

const RootNavigator = createSwitchNavigator(
  {
    Login: LoginScreen,
    Home: HomeNavigator
  },
  {
    initialRouteName: 'Home'
  }
)

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function HomeNavigator() {
  return (
    <Stack.Navigator headerMode="none" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

export default createAppContainer(RootNavigator)
