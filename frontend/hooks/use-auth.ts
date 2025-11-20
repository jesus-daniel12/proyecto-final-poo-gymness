"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { authService } from "@/services/auth.service"
import type { LoginRequest, RegisterRequest, Usuario } from "@/types/auth.types"

export const useAuth = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const isMountedRef = useRef(true)

  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  useEffect(() => {
    const savedToken = authService.getToken()
    const savedUsuario = authService.getUsuario()

    if (isMountedRef.current) {
      if (savedToken && savedUsuario) {
        setToken(savedToken)
        setUsuario(savedUsuario)
      }
      setIsLoading(false)
    }
  }, [])

  const login = useCallback(async (credentials: LoginRequest) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await authService.login(credentials)

      authService.saveToken(response.token, response.usuario)

      if (isMountedRef.current) {
        setToken(response.token)
        setUsuario(response.usuario)
        setIsLoading(false)
      }
    } catch (err: any) {
      if (isMountedRef.current) {
        const errorMessage = err.response?.data?.detail || "Login failed"
        setError(errorMessage)
        setIsLoading(false)
      }
      throw err
    }
  }, [])

  const register = useCallback(async (data: RegisterRequest) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await authService.register(data)

      authService.saveToken(response.token, response.usuario)

      if (isMountedRef.current) {
        setToken(response.token)
        setUsuario(response.usuario)
        setIsLoading(false)
      }
    } catch (err: any) {
      if (isMountedRef.current) {
        const errorMessage = err.response?.data?.detail || "Registration failed"
        setError(errorMessage)
        setIsLoading(false)
      }
      throw err
    }
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    if (isMountedRef.current) {
      setToken(null)
      setUsuario(null)
    }
  }, [])

  return {
    usuario,
    token,
    isLoading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  }
}
