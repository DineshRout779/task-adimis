import axios, { AxiosInstance } from 'axios';

export const axiosClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const err = error.response;
    console.error(`Looks like there is an error: `, err);
    return Promise.reject(err);
  }
);
