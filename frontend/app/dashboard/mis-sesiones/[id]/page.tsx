"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { sesionService } from "@/services/sesion.service"
import { ejercicioService } from "@/services/ejercicio.service"
import type { Sesion, EjercicioSesion } from "@/types/sesion.types"
import type { Ejercicio } from "@/types/ejercicio.types"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { formatDate } from "@/utils/formatters"
import Link from "next/link"

export default function SesionDetailPage() {
  const params = useParams()
  const [sesion, setSesion] = useState<Sesion | null>(null)
  const [ejercicios, setEjercicios] = useState<Map<string, Ejercicio>>(new Map())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [params.id])

  const loadData = async () => {
    try {
      setIsLoading(true)
      const sesionData = await sesionService.getById(params.id as string)
      setSesion(sesionData)

      // Load exercise details for each exercise in the session
      if (sesionData.ejercicios && sesionData.ejercicios.length > 0) {
        const ejerciciosMap = new Map<string, Ejercicio>()
        for (const ejercicioSesion of sesionData.ejercicios) {
          try {
            const ejercicio = await ejercicioService.getById(ejercicioSesion.ejercicioId)
            ejerciciosMap.set(ejercicioSesion.ejercicioId, ejercicio)
          } catch (error) {
            console.error("Error loading ejercicio:", error)
          }
        }
        setEjercicios(ejerciciosMap)
      }
    } catch (error) {
      console.error("Error loading session details:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <LoadingSpinner />
  if (!sesion) return <div className="text-center py-8">Sesión no encontrada</div>

  return (
    <DashboardLayout allowedRoles={["CLIENTE"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{sesion.nombre}</h1>
            <p className="text-muted-foreground mt-2">Fecha: {formatDate(sesion.fechaRealizacion)}</p>
          </div>
          <Link href="/dashboard/mis-sesiones">
            <Button variant="outline">Volver</Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Estado de la Sesión</CardTitle>
          </CardHeader>
          <CardContent>
            <span
              className={`inline-block px-3 py-2 rounded-lg text-sm font-medium ${
                sesion.estado === "COMPLETADA"
                  ? "bg-green-100 text-green-800"
                  : sesion.estado === "PENDIENTE"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
              }`}
            >
              {sesion.estado}
            </span>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-2xl font-bold mb-4">Ejercicios ({sesion.ejercicios?.length || 0})</h2>
          {!sesion.ejercicios || sesion.ejercicios.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No hay ejercicios en esta sesión</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {sesion.ejercicios.map((ejercicioSesion: EjercicioSesion, index: number) => {
                const ejercicio = ejercicios.get(ejercicioSesion.ejercicioId)
                return (
                  <Card key={ejercicioSesion.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {index + 1}. {ejercicio?.nombre || "Ejercicio"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Series</p>
                          <p className="font-medium">{ejercicioSesion.series}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Repeticiones</p>
                          <p className="font-medium">{ejercicioSesion.repeticiones}</p>
                        </div>
                        <div>
                          <p className="text sm text-muted-foreground">Duración (min)</p>
                          <p className="font-medium">{ejercicioSesion.duracion}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Peso (kg)</p>
                          <p className="font-medium">{ejercicioSesion.pesoUtilizado}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">RIR</p>
                          <p className="font-medium">{ejercicioSesion.rir}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Calorías</p>
                          <p className="font-medium">{ejercicioSesion.caloriaQuemada}</p>
                        </div>
                      </div>
                      {ejercicio && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="text-sm text-muted-foreground mb-2">Instrucciones</p>
                          <p className="text-sm">{ejercicio.instrucciones}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
