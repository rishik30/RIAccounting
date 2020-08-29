import * as React from "react"
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";

type HomeStackParamList = {
    Home: undefined
}

const HomeStack = createStackNavigator<HomeStackParamList>();

export default function() {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name="Home" component={HomeScreen} />
        </HomeStack.Navigator>
    )
}