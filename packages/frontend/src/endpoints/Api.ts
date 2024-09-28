import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const NETWORK_TIMEOUT = 10_000 // 10 seconds timeout

class Api {
  axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      timeout: NETWORK_TIMEOUT,
      headers: {
        common: {
          'Content-Type': 'application/json'
        }
      }
    })
  }

  setSessionToken(sessionToken: string) {
    const authHeader = `Bearer ${sessionToken}`
    this.axiosInstance.defaults.headers.common['Authorization'] = authHeader
  }

  get(endpoint: string, config: AxiosRequestConfig) {
    return this.axiosInstance.get(endpoint, config)
  }

  post<T>(endpoint: string, payload: T, config?: AxiosRequestConfig) {
    return this.axiosInstance.post(endpoint, payload, config)
  }
}

// Api exported as a singleton
export default new Api()
