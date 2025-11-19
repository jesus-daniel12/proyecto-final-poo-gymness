"use client"

import { useState, useEffect } from "react"
import { useAuthContext } from "@/components/auth/auth-provider"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { rutinaService } from "@/services/rutina.service"
import type { Rutina } from "@/types/rutina.types"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { formatDate } from "@/utils/formatters"
import Link from "next/link"

export default function MisRutinasPage() {
  const { usuario } = useAuthContext()
  const [rutinas, setRutinas] = useState<Rutina[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadRutinas()
  }, [usuario?.id])

  const loadRutinas = async () => {
    try {
      setIsLoading(true)
      const data = await rutinaService.getAll()
      // Filter routines for current client
      const clientRutinas = data.filter((r) => r.clienteId === usuario?.id)
      setRutinas(clientRutinas)
    } catch (error) {
      console.error("Error loading rutinas:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout allowedRoles={["CLIENTE"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Mis Rutinas</h1>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : rutinas.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">No tienes rutinas asignadas aún</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rutinas.map((rutina) => (
              <Card key={rutina.id}>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{rutina.nombre}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Objetivo</p>
                    <p className="font-medium">{rutina.objetivoRutina}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Descripción</p>
                    <p className="text-sm line-clamp-2">{rutina.descripcion}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sesiones</p>
                    <p className="font-medium">{rutina.sesiones?.length || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Creada</p>
                    <p className="text-sm">{formatDate(rutina.fechaCreacion)}</p>
                  </div>
                  <Link href={`/dashboard/mis-rutinas/${rutina.id}`}>
                    <Button className="w-full">Ver Detalles</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
