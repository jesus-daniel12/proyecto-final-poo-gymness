"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { ErrorAlert } from "@/components/common/error-alert"
import { SuccessAlert } from "@/components/common/success-alert"
import { profesionalService } from "@/services/profesional.service"
import type { Profesional } from "@/types/profesional.types"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProfesionalEditPage() {
  const params = useParams()
  const router = useRouter()
  const profesionalId = params.id as string

  const [profesional, setProfesional] = useState<Profesional | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const loadProfesional = async () => {
      try {
        setIsLoading(true)
        const data = await profesionalService.getById(profesionalId)
        setProfesional(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar profesional")
      } finally {
        setIsLoading(false)
      }
    }
    loadProfesional()
  }, [profesionalId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!profesional) return
    const { name, value } = e.target
    setProfesional({ ...profesional, [name]: value })
  }

  const handleStateChange = (value: string) => {
    if (!profesional) return
    setProfesional({ ...profesional, estado: value as "ACTIVO" | "INACTIVO" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profesional) return

    try {
      setIsSaving(true)
      setError(null)
      await profesionalService.update(profesionalId, profesional)
      setSuccess(true)
      setTimeout(() => router.push(`/dashboard/profesionales/${profesionalId}`), 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar profesional")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <DashboardLayout allowedRoles={["ADMIN"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Editar Profesional</h1>
          <Link href={`/dashboard/profesionales/${profesionalId}`}>
            <Button variant="outline">Cancelar</Button>
          </Link>
        </div>

        {error && <ErrorAlert title="Error" message={error} onDismiss={() => setError(null)} />}
        {success && <SuccessAlert title="Éxito" message="Profesional actualizado correctamente" />}

        {isLoading ? (
          <LoadingSpinner />
        ) : profesional ? (
          <Card>
            <CardHeader>
              <CardTitle>Información del Profesional</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input id="nombre" name="nombre" value={profesional.nombre} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="apellido">Apellido</Label>
                    <Input id="apellido" name="apellido" value={profesional.apellido} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={profesional.email} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input id="telefono" name="telefono" value={profesional.telefono} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="documento">Documento</Label>
                    <Input id="documento" name="documento" value={profesional.documento} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="matricula">Matrícula</Label>
                    <Input id="matricula" name="matricula" value={profesional.matricula} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="especialidad">Especialidad</Label>
                    <Input
                      id="especialidad"
                      name="especialidad"
                      value={profesional.especialidad}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="experiencia">Experiencia (años)</Label>
                    <Input
                      id="experiencia"
                      name="experiencia"
                      type="number"
                      value={profesional.experiencia || 0}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="estado">Estado</Label>
                    <Select value={profesional.estado} onValueChange={handleStateChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ACTIVO">Activo</SelectItem>
                        <SelectItem value="INACTIVO">Inactivo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Guardando..." : "Guardar Cambios"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Profesional no encontrado</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
