"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProfesionalDetailCard } from "@/components/profesionales/profesional-detail-card"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { ErrorAlert } from "@/components/common/error-alert"
import { profesionalService } from "@/services/profesional.service"
import type { Profesional } from "@/types/profesional.types"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProfesionalDetailPage() {
  const params = useParams()
  const profesionalId = params.id as string
  const [profesional, setProfesional] = useState<Profesional | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProfesional = async () => {
      try {
        setIsLoading(true)
        setError(null)
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

  return (
    <DashboardLayout allowedRoles={["ADMIN"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Detalles del Profesional</h1>
          <Link href="/dashboard/profesionales">
            <Button variant="outline">Volver</Button>
          </Link>
        </div>

        {error && <ErrorAlert title="Error" message={error} onDismiss={() => setError(null)} />}

        {isLoading ? (
          <LoadingSpinner />
        ) : profesional ? (
          <div className="space-y-6">
            <ProfesionalDetailCard profesional={profesional} />
            <div className="flex gap-2">
              <Link href={`/dashboard/profesionales/${profesionalId}/edit`}>
                <Button>Editar</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Profesional no encontrado</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
