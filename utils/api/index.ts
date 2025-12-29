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
    baseURL: url
      ? url
      : "https://kamala-driveable-overfavorably.ngrok-free.dev/v0", //"https://kamala-driveable-overfavorably.ngrok-free.dev/v0" http://localhost:3000/v0,
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
