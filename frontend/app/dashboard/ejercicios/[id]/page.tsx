"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { EjercicioDetailCard } from "@/components/ejercicios/ejercicio-detail-card"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { ErrorAlert } from "@/components/common/error-alert"
import { ejercicioService } from "@/services/ejercicio.service"
import type { Ejercicio } from "@/types/ejercicio.types"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function EjercicioDetailPage() {
  const params = useParams()
  const ejercicioId = params.id as string
  const [ejercicio, setEjercicio] = useState<Ejercicio | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadEjercicio = async () => {
      try {
        setIsLoading(true)
        setError(null)
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

  return (
    <DashboardLayout allowedRoles={["ADMIN"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Detalles del Ejercicio</h1>
          <Link href="/dashboard/ejercicios">
            <Button variant="outline">Volver</Button>
          </Link>
        </div>

        {error && <ErrorAlert title="Error" message={error} onDismiss={() => setError(null)} />}

        {isLoading ? (
          <LoadingSpinner />
        ) : ejercicio ? (
          <div className="space-y-6">
            <EjercicioDetailCard ejercicio={ejercicio} />
            <div className="flex gap-2">
              <Link href={`/dashboard/ejercicios/${ejercicioId}/edit`}>
                <Button>Editar</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Ejercicio no encontrado</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
