// Biblioteca
import axios from "axios";

export function setupApiClient(token?: string) {
  const api = axios.create({
    baseURL: "https://catalogsapi.vercel.app/v1",
    validateStatus: (status) => status < 500,
  });

  api.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  return api;
}