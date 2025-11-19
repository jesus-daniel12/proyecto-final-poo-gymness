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

export default function ProfesionalesPage() {
  const [profesionales, setProfesionales] = useState<Profesional[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    loadProfesionales()
  }, [])

  const loadProfesionales = async () => {
    try {
      setIsLoading(true)
      const data = await profesionalService.getAll()
      setProfesionales(data)
    } catch (error) {
      console.error("Error loading profesionales:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      setIsDeleting(true)
      await profesionalService.delete(deleteId)
      setProfesionales(profesionales.filter((p) => p.id !== deleteId))
      setDeleteId(null)
    } catch (error) {
      console.error("Error deleting profesional:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <DashboardLayout allowedRoles={["ADMIN"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Profesionales</h1>
          <Link href="/dashboard/profesionales/new">
            <Button>Crear Profesional</Button>
          </Link>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
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
            onEdit={(profesional) => {
              window.location.href = `/dashboard/profesionales/${profesional.id}/edit`
            }}
            onDelete={(profesional) => setDeleteId(profesional.id)}
          />
        )}

        <ConfirmDialog
          open={!!deleteId}
          title="Delete Profesional"
          description="Are you sure you want to delete this profesional? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
          isLoading={isDeleting}
        />
      </div>
    </DashboardLayout>
  )
}
