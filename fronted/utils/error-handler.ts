import type { ProblemDetail } from "@/types/common.types"

export const getErrorMessage = (error: any): string => {
  if (error.response?.data) {
    const data = error.response.data as ProblemDetail
    return data.detail || data.title || "An error occurred"
  }
  return error.message || "An unexpected error occurred"
}

export const getFieldErrors = (error: any): { [key: string]: string } => {
  if (error.response?.data?.errores) {
    return error.response.data.errores
  }
  return {}
}

export const isNetworkError = (error: any): boolean => {
  return !error.response || (error.code && error.code === "ECONNABORTED")
}

export const is404Error = (error: any): boolean => {
  return error.response?.status === 404
}

export const is401Error = (error: any): boolean => {
  return error.response?.status === 401
}

export const is403Error = (error: any): boolean => {
  return error.response?.status === 403
}

export const is500Error = (error: any): boolean => {
  return error.response?.status && error.response.status >= 500
}

export const getErrorStatusCode = (error: any): number | null => {
  return error.response?.status || null
}

export const getErrorDetails = (error: any): string | null => {
  if (error.response?.data?.detail) {
    return error.response.data.detail
  }
  if (error.response?.data?.message) {
    return error.response.data.message
  }
  return null
}
