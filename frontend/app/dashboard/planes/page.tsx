"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable } from "@/components/common/data-table"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { ConfirmDialog } from "@/components/common/confirm-dialog"
import { Button } from "@/components/ui/button"
import { planService } from "@/services/plan.service"
import type { Plan } from "@/types/plan.types"
import { formatCurrency } from "@/utils/formatters"
import Link from "next/link"
import { ErrorAlert } from "@/components/common/error-alert"
import { EmptyState } from "@/components/common/empty-state"
import { PlanSummaryCard } from "@/components/planes/plan-summary-card"
import { LayoutGrid, LayoutList } from "lucide-react"

const getErrorMessage = (err: any): string => {
  return err instanceof Error ? err.message : "An unknown error occurred"
}

export default function PlanesPage() {
  const [planes, setPlanes] = useState<Plan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid")

  useEffect(() => {
    loadPlanes()
  }, [])

  const loadPlanes = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await planService.getAll()
      setPlanes(data)
    } catch (err) {
      setError(getErrorMessage(err))
      console.error("Error loading planes:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      setIsDeleting(true)
      setError(null)
      await planService.delete(deleteId)
      setPlanes(planes.filter((p) => p.id !== deleteId))
      setDeleteId(null)
    } catch (err) {
      setError(getErrorMessage(err))
      console.error("Error deleting plan:", err)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <DashboardLayout allowedRoles={["ADMIN"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Planes</h1>
          <div className="flex items-center gap-2">
            <div className="flex gap-1 border rounded-lg p-1">
              <Button
                size="sm"
                variant={viewMode === "table" ? "default" : "ghost"}
                onClick={() => setViewMode("table")}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
              <Button size="sm" variant={viewMode === "grid" ? "default" : "ghost"} onClick={() => setViewMode("grid")}>
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
            <Link href="/dashboard/planes/new">
              <Button>Crear Plan</Button>
            </Link>
          </div>
        </div>

        {error && <ErrorAlert title="Error al cargar planes" message={error} onDismiss={() => setError(null)} />}

        {isLoading ? (
          <LoadingSpinner />
        ) : planes.length === 0 ? (
          <EmptyState
            title="No hay planes"
            description="Comienza creando tu primer plan para empezar a gestionar tu gimnasio"
            actionLabel="Crear Plan"
            onAction={() => (window.location.href = "/dashboard/planes/new")}
          />
        ) : viewMode === "table" ? (
          <DataTable<Plan>
            columns={[
              { key: "nombre", label: "Nombre" },
              { key: "descripcion", label: "Descripción" },
              { key: "precio", label: "Precio", render: (value) => formatCurrency(value) },
            ]}
            data={planes}
            onRowClick={(plan) => {
              window.location.href = `/dashboard/planes/${plan.id}`
            }}
            onEdit={(plan) => {
              window.location.href = `/dashboard/planes/${plan.id}`
            }}
            onDelete={(plan) => setDeleteId(plan.id)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {planes.map((plan) => (
              <div key={plan.id}>
                <PlanSummaryCard plan={plan} onClick={() => (window.location.href = `/dashboard/planes/${plan.id}`)} />
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => (window.location.href = `/dashboard/planes/${plan.id}`)}
                  >
                    Ver
                  </Button>
                  <Button size="sm" variant="destructive" className="flex-1" onClick={() => setDeleteId(plan.id)}>
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <ConfirmDialog
          open={!!deleteId}
          title="Eliminar Plan"
          description="¿Estás seguro que deseas eliminar este plan? Esta acción no se puede deshacer."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
          isLoading={isDeleting}
        />
      </div>
    </DashboardLayout>
  )
}
