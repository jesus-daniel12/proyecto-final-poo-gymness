"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { ErrorAlert } from "@/components/common/error-alert"
import { SuccessAlert } from "@/components/common/success-alert"
import { planService } from "@/services/plan.service"
import type { Plan } from "@/types/plan.types"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function PlanEditPage() {
  const params = useParams()
  const router = useRouter()
  const planId = params.id as string

  const [plan, setPlan] = useState<Plan | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const loadPlan = async () => {
      try {
        setIsLoading(true)
        const data = await planService.getById(planId)
        setPlan(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar plan")
      } finally {
        setIsLoading(false)
      }
    }
    loadPlan()
  }, [planId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!plan) return
    const { name, value } = e.target
    const numFields = ["precio", "sesionesIncluidas", "duracionMeses"]
    setPlan({
      ...plan,
      [name]: numFields.includes(name) ? Number.parseFloat(value) : value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!plan) return

    try {
      setIsSaving(true)
      setError(null)
      await planService.update(planId, plan)
      setSuccess(true)
      setTimeout(() => router.push(`/dashboard/planes/${planId}`), 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar plan")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <DashboardLayout allowedRoles={["ADMIN"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Editar Plan</h1>
          <Link href={`/dashboard/planes/${planId}`}>
            <Button variant="outline">Cancelar</Button>
          </Link>
        </div>

        {error && <ErrorAlert title="Error" message={error} onDismiss={() => setError(null)} />}
        {success && <SuccessAlert title="Éxito" message="Plan actualizado correctamente" />}

        {isLoading ? (
          <LoadingSpinner />
        ) : plan ? (
          <Card>
            <CardHeader>
              <CardTitle>Información del Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input id="nombre" name="nombre" value={plan.nombre} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="precio">Precio</Label>
                    <Input
                      id="precio"
                      name="precio"
                      type="number"
                      step="0.01"
                      value={plan.precio}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="descripcion">Descripción</Label>
                    <Textarea id="descripcion" name="descripcion" value={plan.descripcion} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="sesionesIncluidas">Sesiones Incluidas</Label>
                    <Input
                      id="sesionesIncluidas"
                      name="sesionesIncluidas"
                      type="number"
                      value={plan.sesionesIncluidas || 0}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="duracionMeses">Duración (meses)</Label>
                    <Input
                      id="duracionMeses"
                      name="duracionMeses"
                      type="number"
                      value={plan.duracionMeses || 0}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="beneficios">Beneficios</Label>
                    <Textarea id="beneficios" name="beneficios" value={plan.beneficios || ""} onChange={handleChange} />
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
            <p className="text-muted-foreground">Plan no encontrado</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
