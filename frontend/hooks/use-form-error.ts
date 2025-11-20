"use client"

import { useState, useCallback } from "react"
import { getFieldErrors, getErrorMessage } from "@/utils/error-handler"

export function useFormError() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [generalError, setGeneralError] = useState<string | null>(null)

  const clearErrors = useCallback(() => {
    setErrors({})
    setGeneralError(null)
  }, [])

  const clearFieldError = useCallback((field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }, [])

  const handleError = useCallback((error: any) => {
    const fieldErrors = getFieldErrors(error)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
    } else {
      setGeneralError(getErrorMessage(error))
    }
  }, [])

  return {
    errors,
    generalError,
    setErrors,
    setGeneralError,
    clearErrors,
    clearFieldError,
    handleError,
    hasErrors: Object.keys(errors).length > 0 || !!generalError,
  }
}
