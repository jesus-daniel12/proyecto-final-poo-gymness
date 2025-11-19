"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { rutinaService } from "@/services/rutina.service"
import { clienteService } from "@/services/cliente.service"
import type { RutinaFormData } from "@/types/rutina.types"
import type { Cliente } from "@/types/cliente.types"
import { getErrorMessage } from "@/utils/error-handler"
import { LoadingSpinner } from "@/components/common/loading-spinner"

export default function NewRutinaPage() {
  const router = useRouter()
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [formData, setFormData] = useState<RutinaFormData>({
    nombre: "",
    descripcion: "",
    objetivoRutina: "",
    clienteId: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    loadClientes()
  }, [])

  const loadClientes = async () => {
    try {
      const data = await clienteService.getAll()
      setClientes(data)
    } catch (error) {
      console.error("Error loading clientes:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    if (!formData.descripcion) newErrors.descripcion = "Description is required"
    if (!formData.objetivoRutina) newErrors.objetivoRutina = "Goal is required"
    if (!formData.clienteId) newErrors.clienteId = "Client is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      setIsSubmitting(true)
      await rutinaService.create(formData)
      router.push("/dashboard/rutinas")
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
          <h1 className="text-3xl font-bold">Crear Rutina</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Información de la Rutina</CardTitle>
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
                <label className="text-sm font-medium">Objetivo</label>
                <Input
                  name="objetivoRutina"
                  value={formData.objetivoRutina}
                  onChange={handleChange}
                  placeholder="Ej: Pérdida de peso, Ganancia muscular"
                  className={errors.objetivoRutina ? "border-destructive" : ""}
                />
                {errors.objetivoRutina && <p className="text-xs text-destructive">{errors.objetivoRutina}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Cliente</label>
                <Select value={formData.clienteId} onValueChange={(value) => handleSelectChange("clienteId", value)}>
                  <SelectTrigger className={errors.clienteId ? "border-destructive" : ""}>
                    <SelectValue placeholder="Selecciona un cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {clientes.map((cliente) => (
                      <SelectItem key={cliente.id} value={cliente.id}>
                        {cliente.nombre} {cliente.apellido}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.clienteId && <p className="text-xs text-destructive">{errors.clienteId}</p>}
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
