"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PlanDetailCard } from "@/components/planes/plan-detail-card"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { ErrorAlert } from "@/components/common/error-alert"
import { planService } from "@/services/plan.service"
import type { Plan } from "@/types/plan.types"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PlanDetailPage() {
  const params = useParams()
  const planId = params.id as string
  const [plan, setPlan] = useState<Plan | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPlan = async () => {
      try {
        setIsLoading(true)
        setError(null)
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

  return (
    <DashboardLayout allowedRoles={["ADMIN"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Detalles del Plan</h1>
          <Link href="/dashboard/planes">
            <Button variant="outline">Volver</Button>
          </Link>
        </div>

        {error && <ErrorAlert title="Error" message={error} onDismiss={() => setError(null)} />}

        {isLoading ? (
          <LoadingSpinner />
        ) : plan ? (
          <div className="space-y-6">
            <PlanDetailCard plan={plan} />
            <div className="flex gap-2">
              <Link href={`/dashboard/planes/${planId}/edit`}>
                <Button>Editar</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Plan no encontrado</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
