"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ClienteDetailCard } from "@/components/clientes/cliente-detail-card"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { ErrorAlert } from "@/components/common/error-alert"
import { clienteService } from "@/services/cliente.service"
import type { Cliente } from "@/types/cliente.types"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ClienteDetailPage() {
  const params = useParams()
  const clienteId = params.id as string
  const [cliente, setCliente] = useState<Cliente | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCliente = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await clienteService.getById(clienteId)
        setCliente(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar cliente")
      } finally {
        setIsLoading(false)
      }
    }
    loadCliente()
  }, [clienteId])

  return (
    <DashboardLayout allowedRoles={["ADMIN"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Detalles del Cliente</h1>
          <Link href="/dashboard/clientes">
            <Button variant="outline">Volver</Button>
          </Link>
        </div>

        {error && <ErrorAlert title="Error" message={error} onDismiss={() => setError(null)} />}

        {isLoading ? (
          <LoadingSpinner />
        ) : cliente ? (
          <div className="space-y-6">
            <ClienteDetailCard cliente={cliente} />
            <div className="flex gap-2">
              <Link href={`/dashboard/clientes/${clienteId}/edit`}>
                <Button>Editar</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Cliente no encontrado</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
