import api from "@/lib/api-client"
import type { Cliente, ClienteFormData } from "@/types/cliente.types"

export const clienteService = {
  getAll: async (): Promise<Cliente[]> => {
    const response = await api.get("/api/clientes")
    return response.data
  },

  getById: async (id: string): Promise<Cliente> => {
    const response = await api.get(`/api/clientes/${id}`)
    return response.data
  },

  create: async (data: ClienteFormData): Promise<Cliente> => {
    const response = await api.post("/api/clientes", data)
    return response.data
  },

  update: async (id: string, data: ClienteFormData): Promise<Cliente> => {
    const response = await api.put(`/api/clientes/${id}`, data)
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/clientes/${id}`)
  },
}
