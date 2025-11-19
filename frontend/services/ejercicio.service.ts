import api from "@/lib/api-client"
import type { Ejercicio, EjercicioFormData } from "@/types/ejercicio.types"

export const ejercicioService = {
  getAll: async (): Promise<Ejercicio[]> => {
    const response = await api.get("/api/ejercicios")
    return response.data
  },

  getById: async (id: string): Promise<Ejercicio> => {
    const response = await api.get(`/api/ejercicios/${id}`)
    return response.data
  },

  create: async (data: EjercicioFormData): Promise<Ejercicio> => {
    const response = await api.post("/api/ejercicios", data)
    return response.data
  },

  update: async (id: string, data: EjercicioFormData): Promise<Ejercicio> => {
    const response = await api.put(`/api/ejercicios/${id}`, data)
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/ejercicios/${id}`)
  },
}
