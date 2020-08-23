import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import { AuthStackParamList } from '../types';
import { LoginScreen } from '../screens/LoginScreen';

const AuthStack = createStackNavigator<AuthStackParamList>()

export default function() {
    return (
        <AuthStack.Navigator
            mode={'card'}
            screenOptions={{
                headerShown: false
            }}
        >
            <AuthStack.Screen name={"Login"} component={LoginScreen} />
        </AuthStack.Navigator>
    )
}