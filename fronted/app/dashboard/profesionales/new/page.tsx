"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { profesionalService } from "@/services/profesional.service"
import type { ProfesionalFormData } from "@/types/profesional.types"
import { getErrorMessage } from "@/utils/error-handler"

export default function NewProfesionalPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<ProfesionalFormData>({
    nombre: "",
    apellido: "",
    documento: "",
    email: "",
    telefono: "",
    matricula: "",
    estado: "ACTIVO",
    especialidad: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)

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
    if (!formData.apellido) newErrors.apellido = "Last name is required"
    if (!formData.documento) newErrors.documento = "Document is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.telefono) newErrors.telefono = "Phone is required"
    if (!formData.matricula) newErrors.matricula = "License is required"
    if (!formData.especialidad) newErrors.especialidad = "Specialty is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      setIsLoading(true)
      await profesionalService.create(formData)
      router.push("/dashboard/profesionales")
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
          <h1 className="text-3xl font-bold">Crear Profesional</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Información del Profesional</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.general && (
                <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">{errors.general}</div>
              )}

              <div className="grid grid-cols-2 gap-4">
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
                  <label className="text-sm font-medium">Apellido</label>
                  <Input
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    className={errors.apellido ? "border-destructive" : ""}
                  />
                  {errors.apellido && <p className="text-xs text-destructive">{errors.apellido}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Documento</label>
                <Input
                  name="documento"
                  value={formData.documento}
                  onChange={handleChange}
                  maxLength={8}
                  className={errors.documento ? "border-destructive" : ""}
                />
                {errors.documento && <p className="text-xs text-destructive">{errors.documento}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Teléfono</label>
                <Input
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className={errors.telefono ? "border-destructive" : ""}
                />
                {errors.telefono && <p className="text-xs text-destructive">{errors.telefono}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Matrícula</label>
                <Input
                  name="matricula"
                  value={formData.matricula}
                  onChange={handleChange}
                  className={errors.matricula ? "border-destructive" : ""}
                />
                {errors.matricula && <p className="text-xs text-destructive">{errors.matricula}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Especialidad</label>
                <Input
                  name="especialidad"
                  value={formData.especialidad}
                  onChange={handleChange}
                  className={errors.especialidad ? "border-destructive" : ""}
                />
                {errors.especialidad && <p className="text-xs text-destructive">{errors.especialidad}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Estado</label>
                <Select value={formData.estado} onValueChange={(value) => handleSelectChange("estado", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVO">Activo</SelectItem>
                    <SelectItem value="INACTIVO">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
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
