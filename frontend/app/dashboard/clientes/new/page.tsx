"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { clienteService } from "@/services/cliente.service"
import type { ClienteFormData } from "@/types/cliente.types"
import { getErrorMessage } from "@/utils/error-handler"

export default function NewClientePage() {
  const router = useRouter()
  const [formData, setFormData] = useState<ClienteFormData>({
    nombre: "",
    apellido: "",
    documento: "",
    direccion: "",
    numero: "",
    obraSocial: "",
    fechaNacimiento: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { [key: string]: string } = {}

    if (!formData.nombre) newErrors.nombre = "Name is required"
    if (!formData.apellido) newErrors.apellido = "Last name is required"
    if (!formData.documento) newErrors.documento = "Document is required"
    if (!formData.direccion) newErrors.direccion = "Address is required"
    if (!formData.numero) newErrors.numero = "Number is required"
    if (!formData.fechaNacimiento) newErrors.fechaNacimiento = "Date of birth is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      setIsLoading(true)
      await clienteService.create(formData)
      router.push("/dashboard/clientes")
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
          <h1 className="text-3xl font-bold">Crear Cliente</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Información del Cliente</CardTitle>
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
                <label className="text-sm font-medium">Documento (8 dígitos)</label>
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
                <label className="text-sm font-medium">Dirección</label>
                <Input
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  className={errors.direccion ? "border-destructive" : ""}
                />
                {errors.direccion && <p className="text-xs text-destructive">{errors.direccion}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Número</label>
                <Input
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  className={errors.numero ? "border-destructive" : ""}
                />
                {errors.numero && <p className="text-xs text-destructive">{errors.numero}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Obra Social</label>
                <Input name="obraSocial" value={formData.obraSocial} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Fecha de Nacimiento</label>
                <Input
                  type="date"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  className={errors.fechaNacimiento ? "border-destructive" : ""}
                />
                {errors.fechaNacimiento && <p className="text-xs text-destructive">{errors.fechaNacimiento}</p>}
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
