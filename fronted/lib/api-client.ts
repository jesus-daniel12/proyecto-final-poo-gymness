import axios, { type AxiosInstance, type AxiosError } from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    })

    // Request interceptor to add JWT token
    this.client.interceptors.request.use(
      (config) => {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error),
    )

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          if (typeof window !== "undefined") {
            localStorage.removeItem("token")
            localStorage.removeItem("usuario")
            window.location.href = "/login"
          }
        }
        return Promise.reject(error)
      },
    )
  }

  public getInstance(): AxiosInstance {
    return this.client
  }
}

export const apiClient = new ApiClient()
export default apiClient.getInstance()
