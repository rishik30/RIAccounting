import * as React from 'react'
import { IAuth } from '../types'

interface IAuthContext {
    user: any,
    auth: IAuth,
    users: Array<any>
}

export const AuthContext = React.createContext<IAuthContext>({user: null, auth: {}, users: []})