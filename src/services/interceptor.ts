import { ErrorCode } from 'shared/enums';
import apiClient from './axios.instances';

/**
 * request response interceptors
 */
export const httpInterceptors = (): void => {
  apiClient.interceptors.request.use(async (config: any) => {
    return config;
  });

  apiClient.interceptors.response.use(
    (response: any) => response,
    async (error: any): Promise<any> => {
      const { status } = error?.response || {};
      if (typeof error?.response === 'undefined') {
        return Promise.reject(error);
      }
      if (status === ErrorCode.UNAUTHORIZED) {
        window.location.href = 'http://localhost:3000/login';
      }
      return Promise.reject(error);
    }
  );
};