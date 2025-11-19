"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ejercicioService } from "@/services/ejercicio.service"
import type { EjercicioFormData } from "@/types/ejercicio.types"
import { getErrorMessage } from "@/utils/error-handler"

export default function NewEjercicioPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<EjercicioFormData>({
    nombre: "",
    descripcion: "",
    instrucciones: "",
    videoUrl: "",
    imagenUrl: "",
    activo: true,
    tiposEjercicio: [],
    musculosObjetivo: [],
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [tiposInput, setTiposInput] = useState("")
  const [musculosInput, setMusculosInput] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleAddTipo = () => {
    if (tiposInput.trim() && !formData.tiposEjercicio.includes(tiposInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tiposEjercicio: [...prev.tiposEjercicio, tiposInput.trim()],
      }))
      setTiposInput("")
    }
  }

  const handleRemoveTipo = (tipo: string) => {
    setFormData((prev) => ({
      ...prev,
      tiposEjercicio: prev.tiposEjercicio.filter((t) => t !== tipo),
    }))
  }

  const handleAddMusculo = () => {
    if (musculosInput.trim() && !formData.musculosObjetivo.includes(musculosInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        musculosObjetivo: [...prev.musculosObjetivo, musculosInput.trim()],
      }))
      setMusculosInput("")
    }
  }

  const handleRemoveMusculo = (musculo: string) => {
    setFormData((prev) => ({
      ...prev,
      musculosObjetivo: prev.musculosObjetivo.filter((m) => m !== musculo),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { [key: string]: string } = {}

    if (!formData.nombre) newErrors.nombre = "Name is required"
    if (!formData.descripcion) newErrors.descripcion = "Description is required"
    if (!formData.instrucciones) newErrors.instrucciones = "Instructions are required"
    if (formData.tiposEjercicio.length === 0) newErrors.tiposEjercicio = "At least one exercise type is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      setIsLoading(true)
      await ejercicioService.create(formData)
      router.push("/dashboard/ejercicios")
    } catch (error: any) {
      setErrors({ general: getErrorMessage(error) })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout allowedRoles={["ADMIN"]}>
      <div className="max-w-2xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Crear Ejercicio</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Información del Ejercicio</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.general && (
                <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">{errors.general}</div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Nombre</label>
                <Input
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={errors.nombre ? "border-destructive" : ""}
                />
                {errors.nombre && <p className="text-xs text-destructive">{errors.nombre}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Descripción</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border border-border rounded-md text-sm ${
                    errors.descripcion ? "border-destructive" : ""
                  }`}
                  rows={3}
                />
                {errors.descripcion && <p className="text-xs text-destructive">{errors.descripcion}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Instrucciones</label>
                <textarea
                  name="instrucciones"
                  value={formData.instrucciones}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border border-border rounded-md text-sm ${
                    errors.instrucciones ? "border-destructive" : ""
                  }`}
                  rows={3}
                />
                {errors.instrucciones && <p className="text-xs text-destructive">{errors.instrucciones}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Video URL</label>
                  <Input name="videoUrl" value={formData.videoUrl} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Imagen URL</label>
                  <Input name="imagenUrl" value={formData.imagenUrl} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tipos de Ejercicio</label>
                <div className="flex gap-2">
                  <Input
                    value={tiposInput}
                    onChange={(e) => setTiposInput(e.target.value)}
                    placeholder="Ej: Cardio, Fuerza"
                  />
                  <Button type="button" variant="outline" onClick={handleAddTipo}>
                    Agregar
                  </Button>
                </div>
                {errors.tiposEjercicio && <p className="text-xs text-destructive">{errors.tiposEjercicio}</p>}
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tiposEjercicio.map((tipo) => (
                    <div
                      key={tipo}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {tipo}
                      <button
                        type="button"
                        onClick={() => handleRemoveTipo(tipo)}
                        className="text-primary hover:font-bold"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Músculos Objetivo</label>
                <div className="flex gap-2">
                  <Input
                    value={musculosInput}
                    onChange={(e) => setMusculosInput(e.target.value)}
                    placeholder="Ej: Pecho, Espalda"
                  />
                  <Button type="button" variant="outline" onClick={handleAddMusculo}>
                    Agregar
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.musculosObjetivo.map((musculo) => (
                    <div
                      key={musculo}
                      className="bg-secondary/10 text-secondary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {musculo}
                      <button type="button" onClick={() => handleRemoveMusculo(musculo)} className="hover:font-bold">
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
