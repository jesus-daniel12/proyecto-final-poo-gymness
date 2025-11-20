import api from "@/lib/api-client"
import type { Sesion, SesionFormData, EjercicioSesion } from "@/types/sesion.types"

export const sesionService = {
  getAll: async (): Promise<Sesion[]> => {
    const response = await api.get("/api/sesiones")
    return response.data
  },

  getById: async (id: string): Promise<Sesion> => {
    const response = await api.get(`/api/sesiones/${id}`)
    return response.data
  },

  create: async (data: SesionFormData): Promise<Sesion> => {
    const response = await api.post("/api/sesiones", data)
    return response.data
  },

  update: async (id: string, data: SesionFormData): Promise<Sesion> => {
    const response = await api.put(`/api/sesiones/${id}`, data)
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/sesiones/${id}`)
  },

  getEjerciciosSesion: async (): Promise<EjercicioSesion[]> => {
    const response = await api.get("/api/ejercicio-sesion")
    return response.data
  },

  addEjercicioToSesion: async (
    data: Omit<EjercicioSesion, "id" | "createdAt" | "updatedAt">,
  ): Promise<EjercicioSesion> => {
    const response = await api.post("/api/ejercicio-sesion", data)
    return response.data
  },

  updateEjercicioSesion: async (id: string, data: Partial<EjercicioSesion>): Promise<EjercicioSesion> => {
    const response = await api.put(`/api/ejercicio-sesion/${id}`, data)
    return response.data
  },

  deleteEjercicioSesion: async (id: string): Promise<void> => {
    await api.delete(`/api/ejercicio-sesion/${id}`)
  },
}
