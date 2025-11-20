"use client"

import { useCallback, useState } from "react"

interface UseAsyncOptions {
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

export function useAsync<T = any>(asyncFunction: () => Promise<T>, immediate = true, options?: UseAsyncOptions) {
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle")
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<any>(null)

  const execute = useCallback(async () => {
    setStatus("pending")
    setData(null)
    setError(null)
    try {
      const response = await asyncFunction()
      setData(response)
      setStatus("success")
      options?.onSuccess?.(response)
      return response
    } catch (err) {
      setError(err)
      setStatus("error")
      options?.onError?.(err)
      throw err
    }
  }, [asyncFunction, options])

  useState(() => {
    if (immediate) {
      execute()
    }
  })

  return {
    execute,
    status,
    data,
    error,
    isLoading: status === "pending",
    isSuccess: status === "success",
    isError: status === "error",
  }
}
