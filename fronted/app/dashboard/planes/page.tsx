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

export default function PlanesPage() {
  const [planes, setPlanes] = useState<Plan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    loadPlanes()
  }, [])

  const loadPlanes = async () => {
    try {
      setIsLoading(true)
      const data = await planService.getAll()
      setPlanes(data)
    } catch (error) {
      console.error("Error loading planes:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      setIsDeleting(true)
      await planService.delete(deleteId)
      setPlanes(planes.filter((p) => p.id !== deleteId))
      setDeleteId(null)
    } catch (error) {
      console.error("Error deleting plan:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <DashboardLayout allowedRoles={["ADMIN"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Planes</h1>
          <Link href="/dashboard/planes/new">
            <Button>Crear Plan</Button>
          </Link>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <DataTable<Plan>
            columns={[
              { key: "nombre", label: "Nombre" },
              { key: "descripcion", label: "Descripción" },
              { key: "precio", label: "Precio", render: (value) => formatCurrency(value) },
            ]}
            data={planes}
            onEdit={(plan) => {
              window.location.href = `/dashboard/planes/${plan.id}/edit`
            }}
            onDelete={(plan) => setDeleteId(plan.id)}
          />
        )}

        <ConfirmDialog
          open={!!deleteId}
          title="Delete Plan"
          description="Are you sure you want to delete this plan? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
          isLoading={isDeleting}
        />
      </div>
    </DashboardLayout>
  )
}
