import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import LinkingConfiguration from './LinkingConfiguration';
import RootNavigator from '../navigation/RootNavigator'
import { AuthContext } from '../context/authContext';
import AuthNavigator from './AuthNavigator';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const authContext = React.useContext(AuthContext)
  console.log({authContext})
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {
          authContext.user
            ? <RootNavigator />
            : <AuthNavigator />
        }
    </NavigationContainer>
  );
}
