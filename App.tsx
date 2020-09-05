import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { useAuth } from './hooks/useAuth';
import { AuthContext } from './context/authContext';
import { fetchHelper } from './utils';
import { FETCH_ALL_USERS_URL } from './appConstants';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const {auth, state} = useAuth()
  const colorScheme = useColorScheme();
  const [users, setUsers] = React.useState<Array<any>>([])

  React.useEffect(() => {
    if (state.user) {
      const fetchAllUsers = async () => {
        try {
            const {data} = await fetchHelper(FETCH_ALL_USERS_URL, {
                method: 'GET'
            })
            setUsers(data)
        } catch (error) {
            
        }
      }
      fetchAllUsers()
    }
  }, [state.user])

  if (!isLoadingComplete && state.loading) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContext.Provider value={{auth, user: state.user, users}}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </AuthContext.Provider>
      </SafeAreaProvider>
    );
  }
}
