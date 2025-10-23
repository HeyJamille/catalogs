// Biblioteca
import axios from "axios";

export function setupApiClient({
  token,
  url,
}: {
  token?: string;
  url?: string;
}) {
  const api = axios.create({
    baseURL: url ? url : "http://localhost:3001/v1",
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
