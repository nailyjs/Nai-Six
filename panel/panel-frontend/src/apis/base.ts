import axios from 'axios'

export const useAxios = axios.create({
  timeout: 10000
})
