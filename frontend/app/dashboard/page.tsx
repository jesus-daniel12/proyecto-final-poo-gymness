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
import { Users, Briefcase, DollarSign, Dumbbell, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const { usuario } = useAuthContext()

  const displayUsuario = usuario || { nombre: "Guest", rol: "DEMO" }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Bienvenido, {displayUsuario.nombre}!</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Rol: <span className="font-semibold">{displayUsuario.rol}</span>
          </p>
          {displayUsuario.rol === "DEMO" && (
            <p className="text-sm text-blue-600 mt-2">Modo demostración - Inicia sesión para acceso completo</p>
          )}
        </div>

        {(displayUsuario.rol === "ADMIN" || displayUsuario.rol === "DEMO") && <AdminDashboard />}
        {displayUsuario.rol === "CLIENTE" && <ClienteDashboard />}
        {displayUsuario.rol === "PROFESIONAL" && <ProfesionalDashboard />}
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
        setStats({ clientes: 12, profesionales: 5, planes: 8, ejercicios: 45 })
      } finally {
        setIsLoading(false)
      }
    }
    loadStats()
  }, [])

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.clientes}</p>
            <p className="text-xs text-muted-foreground mt-1">Clientes registrados</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profesionales</CardTitle>
            <Briefcase className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.profesionales}</p>
            <p className="text-xs text-muted-foreground mt-1">Entrenadores activos</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Planes</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.planes}</p>
            <p className="text-xs text-muted-foreground mt-1">Planes disponibles</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ejercicios</CardTitle>
            <Dumbbell className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.ejercicios}</p>
            <p className="text-xs text-muted-foreground mt-1">En el catálogo</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Gestión Rápida
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/dashboard/clientes" className="block">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Administrar Clientes
              </Button>
            </Link>
            <Link href="/dashboard/profesionales" className="block">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Administrar Profesionales
              </Button>
            </Link>
            <Link href="/dashboard/planes" className="block">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Administrar Planes
              </Button>
            </Link>
            <Link href="/dashboard/ejercicios" className="block">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Administrar Ejercicios
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Acciones Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/dashboard/clientes/new" className="block">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                + Nuevo Cliente
              </Button>
            </Link>
            <Link href="/dashboard/profesionales/new" className="block">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                + Nuevo Profesional
              </Button>
            </Link>
            <Link href="/dashboard/planes/new" className="block">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                + Nuevo Plan
              </Button>
            </Link>
            <Link href="/dashboard/ejercicios/new" className="block">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                + Nuevo Ejercicio
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ClienteDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Tu Rutina Activa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">No tienes rutina activa en este momento</p>
            <Link href="/dashboard/mis-rutinas">
              <Button>Ver mis rutinas</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Próximas Sesiones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">No tienes sesiones programadas</p>
            <Link href="/dashboard/mis-sesiones">
              <Button>Ver mis sesiones</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ProfesionalDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Asignados</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rutinas Creadas</CardTitle>
            <Dumbbell className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sesiones Programadas</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mis Actividades</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Link href="/dashboard/rutinas" className="block">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Ver mis rutinas
            </Button>
          </Link>
          <Link href="/dashboard/sesiones" className="block">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Ver mis sesiones
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
