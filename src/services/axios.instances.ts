import axios from 'axios';

const AxiosFactory = (function(): any {
  let instance: any;
  function AxiosClass(): any {
    return axios.create({
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Cache-Control': 'no-cache',
        Accept: 'application/json',
      },
    });
  }

  return {
    getInstance(): any {
      if (instance == null) {
        instance = new (AxiosClass as any)();
        instance.constructor = null;
      }
      return instance;
    },
  };
})();

const apiClient = AxiosFactory.getInstance();

export default apiClient;