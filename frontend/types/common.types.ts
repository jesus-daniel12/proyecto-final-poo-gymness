export interface ProblemDetail {
  type: string
  title: string
  status: number
  detail: string
  errores?: { [key: string]: string }
}

export interface ApiResponse<T> {
  data?: T
  error?: ProblemDetail
}
