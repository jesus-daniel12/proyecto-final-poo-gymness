"use client"

import { useState, useEffect } from "react"
import { useAuthContext } from "@/components/auth/auth-provider"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable } from "@/components/common/data-table"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { ConfirmDialog } from "@/components/common/confirm-dialog"
import { Button } from "@/components/ui/button"
import { rutinaService } from "@/services/rutina.service"
import { clienteService } from "@/services/cliente.service"
import type { Rutina } from "@/types/rutina.types"
import type { Cliente } from "@/types/cliente.types"
import { formatDate } from "@/utils/formatters"
import Link from "next/link"

export default function RutinasPage() {
  const { usuario } = useAuthContext()
  const [rutinas, setRutinas] = useState<Rutina[]>([])
  const [clientesMap, setClientesMap] = useState<Map<string, Cliente>>(new Map())
  const [isLoading, setIsLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    loadRutinas()
  }, [usuario?.id])

  const loadRutinas = async () => {
    try {
      setIsLoading(true)
      const data = await rutinaService.getAll()
      setRutinas(data)

      // Load client info for routines
      const clientes = await clienteService.getAll()
      const clienteMap = new Map<string, Cliente>()
      clientes.forEach((cliente) => clienteMap.set(cliente.id, cliente))
      setClientesMap(clienteMap)
    } catch (error) {
      console.error("Error loading rutinas:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      setIsDeleting(true)
      await rutinaService.delete(deleteId)
      setRutinas(rutinas.filter((r) => r.id !== deleteId))
      setDeleteId(null)
    } catch (error) {
      console.error("Error deleting rutina:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <DashboardLayout allowedRoles={["PROFESIONAL"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Rutinas</h1>
          <Link href="/dashboard/rutinas/new">
            <Button>Crear Rutina</Button>
          </Link>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <DataTable<Rutina>
            columns={[
              { key: "nombre", label: "Nombre" },
              { key: "objetivoRutina", label: "Objetivo" },
              {
                key: "clienteId",
                label: "Cliente",
                render: (clienteId) => {
                  const cliente = clientesMap.get(clienteId as string)
                  return cliente ? `${cliente.nombre} ${cliente.apellido}` : "Sin asignar"
                },
              },
              {
                key: "fechaCreacion",
                label: "Creada",
                render: (value) => formatDate(value),
              },
              {
                key: "sesiones",
                label: "Sesiones",
                render: (value) => (value as string[])?.length || 0,
              },
            ]}
            data={rutinas}
            onEdit={(rutina) => {
              window.location.href = `/dashboard/rutinas/${rutina.id}/edit`
            }}
            onDelete={(rutina) => setDeleteId(rutina.id)}
          />
        )}

        <ConfirmDialog
          open={!!deleteId}
          title="Delete Rutina"
          description="Are you sure you want to delete this routine? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
          isLoading={isDeleting}
        />
      </div>
    </DashboardLayout>
  )
}
