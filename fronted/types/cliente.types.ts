export interface Cliente {
  id: string
  nombre: string
  apellido: string
  documento: string
  direccion: string
  numero: string
  obraSocial: string
  fechaNacimiento: string
  planId?: string
  rutinaIds?: string[]
  createdAt: string
  updatedAt: string
}

export interface ClienteFormData {
  nombre: string
  apellido: string
  documento: string
  direccion: string
  numero: string
  obraSocial: string
  fechaNacimiento: string
  planId?: string
}
