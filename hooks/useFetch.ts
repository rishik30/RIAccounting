import * as React from 'react'
import {IReducerAction, IFetchOpts} from '../types'

interface IInitialState {
    data: any,
    error: any,
    isLoading: boolean
}

export const useFetch = (url: string, opts?: IFetchOpts) => {
    const initialState = React.useRef({
        data: null,
        error: null,
        isLoading: false
    })
    const [state, dispatch] = React.useReducer((_state: any, action: IReducerAction) => {
        switch (action.payload) {
            case 'FETCHING':
                return {..._state, isLoading: true}
                break;
            case 'FETCHED':
                return {..._state, data: action.payload, isLoading: false}
                break;
            case 'ERROR_FETCHING':
                return {..._state, error: action.payload, isLoading: false}
                break;
            default:
                return _state
                break;
        }
    }, initialState)

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({type: 'FETCHING'})
                const body = opts && opts.body && JSON.stringify(opts.body)
                const response = await fetch(url, {
                    method: opts ? opts.method : 'GET',
                    headers: {...opts && opts.headers},
                    body
                })
                const data = await response.json()
                dispatch({type: 'FETCHED', payload: data})
            } catch (error) {
                dispatch({type: 'ERROR_FETCHING', payload: error})
            }
        }

        fetchData()
    }, [url])

    return {...state}
}