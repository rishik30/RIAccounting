import { SERVER_BASE_ENDPOINT } from "./configs";

export const FETCH_USER_ENTRIES_URL = `${SERVER_BASE_ENDPOINT}/entry`
export const FETCH_ALL_USERS_URL = `${SERVER_BASE_ENDPOINT}/users/all`

export enum ENTRY_TYPE_ENUM {
    "CREDIT" = "CREDIT",
    "DEBIT" = "DEBIT"
}

export const DEFAULT_ENTRIES_PAGE_SIZE = 10