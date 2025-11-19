export interface Ejercicio {
  id: string
  nombre: string
  descripcion: string
  instrucciones: string
  videoUrl?: string
  imagenUrl?: string
  activo: boolean
  tiposEjercicio: string[]
  musculosObjetivo: string[]
  createdAt: string
  updatedAt: string
}

export interface EjercicioFormData {
  nombre: string
  descripcion: string
  instrucciones: string
  videoUrl?: string
  imagenUrl?: string
  activo: boolean
  tiposEjercicio: string[]
  musculosObjetivo: string[]
}
