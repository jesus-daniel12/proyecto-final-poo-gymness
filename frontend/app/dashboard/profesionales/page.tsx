"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable } from "@/components/common/data-table"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { ConfirmDialog } from "@/components/common/confirm-dialog"
import { Button } from "@/components/ui/button"
import { profesionalService } from "@/services/profesional.service"
import type { Profesional } from "@/types/profesional.types"
import { formatFullName } from "@/utils/formatters"
import Link from "next/link"
import { ErrorAlert } from "@/components/common/error-alert"
import { EmptyState } from "@/components/common/empty-state"
import { ProfesionalSummaryCard } from "@/components/profesionales/profesional-summary-card"
import { LayoutGrid, LayoutList } from "lucide-react"

const getErrorMessage = (err: any): string => {
  return err instanceof Error ? err.message : "An unknown error occurred"
}

export default function ProfesionalesPage() {
  const [profesionales, setProfesionales] = useState<Profesional[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")

  useEffect(() => {
    loadProfesionales()
  }, [])

  const loadProfesionales = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await profesionalService.getAll()
      setProfesionales(data)
    } catch (err) {
      setError(getErrorMessage(err))
      console.error("Error loading profesionales:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      setIsDeleting(true)
      setError(null)
      await profesionalService.delete(deleteId)
      setProfesionales(profesionales.filter((p) => p.id !== deleteId))
      setDeleteId(null)
    } catch (err) {
      setError(getErrorMessage(err))
      console.error("Error deleting profesional:", err)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <DashboardLayout allowedRoles={["ADMIN"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Profesionales</h1>
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
            <Link href="/dashboard/profesionales/new">
              <Button>Crear Profesional</Button>
            </Link>
          </div>
        </div>

        {error && <ErrorAlert title="Error al cargar profesionales" message={error} onDismiss={() => setError(null)} />}

        {isLoading ? (
          <LoadingSpinner />
        ) : profesionales.length === 0 ? (
          <EmptyState
            title="No hay profesionales"
            description="Comienza creando tu primer profesional para empezar a gestionar tu gimnasio"
            actionLabel="Crear Profesional"
            onAction={() => (window.location.href = "/dashboard/profesionales/new")}
          />
        ) : viewMode === "table" ? (
          <DataTable<Profesional>
            columns={[
              {
                key: "nombre",
                label: "Nombre Completo",
                render: (_, profesional) => formatFullName(profesional.nombre, profesional.apellido),
              },
              { key: "email", label: "Email" },
              { key: "telefono", label: "Teléfono" },
              { key: "matricula", label: "Matrícula" },
              { key: "especialidad", label: "Especialidad" },
              {
                key: "estado",
                label: "Estado",
                render: (value) => (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      value === "ACTIVO" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {value}
                  </span>
                ),
              },
            ]}
            data={profesionales}
            onRowClick={(profesional) => {
              window.location.href = `/dashboard/profesionales/${profesional.id}`
            }}
            onEdit={(profesional) => {
              window.location.href = `/dashboard/profesionales/${profesional.id}`
            }}
            onDelete={(profesional) => setDeleteId(profesional.id)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profesionales.map((profesional) => (
              <div key={profesional.id}>
                <ProfesionalSummaryCard
                  profesional={profesional}
                  onClick={() => (window.location.href = `/dashboard/profesionales/${profesional.id}`)}
                />
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => (window.location.href = `/dashboard/profesionales/${profesional.id}`)}
                  >
                    Ver
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="flex-1"
                    onClick={() => setDeleteId(profesional.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <ConfirmDialog
          open={!!deleteId}
          title="Eliminar Profesional"
          description="¿Estás seguro que deseas eliminar este profesional? Esta acción no se puede deshacer."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
          isLoading={isDeleting}
        />
      </div>
    </DashboardLayout>
  )
}
