"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { planService } from "@/services/plan.service"
import type { PlanFormData } from "@/types/plan.types"
import { getErrorMessage } from "@/utils/error-handler"

export default function NewPlanPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<PlanFormData>({
    nombre: "",
    descripcion: "",
    precio: 0,
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "precio" ? Number.parseFloat(value) || 0 : value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { [key: string]: string } = {}

    if (!formData.nombre) newErrors.nombre = "Name is required"
    if (!formData.descripcion) newErrors.descripcion = "Description is required"
    if (formData.precio <= 0) newErrors.precio = "Price must be greater than 0"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      setIsLoading(true)
      await planService.create(formData)
      router.push("/dashboard/planes")
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
          <h1 className="text-3xl font-bold">Crear Plan</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Información del Plan</CardTitle>
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
                  rows={4}
                />
                {errors.descripcion && <p className="text-xs text-destructive">{errors.descripcion}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Precio</label>
                <Input
                  type="number"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  step="0.01"
                  className={errors.precio ? "border-destructive" : ""}
                />
                {errors.precio && <p className="text-xs text-destructive">{errors.precio}</p>}
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
