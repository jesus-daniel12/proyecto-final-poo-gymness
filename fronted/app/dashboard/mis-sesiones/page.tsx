"use client"

import { useState, useEffect } from "react"
import { useAuthContext } from "@/components/auth/auth-provider"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable } from "@/components/common/data-table"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { sesionService } from "@/services/sesion.service"
import { rutinaService } from "@/services/rutina.service"
import type { Sesion } from "@/types/sesion.types"
import { formatDate } from "@/utils/formatters"

export default function MisSesionesPage() {
  const { usuario } = useAuthContext()
  const [sesiones, setSesiones] = useState<Sesion[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadSesiones()
  }, [usuario?.id])

  const loadSesiones = async () => {
    try {
      setIsLoading(true)
      // Get all routines for this client
      const rutinas = await rutinaService.getAll()
      const clientRutinas = rutinas.filter((r) => r.clienteId === usuario?.id)

      // Get all sessions from those routines
      const allSesiones: Sesion[] = []
      for (const rutina of clientRutinas) {
        if (rutina.sesiones) {
          for (const sesionId of rutina.sesiones) {
            try {
              const sesion = await sesionService.getById(sesionId)
              allSesiones.push(sesion)
            } catch (error) {
              console.error("Error loading sesion:", error)
            }
          }
        }
      }
      setSesiones(allSesiones)
    } catch (error) {
      console.error("Error loading sesiones:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout allowedRoles={["CLIENTE"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Mis Sesiones</h1>
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
              window.location.href = `/dashboard/mis-sesiones/${sesion.id}`
            }}
            searchPlaceholder="Search sessions..."
          />
        )}
      </div>
    </DashboardLayout>
  )
}
