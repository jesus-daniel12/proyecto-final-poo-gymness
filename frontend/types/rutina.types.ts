export interface Rutina {
  id: string
  nombre: string
  descripcion: string
  fechaCreacion: string
  objetivoRutina: string
  sesiones?: string[]
  clienteId?: string
  createdAt: string
  updatedAt: string
}

export interface RutinaFormData {
  nombre: string
  descripcion: string
  objetivoRutina: string
  clienteId?: string
}
