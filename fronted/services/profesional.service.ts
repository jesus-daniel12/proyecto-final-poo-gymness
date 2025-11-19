import api from "@/lib/api-client"
import type { Profesional, ProfesionalFormData } from "@/types/profesional.types"

export const profesionalService = {
  getAll: async (): Promise<Profesional[]> => {
    const response = await api.get("/api/profesionales")
    return response.data
  },

  getById: async (id: string): Promise<Profesional> => {
    const response = await api.get(`/api/profesionales/${id}`)
    return response.data
  },

  create: async (data: ProfesionalFormData): Promise<Profesional> => {
    const response = await api.post("/api/profesionales", data)
    return response.data
  },

  update: async (id: string, data: ProfesionalFormData): Promise<Profesional> => {
    const response = await api.put(`/api/profesionales/${id}`, data)
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/profesionales/${id}`)
  },
}
