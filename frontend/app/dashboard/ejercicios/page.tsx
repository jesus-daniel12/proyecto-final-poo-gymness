"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable } from "@/components/common/data-table"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { ConfirmDialog } from "@/components/common/confirm-dialog"
import { Button } from "@/components/ui/button"
import { ejercicioService } from "@/services/ejercicio.service"
import type { Ejercicio } from "@/types/ejercicio.types"
import Link from "next/link"
import { ErrorAlert } from "@/components/common/error-alert"
import { EmptyState } from "@/components/common/empty-state"
import { EjercicioSummaryCard } from "@/components/ejercicios/ejercicio-summary-card"
import { LayoutGrid, LayoutList } from "lucide-react"

const getErrorMessage = (err: any): string => {
  return err instanceof Error ? err.message : "An unknown error occurred"
}

export default function EjerciciosPage() {
  const [ejercicios, setEjercicios] = useState<Ejercicio[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid")

  useEffect(() => {
    loadEjercicios()
  }, [])

  const loadEjercicios = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await ejercicioService.getAll()
      setEjercicios(data)
    } catch (err) {
      setError(getErrorMessage(err))
      console.error("Error loading ejercicios:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      setIsDeleting(true)
      setError(null)
      await ejercicioService.delete(deleteId)
      setEjercicios(ejercicios.filter((e) => e.id !== deleteId))
      setDeleteId(null)
    } catch (err) {
      setError(getErrorMessage(err))
      console.error("Error deleting ejercicio:", err)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <DashboardLayout allowedRoles={["ADMIN"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Ejercicios</h1>
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
            <Link href="/dashboard/ejercicios/new">
              <Button>Crear Ejercicio</Button>
            </Link>
          </div>
        </div>

        {error && <ErrorAlert title="Error al cargar ejercicios" message={error} onDismiss={() => setError(null)} />}

        {isLoading ? (
          <LoadingSpinner />
        ) : ejercicios.length === 0 ? (
          <EmptyState
            title="No hay ejercicios"
            description="Comienza creando tu primer ejercicio para empezar a gestionar tu gimnasio"
            actionLabel="Crear Ejercicio"
            onAction={() => (window.location.href = "/dashboard/ejercicios/new")}
          />
        ) : viewMode === "table" ? (
          <DataTable<Ejercicio>
            columns={[
              { key: "nombre", label: "Nombre" },
              { key: "descripcion", label: "Descripción" },
              {
                key: "activo",
                label: "Estado",
                render: (value) => (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {value ? "Activo" : "Inactivo"}
                  </span>
                ),
              },
              {
                key: "tiposEjercicio",
                label: "Tipos",
                render: (value) => (value as string[]).join(", "),
              },
            ]}
            data={ejercicios}
            onRowClick={(ejercicio) => {
              window.location.href = `/dashboard/ejercicios/${ejercicio.id}`
            }}
            onEdit={(ejercicio) => {
              window.location.href = `/dashboard/ejercicios/${ejercicio.id}`
            }}
            onDelete={(ejercicio) => setDeleteId(ejercicio.id)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ejercicios.map((ejercicio) => (
              <div key={ejercicio.id}>
                <EjercicioSummaryCard
                  ejercicio={ejercicio}
                  onClick={() => (window.location.href = `/dashboard/ejercicios/${ejercicio.id}`)}
                />
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => (window.location.href = `/dashboard/ejercicios/${ejercicio.id}`)}
                  >
                    Ver
                  </Button>
                  <Button size="sm" variant="destructive" className="flex-1" onClick={() => setDeleteId(ejercicio.id)}>
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <ConfirmDialog
          open={!!deleteId}
          title="Eliminar Ejercicio"
          description="¿Estás seguro que deseas eliminar este ejercicio? Esta acción no se puede deshacer."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
          isLoading={isDeleting}
        />
      </div>
    </DashboardLayout>
  )
}
