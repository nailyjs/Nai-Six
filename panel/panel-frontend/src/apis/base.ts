import { type AxiosInstance } from 'axios'

declare global {
  interface Window {
    usePassport: AxiosInstance
  }
  export const usePassport: AxiosInstance
}

export function setPassport(axios: AxiosInstance, serverName: string) {
  window.usePassport = axios
  window.usePassport.interceptors.request.use(
    (config) => {
      config.withCredentials = true
      const token = window.localStorage.getItem(`access_token_${serverName}`)
      if (token) config.headers.Authorization = `Bearer ${token}`
      return config
    },
    (error) => {
      console.error('请求拦截器错误')
      console.error(error)
      return Promise.reject(error)
    }
  )
}
