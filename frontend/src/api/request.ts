import axios from 'axios'

const _axios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

_axios.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
)

_axios.interceptors.response.use(
  res => res.data,
  error => {
    console.error('[API Error]', error.response?.status, error.message)
    return Promise.reject(error)
  }
)

const request = {
  get: (url: string, config?: object): Promise<any> => _axios.get(url, config),
  post: (url: string, data?: unknown, config?: object): Promise<any> => _axios.post(url, data, config),
}

export default request
