export interface Plan {
  id: string
  nombre: string
  descripcion: string
  precio: number
  clienteIds?: string[]
  profesionalIds?: string[]
  createdAt: string
  updatedAt: string
}

export interface PlanFormData {
  nombre: string
  descripcion: string
  precio: number
}
