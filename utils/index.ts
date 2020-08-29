import {isEmpty as _isEmpty} from 'lodash'
import {IFetchOpts} from '../types'

export const createAction = (type: any, payload?: any) => {
    return {type, payload}
}

export const createUrlWithParams = (url: string, params: {[key: string]: string} = {}): string => {
    const stringifyParams = Object.keys(params).map((key: string) => {
        return `${key}=${params[key]}`
    }).join("&")
    return !_isEmpty(stringifyParams)
        ? `${url}?${stringifyParams}`
        : url
}

export const fetchHelper = async (url: string, opts: IFetchOpts): Promise<any> => {
    const updatedUrl = createUrlWithParams(url, opts.queryParams)
    const body = opts && opts.body && JSON.stringify(opts.body)
    const response = await fetch(updatedUrl, {
        method: opts ? opts.method : 'GET',
        headers: { ...opts && opts.headers },
        body
    })
    return response.json()
}