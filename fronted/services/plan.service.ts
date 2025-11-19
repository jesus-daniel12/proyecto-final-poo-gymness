import api from "@/lib/api-client"
import type { Plan, PlanFormData } from "@/types/plan.types"

export const planService = {
  getAll: async (): Promise<Plan[]> => {
    const response = await api.get("/api/planes")
    return response.data
  },

  getById: async (id: string): Promise<Plan> => {
    const response = await api.get(`/api/planes/${id}`)
    return response.data
  },

  create: async (data: PlanFormData): Promise<Plan> => {
    const response = await api.post("/api/planes", data)
    return response.data
  },

  update: async (id: string, data: PlanFormData): Promise<Plan> => {
    const response = await api.put(`/api/planes/${id}`, data)
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/planes/${id}`)
  },
}
