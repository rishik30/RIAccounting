import { SERVER_BASE_ENDPOINT } from "./configs";

export const FETCH_USER_ENTRIES_URL = `${SERVER_BASE_ENDPOINT}/entry`

export enum ENTRY_TYPE_ENUM {
    "CREDIT" = "CREDIT",
    "DEBIT" = "DEBIT"
}