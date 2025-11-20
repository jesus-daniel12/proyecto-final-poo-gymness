export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  nombre: string
  apellido: string
  documento: string
}

export interface LoginResponse {
  token: string
  usuario: Usuario
}

export interface Usuario {
  id: string
  email: string
  nombre: string
  apellido: string
  documento: string
  rol: "ADMIN" | "CLIENTE" | "PROFESIONAL"
}

export interface AuthContextType {
  usuario: Usuario | null
  token: string | null
  isLoading: boolean
  login: (credentials: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}
