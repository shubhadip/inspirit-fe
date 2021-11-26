import { IGenericOption } from "shared/interfaces";
import { getAccessToken } from "./access_credentials";

export function GetHeaders() {
  const config: IGenericOption = {
    headers: {
      "content-Type": "application/json",
    },
  };
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers["Authorization"] = "Bearer " + getAccessToken();
  }
  return config;
}
