import api from "@/lib/api-client"
import type { Rutina, RutinaFormData } from "@/types/rutina.types"

export const rutinaService = {
  getAll: async (): Promise<Rutina[]> => {
    const response = await api.get("/api/rutinas")
    return response.data
  },

  getById: async (id: string): Promise<Rutina> => {
    const response = await api.get(`/api/rutinas/${id}`)
    return response.data
  },

  create: async (data: RutinaFormData): Promise<Rutina> => {
    const response = await api.post("/api/rutinas", data)
    return response.data
  },

  update: async (id: string, data: RutinaFormData): Promise<Rutina> => {
    const response = await api.put(`/api/rutinas/${id}`, data)
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/rutinas/${id}`)
  },
}
