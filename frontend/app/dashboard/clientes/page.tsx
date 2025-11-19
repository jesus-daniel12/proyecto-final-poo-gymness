"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable } from "@/components/common/data-table"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { ConfirmDialog } from "@/components/common/confirm-dialog"
import { Button } from "@/components/ui/button"
import { clienteService } from "@/services/cliente.service"
import type { Cliente } from "@/types/cliente.types"
import { formatDate } from "@/utils/formatters"
import Link from "next/link"
import { ErrorAlert } from "@/components/common/error-alert"
import { EmptyState } from "@/components/common/empty-state"
import { ClienteSummaryCard } from "@/components/clientes/cliente-summary-card"
import { LayoutGrid, LayoutList } from "lucide-react"

const getErrorMessage = (err: any): string => {
  return err instanceof Error ? err.message : "An unknown error occurred"
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")

  useEffect(() => {
    loadClientes()
  }, [])

  const loadClientes = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await clienteService.getAll()
      setClientes(data)
    } catch (err) {
      setError(getErrorMessage(err))
      console.error("Error loading clientes:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      setIsDeleting(true)
      setError(null)
      await clienteService.delete(deleteId)
      setClientes(clientes.filter((c) => c.id !== deleteId))
      setDeleteId(null)
    } catch (err) {
      setError(getErrorMessage(err))
      console.error("Error deleting cliente:", err)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <DashboardLayout allowedRoles={["ADMIN"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Clientes</h1>
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
            <Link href="/dashboard/clientes/new">
              <Button>Crear Cliente</Button>
            </Link>
          </div>
        </div>

        {error && <ErrorAlert title="Error al cargar clientes" message={error} onDismiss={() => setError(null)} />}

        {isLoading ? (
          <LoadingSpinner />
        ) : clientes.length === 0 ? (
          <EmptyState
            title="No hay clientes"
            description="Comienza creando tu primer cliente para empezar a gestionar tu gimnasio"
            actionLabel="Crear Cliente"
            onAction={() => (window.location.href = "/dashboard/clientes/new")}
          />
        ) : viewMode === "table" ? (
          <DataTable<Cliente>
            columns={[
              { key: "nombre", label: "Nombre" },
              { key: "apellido", label: "Apellido" },
              { key: "documento", label: "Documento" },
              { key: "email", label: "Email" },
              {
                key: "fechaNacimiento",
                label: "Fecha Nacimiento",
                render: (value) => formatDate(value),
              },
            ]}
            data={clientes}
            onRowClick={(cliente) => {
              window.location.href = `/dashboard/clientes/${cliente.id}`
            }}
            onEdit={(cliente) => {
              window.location.href = `/dashboard/clientes/${cliente.id}`
            }}
            onDelete={(cliente) => setDeleteId(cliente.id)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clientes.map((cliente) => (
              <div key={cliente.id}>
                <ClienteSummaryCard
                  cliente={cliente}
                  onClick={() => (window.location.href = `/dashboard/clientes/${cliente.id}`)}
                />
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => (window.location.href = `/dashboard/clientes/${cliente.id}`)}
                  >
                    Ver
                  </Button>
                  <Button size="sm" variant="destructive" className="flex-1" onClick={() => setDeleteId(cliente.id)}>
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <ConfirmDialog
          open={!!deleteId}
          title="Eliminar Cliente"
          description="¿Estás seguro que deseas eliminar este cliente? Esta acción no se puede deshacer."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
          isLoading={isDeleting}
        />
      </div>
    </DashboardLayout>
  )
}
