import { atom } from "recoil";

export const SERVER_URL ="http://127.0.0.1:8090"
export const DEFAULT_URL = atom({
  key: "url",
  default: SERVER_URL,
})

export const SHOW_LOGIN = atom({
  key: "showLogin",
  default: false,
})

export const IS_LOGGED_IN = atom({
  key: "isLoggedIn",
  default: false,
})

