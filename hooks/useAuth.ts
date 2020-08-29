import * as React from 'react';
import axios from 'axios';
import {AsyncStorage} from 'react-native'

import {createAction} from '../utils';
import {useFetch} from './useFetch'
import { LOGIN_URL } from '../configs';

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
        console.log({email, password})
        dispatch(createAction('SET_LOADING', true));
        try {
          const response = await fetch(LOGIN_URL, {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const {data} = await response.json()
          const user = {
            email: data.user.email,
            name: data.user.name,
            role: data.user.role,
            id: data.user.id,
            token: data.token,
          };
          dispatch(createAction('SET_LOADING', false));
          await AsyncStorage.setItem('user', JSON.stringify(user));
          dispatch(createAction('SET_USER', user));
        } catch(err) {
          console.log({err})
        }
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
