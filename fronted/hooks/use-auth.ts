"use client"

import { useEffect, useState, useCallback } from "react"
import { authService } from "@/services/auth.service"
import type { LoginRequest, RegisterRequest, Usuario } from "@/types/auth.types"

export const useAuth = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize from localStorage
  useEffect(() => {
    const savedToken = authService.getToken()
    const savedUsuario = authService.getUsuario()
    if (savedToken && savedUsuario) {
      setToken(savedToken)
      setUsuario(savedUsuario)
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(async (credentials: LoginRequest) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await authService.login(credentials)
      authService.saveToken(response.token, response.usuario)
      setToken(response.token)
      setUsuario(response.usuario)
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || "Login failed"
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(async (data: RegisterRequest) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await authService.register(data)
      authService.saveToken(response.token, response.usuario)
      setToken(response.token)
      setUsuario(response.usuario)
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || "Registration failed"
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setToken(null)
    setUsuario(null)
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
