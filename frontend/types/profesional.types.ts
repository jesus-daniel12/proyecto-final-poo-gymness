export interface Profesional {
  id: string
  nombre: string
  apellido: string
  documento: string
  email: string
  telefono: string
  matricula: string
  estado: "ACTIVO" | "INACTIVO"
  especialidad: string
  planIds?: string[]
  createdAt: string
  updatedAt: string
}

export interface ProfesionalFormData {
  nombre: string
  apellido: string
  documento: string
  email: string
  telefono: string
  matricula: string
  estado: "ACTIVO" | "INACTIVO"
  especialidad: string
}
