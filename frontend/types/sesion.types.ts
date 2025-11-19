export interface Sesion {
  id: string
  nombre: string
  fechaRealizacion: string
  estado: "COMPLETADA" | "PENDIENTE" | "CANCELADA"
  rutinaId: string
  ejercicios?: EjercicioSesion[]
  createdAt: string
  updatedAt: string
}

export interface EjercicioSesion {
  id: string
  duracion: number
  caloriaQuemada: number
  series: number
  repeticiones: number
  pesoUtilizado: number
  rir: number
  sesionId: string
  ejercicioId: string
}

export interface SesionFormData {
  nombre: string
  fechaRealizacion: string
  estado: "COMPLETADA" | "PENDIENTE" | "CANCELADA"
  rutinaId: string
}
