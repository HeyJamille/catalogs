// Biblioteca
import axios from "axios";

export function setupApiClient(token?: string) {
  const api = axios.create({
    baseURL: "https://catalogsapi.vercel.app/v1",
  });

  api.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },

    (error) => {
      return Promise.reject(error);
    }
  );

  return api;
}
