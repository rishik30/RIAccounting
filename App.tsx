import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { useAuth } from './hooks/useAuth';
import { AuthContext } from './context/authContext';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const {auth, state} = useAuth()
  const colorScheme = useColorScheme();

  if (!isLoadingComplete && state.loading) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContext.Provider value={{auth, user: state.user}}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </AuthContext.Provider>
      </SafeAreaProvider>
    );
  }
}
