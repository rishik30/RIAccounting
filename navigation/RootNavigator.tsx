import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import NotFoundScreen from '../screens/NotFoundScreen';
import BottomTabNavigator from './BottomTabNavigator';
import HomeNavigator from './HomeNavigator';
import { AuthContext } from '../context/authContext';


const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const {user} = React.useContext(AuthContext)
  const RootComponent = user.role === "ADMIN"
    ? BottomTabNavigator
    : HomeNavigator
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={RootComponent} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

export default RootNavigator