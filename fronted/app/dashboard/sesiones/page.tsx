"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable } from "@/components/common/data-table"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { ConfirmDialog } from "@/components/common/confirm-dialog"
import { Button } from "@/components/ui/button"
import { sesionService } from "@/services/sesion.service"
import type { Sesion } from "@/types/sesion.types"
import { formatDate } from "@/utils/formatters"
import Link from "next/link"

export default function SesionesPage() {
  const [sesiones, setSesiones] = useState<Sesion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    loadSesiones()
  }, [])

  const loadSesiones = async () => {
    try {
      setIsLoading(true)
      const data = await sesionService.getAll()
      setSesiones(data)
    } catch (error) {
      console.error("Error loading sesiones:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      setIsDeleting(true)
      await sesionService.delete(deleteId)
      setSesiones(sesiones.filter((s) => s.id !== deleteId))
      setDeleteId(null)
    } catch (error) {
      console.error("Error deleting sesion:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <DashboardLayout allowedRoles={["PROFESIONAL"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Sesiones</h1>
          <Link href="/dashboard/sesiones/new">
            <Button>Crear Sesión</Button>
          </Link>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <DataTable<Sesion>
            columns={[
              { key: "nombre", label: "Nombre" },
              { key: "fechaRealizacion", label: "Fecha", render: (value) => formatDate(value) },
              {
                key: "estado",
                label: "Estado",
                render: (value) => (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      value === "COMPLETADA"
                        ? "bg-green-100 text-green-800"
                        : value === "PENDIENTE"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {value}
                  </span>
                ),
              },
              {
                key: "ejercicios",
                label: "Ejercicios",
                render: (value) => (value as any)?.length || 0,
              },
            ]}
            data={sesiones}
            onEdit={(sesion) => {
              window.location.href = `/dashboard/sesiones/${sesion.id}/edit`
            }}
            onDelete={(sesion) => setDeleteId(sesion.id)}
          />
        )}

        <ConfirmDialog
          open={!!deleteId}
          title="Delete Sesión"
          description="Are you sure you want to delete this session? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
          isLoading={isDeleting}
        />
      </div>
    </DashboardLayout>
  )
}
