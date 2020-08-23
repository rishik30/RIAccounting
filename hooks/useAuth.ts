import * as React from 'react';
import axios from 'axios';
import {AsyncStorage} from 'react-native'

import {createAction} from '../utils';

export function useAuth() {
  const [state, dispatch] = React.useReducer(
    (state: any, action: any) => {
      switch (action.type) {
        case 'SET_USER':
          return {
            ...state,
            user: {...action.payload},
          };
        case 'REMOVE_USER':
          return {
            ...state,
            user: undefined,
          };
        case 'SET_LOADING':
          return {
            ...state,
            loading: action.payload,
          };
        default:
          return state;
      }
    },
    {
      user: undefined,
      loading: true,
    },
  );
  const auth = React.useMemo(
    () => ({
      login: async (email: string, password: string) => {
        // const {data} = await axios.post(`${BASE_URL}/auth/local`, {
        //   identifier: email,
        //   password,
        // });
        const data = {user: {email: "test@test.com"}, token: "ncshh279yinwfjk"}
        const user = {
          email: data.user.email,
          token: data.token,
        };
        await AsyncStorage.setItem('user', JSON.stringify(user));
        dispatch(createAction('SET_USER', user));
      },
      logout: async () => {
        await AsyncStorage.removeItem('user');
        dispatch(createAction('REMOVE_USER'));
      },
      register: async (email: string, password: string) => {
        // await axios.post(`${BASE_URL}/auth/local/register`, {
        //   username: email,
        //   email,
        //   password,
        // });
      },
    }),
    [],
  );
  React.useEffect(() => {
      setTimeout(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
              dispatch(createAction('SET_USER', JSON.parse(user)));
            }
            dispatch(createAction('SET_LOADING', false));
          });
      }, 2000)
  }, []);
  return {auth, state};
}
