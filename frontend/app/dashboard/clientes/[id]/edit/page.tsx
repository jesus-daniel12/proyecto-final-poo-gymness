"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { ErrorAlert } from "@/components/common/error-alert"
import { SuccessAlert } from "@/components/common/success-alert"
import { clienteService } from "@/services/cliente.service"
import type { Cliente } from "@/types/cliente.types"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ClienteEditPage() {
  const params = useParams()
  const router = useRouter()
  const clienteId = params.id as string

  const [cliente, setCliente] = useState<Cliente | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const loadCliente = async () => {
      try {
        setIsLoading(true)
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!cliente) return
    const { name, value } = e.target
    setCliente({ ...cliente, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cliente) return

    try {
      setIsSaving(true)
      setError(null)
      await clienteService.update(clienteId, cliente)
      setSuccess(true)
      setTimeout(() => router.push(`/dashboard/clientes/${clienteId}`), 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar cliente")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <DashboardLayout allowedRoles={["ADMIN"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Editar Cliente</h1>
          <Link href={`/dashboard/clientes/${clienteId}`}>
            <Button variant="outline">Cancelar</Button>
          </Link>
        </div>

        {error && <ErrorAlert title="Error" message={error} onDismiss={() => setError(null)} />}
        {success && <SuccessAlert title="Éxito" message="Cliente actualizado correctamente" />}

        {isLoading ? (
          <LoadingSpinner />
        ) : cliente ? (
          <Card>
            <CardHeader>
              <CardTitle>Información del Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input id="nombre" name="nombre" value={cliente.nombre} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="apellido">Apellido</Label>
                    <Input id="apellido" name="apellido" value={cliente.apellido} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={cliente.email} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="documento">Documento</Label>
                    <Input id="documento" name="documento" value={cliente.documento} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input id="telefono" name="telefono" value={cliente.telefono || ""} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="genero">Género</Label>
                    <Input id="genero" name="genero" value={cliente.genero || ""} onChange={handleChange} />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="direccion">Dirección</Label>
                    <Input id="direccion" name="direccion" value={cliente.direccion || ""} onChange={handleChange} />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Guardando..." : "Guardar Cambios"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Cliente no encontrado</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
