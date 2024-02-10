import axios, { AxiosError } from "axios";

export function createApiInstance(baseURL: string = "") {
  const instance = axios.create({
    baseURL,
  });
  instance.interceptors.request.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );
  return instance;
}
