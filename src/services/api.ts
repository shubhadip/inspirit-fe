/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from './axios.instances';
import { IGenericOption } from '../shared/interfaces';
import { API_ENDPOINT } from '../shared/constants';

const BASE_URL: string = API_ENDPOINT;

/**
 * Get request
 * @param url url for get request
 */
export const get = <T = never>(url: string): Promise<T> => {
  return axios
    .get(`${BASE_URL}${url}`)
    .then((response: any) => response.data)
    .catch((error: any) => {
      /**
       * Custom error handling logic
       */
      /**
       * Throw error to caller.
       */
      throw error;
    });
};

/**
 * Post request
 * @param url url to post request
 * @param data data to post
 */
export const post = <T = never>(url: string, data: object): Promise<T> => {
  const postData: any = {
    ...data,
  };
  return axios
    .post(`${BASE_URL}${url}`, postData)
    .then((response: any) => response.data)
    .catch((error: any) => {
      /**
       * Custom error handling logic
       */
      /**
       * Throw error to caller.
       */
      throw error;
    });
};

/**
 * Patch request
 * @param url url to patch request
 * @param data data to update
 */
export const patch = <T = never>(url: string, data: object): Promise<T> => {
  const postData: any = {
    ...data,
  };

  return axios
    .patch(`${BASE_URL}${url}`, postData)
    .then((response: any) => response.data)
    .catch((error: any) => {
      /**
       * Custom error handling logic
       */
      /**
       * Throw error to caller.
       */
      throw error;
    });
};

/**
 * Get request
 * @param url url for get request
 * @param headers
 */
export const getFromHost = <T = any>(url: string, headers?: IGenericOption | null): Promise<T> => {
  return axios
    .get(url, { headers })
    .then((response: any) => response.data)
    .catch((error: any) => {
      /**
       * Custom error handling logic
       */
      /**
       * Throw error to caller.
       */
      throw error;
    });
};

/**
 * Post to host request
 * @param url
 * @param data
 * @param headers
 */
export const postToHost = <T = never>(url: string, data: object, headers?: IGenericOption | null): Promise<T> => {
  return axios
    .post(url, data, {
      headers,
    })
    .then((response: any) => response.data)
    .catch((error: any) => {
      /**
       * Custom error handling logic
       */
      /**
       * Throw error to caller.
       */
      throw error;
    });
};

/**
 * Patch to host request
 * @param url
 * @param data
 * @param headers
 */
export const patchToHost = <T = never>(url: string, data: object, headers?: IGenericOption | null): Promise<T> => {
  return axios
    .patch(url, data, {
      headers,
    })
    .then((response: any) => response.data)
    .catch((error: any) => {
      /**
       * Custom error handling logic
       */
      /**
       * Throw error to caller.
       */
      throw error;
    });
};

/**
 * Put to host request
 * @param url
 * @param data
 * @param headers
 */
export const putToHost = <T = never>(url: string, data: object, headers?: IGenericOption | null): Promise<T> => {
  return axios
    .put(url, data, {
      headers,
    })
    .then((response: any) => response.data)
    .catch((error: any) => {
      /**
       * Custom error handling logic
       */
      /**
       * Throw error to caller.
       */
      throw error;
    });
};