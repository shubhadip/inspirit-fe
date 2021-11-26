import { getTokenValues } from "credentials/access_credentials";
import {
  AUTH_ERROR,
  AUTH_USER,
  LOGOUT_USER,
  SAVE_USER_DETAILS,
} from "../actions/types";

export default function auth(
  state = {
    authenticated: false,
    user: {}
  },
  action: any
) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true };
    case LOGOUT_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case SAVE_USER_DETAILS:
      const token = getTokenValues()
      return { ...state, ...action.payload, userId: token.sub};
    default:
      return { ...state };
  }
}
