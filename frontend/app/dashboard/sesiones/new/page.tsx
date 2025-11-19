"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { sesionService } from "@/services/sesion.service"
import { rutinaService } from "@/services/rutina.service"
import type { SesionFormData } from "@/types/sesion.types"
import type { Rutina } from "@/types/rutina.types"
import { getErrorMessage } from "@/utils/error-handler"
import { LoadingSpinner } from "@/components/common/loading-spinner"

export default function NewSesionPage() {
  const router = useRouter()
  const [rutinas, setRutinas] = useState<Rutina[]>([])
  const [formData, setFormData] = useState<SesionFormData>({
    nombre: "",
    fechaRealizacion: "",
    estado: "PENDIENTE",
    rutinaId: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    loadRutinas()
  }, [])

  const loadRutinas = async () => {
    try {
      const data = await rutinaService.getAll()
      setRutinas(data)
    } catch (error) {
      console.error("Error loading rutinas:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { [key: string]: string } = {}

    if (!formData.nombre) newErrors.nombre = "Name is required"
    if (!formData.fechaRealizacion) newErrors.fechaRealizacion = "Date is required"
    if (!formData.rutinaId) newErrors.rutinaId = "Routine is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      setIsSubmitting(true)
      await sesionService.create(formData)
      router.push("/dashboard/sesiones")
    } catch (error: any) {
      setErrors({ general: getErrorMessage(error) })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <DashboardLayout allowedRoles={["PROFESIONAL"]}>
      <div className="max-w-2xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Crear Sesión</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Información de la Sesión</CardTitle>
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
                <label className="text-sm font-medium">Fecha</label>
                <Input
                  type="datetime-local"
                  name="fechaRealizacion"
                  value={formData.fechaRealizacion}
                  onChange={handleChange}
                  className={errors.fechaRealizacion ? "border-destructive" : ""}
                />
                {errors.fechaRealizacion && <p className="text-xs text-destructive">{errors.fechaRealizacion}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Estado</label>
                <Select value={formData.estado} onValueChange={(value) => handleSelectChange("estado", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDIENTE">Pendiente</SelectItem>
                    <SelectItem value="COMPLETADA">Completada</SelectItem>
                    <SelectItem value="CANCELADA">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Rutina</label>
                <Select value={formData.rutinaId} onValueChange={(value) => handleSelectChange("rutinaId", value)}>
                  <SelectTrigger className={errors.rutinaId ? "border-destructive" : ""}>
                    <SelectValue placeholder="Selecciona una rutina" />
                  </SelectTrigger>
                  <SelectContent>
                    {rutinas.map((rutina) => (
                      <SelectItem key={rutina.id} value={rutina.id}>
                        {rutina.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.rutinaId && <p className="text-xs text-destructive">{errors.rutinaId}</p>}
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
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
