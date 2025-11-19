"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { ErrorAlert } from "@/components/common/error-alert"
import { SuccessAlert } from "@/components/common/success-alert"
import { ejercicioService } from "@/services/ejercicio.service"
import type { Ejercicio } from "@/types/ejercicio.types"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export default function EjercicioEditPage() {
  const params = useParams()
  const router = useRouter()
  const ejercicioId = params.id as string

  const [ejercicio, setEjercicio] = useState<Ejercicio | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const loadEjercicio = async () => {
      try {
        setIsLoading(true)
        const data = await ejercicioService.getById(ejercicioId)
        setEjercicio(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar ejercicio")
      } finally {
        setIsLoading(false)
      }
    }
    loadEjercicio()
  }, [ejercicioId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!ejercicio) return
    const { name, value } = e.target
    setEjercicio({ ...ejercicio, [name]: value })
  }

  const handleCheckChange = (checked: boolean) => {
    if (!ejercicio) return
    setEjercicio({ ...ejercicio, activo: checked })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ejercicio) return

    try {
      setIsSaving(true)
      setError(null)
      await ejercicioService.update(ejercicioId, ejercicio)
      setSuccess(true)
      setTimeout(() => router.push(`/dashboard/ejercicios/${ejercicioId}`), 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar ejercicio")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <DashboardLayout allowedRoles={["ADMIN"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Editar Ejercicio</h1>
          <Link href={`/dashboard/ejercicios/${ejercicioId}`}>
            <Button variant="outline">Cancelar</Button>
          </Link>
        </div>

        {error && <ErrorAlert title="Error" message={error} onDismiss={() => setError(null)} />}
        {success && <SuccessAlert title="Éxito" message="Ejercicio actualizado correctamente" />}

        {isLoading ? (
          <LoadingSpinner />
        ) : ejercicio ? (
          <Card>
            <CardHeader>
              <CardTitle>Información del Ejercicio</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input id="nombre" name="nombre" value={ejercicio.nombre} onChange={handleChange} />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <Checkbox id="activo" checked={ejercicio.activo} onCheckedChange={handleCheckChange} />
                    <Label htmlFor="activo" className="cursor-pointer">
                      Activo
                    </Label>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="descripcion">Descripción</Label>
                    <Textarea
                      id="descripcion"
                      name="descripcion"
                      value={ejercicio.descripcion}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dificultad">Dificultad</Label>
                    <Input
                      id="dificultad"
                      name="dificultad"
                      value={ejercicio.dificultad || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="equipoRequerido">Equipo Requerido</Label>
                    <Input
                      id="equipoRequerido"
                      name="equipoRequerido"
                      value={ejercicio.equipoRequerido || ""}
                      onChange={handleChange}
                    />
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
            <p className="text-muted-foreground">Ejercicio no encontrado</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
