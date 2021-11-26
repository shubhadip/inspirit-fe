import Cookies from "universal-cookie";

const jwt = require("jwt-decode");

export const setCookie = (key: string, value: any) => {
  const cookies = new Cookies();
  const expiryDateTime = new Date();
  
  expiryDateTime.setTime(expiryDateTime.getTime() + (24*60*60*1000));
  cookies.set(key, value, {
    path: "/",
    expires: expiryDateTime,
  });
};

export function getFromCookie(key: string) {
  const cookies = new Cookies();
  return cookies.get(key);
}

export function saveAccessCredentials(values: any) {
  setCookie("email", values.email);
  setCookie("name", values.first_name);
}

export function getAccessToken() {
  return getFromCookie("Access-Token");
}

export function getEmail() {
  return getFromCookie("email");
}

export function deleteToken() {
  const cookies = new Cookies();
  const obj = { path: "" };
  cookies.remove("token", obj);
  cookies.remove("email", obj);
  cookies.remove("Access-Token", obj);
  cookies.remove("name", obj);
}

export function getTokenValues() {
  const tokenDetails = getAccessToken() ? jwt.default(getAccessToken()) : {};
  return tokenDetails;
}
