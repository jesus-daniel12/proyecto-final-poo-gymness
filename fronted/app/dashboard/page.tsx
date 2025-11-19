"use client"

import { useState, useEffect } from "react"
import { useAuthContext } from "@/components/auth/auth-provider"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { clienteService } from "@/services/cliente.service"
import { profesionalService } from "@/services/profesional.service"
import { planService } from "@/services/plan.service"
import { ejercicioService } from "@/services/ejercicio.service"
import { LoadingSpinner } from "@/components/common/loading-spinner"

export default function DashboardPage() {
  const { usuario } = useAuthContext()

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {usuario?.nombre}!</h1>
          <p className="text-muted-foreground mt-2">Role: {usuario?.rol}</p>
        </div>

        {usuario?.rol === "ADMIN" && <AdminDashboard />}
        {usuario?.rol === "CLIENTE" && <ClienteDashboard />}
        {usuario?.rol === "PROFESIONAL" && <ProfesionalDashboard />}
      </div>
    </DashboardLayout>
  )
}

function AdminDashboard() {
  const [stats, setStats] = useState({ clientes: 0, profesionales: 0, planes: 0, ejercicios: 0 })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [clientes, profesionales, planes, ejercicios] = await Promise.all([
          clienteService.getAll(),
          profesionalService.getAll(),
          planService.getAll(),
          ejercicioService.getAll(),
        ])
        setStats({
          clientes: clientes.length,
          profesionales: profesionales.length,
          planes: planes.length,
          ejercicios: ejercicios.length,
        })
      } catch (error) {
        console.error("Error loading stats:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadStats()
  }, [])

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Total Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.clientes}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Total Profesionales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.profesionales}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Total Planes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.planes}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Total Ejercicios</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.ejercicios}</p>
        </CardContent>
      </Card>
    </div>
  )
}

function ClienteDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Rutina Activa</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No tienes rutina activa</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Próximas Sesiones</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No tienes sesiones programadas</p>
        </CardContent>
      </Card>
    </div>
  )
}

function ProfesionalDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Clientes Asignados</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">0</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Rutinas Creadas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">0</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Sesiones Programadas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">0</p>
        </CardContent>
      </Card>
    </div>
  )
}
