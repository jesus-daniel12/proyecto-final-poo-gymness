import api from "@/lib/api-client"
import type { LoginRequest, RegisterRequest, LoginResponse, Usuario } from "@/types/auth.types"

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    // ← AGREGAR ESTA LÍNEA para debug
    console.log("🔍 Credenciales enviadas:", credentials)
    
    const response = await api.post("/api/auth/login", credentials)
    
    // ← AGREGAR ESTA LÍNEA para debug
    console.log("✅ Respuesta recibida:", response.data)
    
    return response.data
  },
  register: async (data: RegisterRequest): Promise<LoginResponse> => {
    const response = await api.post("/api/usuarios/registrar", data)
    return response.data
  },
  saveToken: (token: string, usuario: Usuario) => {
    localStorage.setItem("token", token)
    localStorage.setItem("usuario", JSON.stringify(usuario))
  },
  getToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token")
    }
    return null
  },
  getUsuario: (): Usuario | null => {
    if (typeof window !== "undefined") {
      const usuario = localStorage.getItem("usuario")
      return usuario ? JSON.parse(usuario) : null
    }
    return null
  },
  logout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("usuario")
  },
  isAuthenticated: (): boolean => {
    return !!authService.getToken()
  },
}