import axios from 'axios';
import { API_URL } from '@env';
// import { getToken, setToken } from './storage.service';

export default {
  _401Intercepter: null,

  init() {
    axios.defaults.baseURL = API_URL;
    axios.defaults.timeout = 5000;
  },

  setHeader(accessToken) {
    axios.defaults.headers.Authorization = `Bearer ${accessToken}`;
  },

  get(resource, params) {
    return axios.get(resource, params);
  },

  post(resource, data) {
    return axios.post(resource, data);
  },

  put(resource, data) {
    return axios.put(resource, data);
  },

  delete(resource) {
    return axios.delete(resource);
  },

  customRequest(config) {
    return axios(config);
  },

  mount401Intercepter() {
    this._401Intercepter = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        // if (error.code === 401) {
        //   try {
        //     let tokens = await getToken();
        //     if (tokens) {
        //       const tokens = await refreshToken(tokens);
        //       setToken(tokens);
        //       this.setHeader(tokens.accessToken);
        //     }
        //   } catch (e) {
        //     return Promise.reject(e);
        //   }
        // }
        // return Promise.reject(error);
      }
    );
  },

  unmount401Intercepter() {
    axios.interceptors.response.eject(this._401Intercepter);
  },
};
