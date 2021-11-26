import axios from "./../services/axios.instances"
import {
  AUTH_USER,
  AUTH_ERROR,
  LOGOUT_USER,
  SHOW_LOADER,
  HIDE_LOADER,
  SAVE_USER_DETAILS,
} from "./types";

import {
  deleteToken,
  getTokenValues,
  setCookie,
} from "../credentials/access_credentials";
import { GetHeaders } from "../credentials/access_headers";
import { IGenericOption } from "shared/interfaces";

export const API_URL = 'http://localhost:4000/';

export function authError(error: any) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function signupUser(payload: {username: string, password: string}) {
  return (dispatch: any) => {
    return axios
      .post(`${API_URL}api/signup`, payload)
      .then((response : IGenericOption) => {
        dispatch({
          type: AUTH_USER,
        });
        return { success: "Success" , response : response };
      })
      .catch((error : IGenericOption) => {
        return { error: error.response.data };
      });
  };
}

export function signoutUser() {
  deleteToken();
  return {
    type: LOGOUT_USER,
  };
}

export function signinUser({ username, password }: {username: string, password: string}) {
  return (dispatch: any) => {
    dispatch({
      type: SHOW_LOADER,
    });
    const headers = GetHeaders();
    return axios
      .post(`${API_URL}api/login`, {username, password}, headers)
      .then((response : IGenericOption) => {
        dispatch({
          type: AUTH_USER,
        });
        setCookie("Access-Token", response.data.response);
        const value = getTokenValues()
        dispatch(getUserDetails(value.sub));
        dispatch({
          type: HIDE_LOADER,
        });
        return { success: "Success" };
      })
      .catch((error : IGenericOption) => {
        dispatch({
          type: HIDE_LOADER,
        });
        return { error: error.response.data };
      });
  };
}

export function getUserDetails(id: number) {
  return (dispatch: any) => {
    dispatch({
      type: SHOW_LOADER,
    });
    const headers = GetHeaders();
    return axios
      .get(`${API_URL}api/getuser/${id}`, headers)
      .then((response : IGenericOption) => {
        dispatch({
          type: SAVE_USER_DETAILS,
          payload: response?.data?.user
        });
        dispatch({
          type: HIDE_LOADER,
        });
        return { success: "Success" };
      })
      .catch((error : IGenericOption) => {
        dispatch({
          type: HIDE_LOADER,
        });
        return { error: error.response.data };
      });
  };
}

export function buyBitcoin({ amount }: { amount: number }) {
  return (dispatch: any) => {
    dispatch({
      type: SHOW_LOADER,
    });
    const headers = GetHeaders();
    return axios
      .post(`${API_URL}api/buy`, {amount}, headers)
      .then((response : IGenericOption) => {
        dispatch({
          type: SAVE_USER_DETAILS,
          payload: response?.data?.response
        });
        dispatch({
          type: HIDE_LOADER,
        });
        return { success: "Success", response: response };
      })
      .catch((error : IGenericOption) => {
        dispatch({
          type: HIDE_LOADER,
        });
        return { error: error.response.data };
      });
  };
}

export function sellBitcoin({ amount }: {amount: number}) {
  return (dispatch: any) => {
    dispatch({
      type: SHOW_LOADER,
    });
    const headers = GetHeaders();
    return axios
      .post(`${API_URL}api/sell`, {amount}, headers)
      .then((response : IGenericOption) => {
        dispatch({
          type: SAVE_USER_DETAILS,
          payload: response?.data?.response
        });
        dispatch({
          type: HIDE_LOADER,
        });
        return { success: "Success", response: response };
      })
      .catch((error : IGenericOption) => {
        dispatch({
          type: HIDE_LOADER,
        });
        return { error: error.response.data };
      });
  };
}