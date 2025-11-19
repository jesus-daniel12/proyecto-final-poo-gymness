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

export default function EjerciciosPage() {
  const [ejercicios, setEjercicios] = useState<Ejercicio[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    loadEjercicios()
  }, [])

  const loadEjercicios = async () => {
    try {
      setIsLoading(true)
      const data = await ejercicioService.getAll()
      setEjercicios(data)
    } catch (error) {
      console.error("Error loading ejercicios:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      setIsDeleting(true)
      await ejercicioService.delete(deleteId)
      setEjercicios(ejercicios.filter((e) => e.id !== deleteId))
      setDeleteId(null)
    } catch (error) {
      console.error("Error deleting ejercicio:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <DashboardLayout allowedRoles={["ADMIN"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Ejercicios</h1>
          <Link href="/dashboard/ejercicios/new">
            <Button>Crear Ejercicio</Button>
          </Link>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
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
            onEdit={(ejercicio) => {
              window.location.href = `/dashboard/ejercicios/${ejercicio.id}/edit`
            }}
            onDelete={(ejercicio) => setDeleteId(ejercicio.id)}
          />
        )}

        <ConfirmDialog
          open={!!deleteId}
          title="Delete Ejercicio"
          description="Are you sure you want to delete this exercise? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
          isLoading={isDeleting}
        />
      </div>
    </DashboardLayout>
  )
}
