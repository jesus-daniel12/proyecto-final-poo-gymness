"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { rutinaService } from "@/services/rutina.service"
import { sesionService } from "@/services/sesion.service"
import type { Rutina } from "@/types/rutina.types"
import type { Sesion } from "@/types/sesion.types"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { formatDate } from "@/utils/formatters"
import Link from "next/link"

export default function RutinaDetailPage() {
  const params = useParams()
  const [rutina, setRutina] = useState<Rutina | null>(null)
  const [sesiones, setSesiones] = useState<Sesion[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [params.id])

  const loadData = async () => {
    try {
      setIsLoading(true)
      const rutinaData = await rutinaService.getById(params.id as string)
      setRutina(rutinaData)

      if (rutinaData.sesiones && rutinaData.sesiones.length > 0) {
        const sesionesData = await Promise.all(rutinaData.sesiones.map((sesionId) => sesionService.getById(sesionId)))
        setSesiones(sesionesData)
      }
    } catch (error) {
      console.error("Error loading routine details:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <LoadingSpinner />
  if (!rutina) return <div className="text-center py-8">Rutina no encontrada</div>

  return (
    <DashboardLayout allowedRoles={["CLIENTE"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{rutina.nombre}</h1>
            <p className="text-muted-foreground mt-2">{rutina.descripcion}</p>
          </div>
          <Link href="/dashboard/mis-rutinas">
            <Button variant="outline">Volver</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Objetivo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{rutina.objetivoRutina}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Fecha de Creación</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{formatDate(rutina.fechaCreacion)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Total Sesiones</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{sesiones.length}</p>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Sesiones</h2>
          {sesiones.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No hay sesiones en esta rutina</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sesiones.map((sesion) => (
                <Card key={sesion.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{sesion.nombre}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Fecha</p>
                      <p className="font-medium">{formatDate(sesion.fechaRealizacion)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Estado</p>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          sesion.estado === "COMPLETADA"
                            ? "bg-green-100 text-green-800"
                            : sesion.estado === "PENDIENTE"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {sesion.estado}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ejercicios</p>
                      <p className="font-medium">{sesion.ejercicios?.length || 0}</p>
                    </div>
                    <Link href={`/dashboard/mis-sesiones/${sesion.id}`}>
                      <Button className="w-full bg-transparent" variant="outline" size="sm">
                        Ver Detalles
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
