"use client"

import { useState } from "react"
import { useAuthContext } from "@/components/auth/auth-provider"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PerfilPage() {
  const { usuario, logout } = useAuthContext()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = () => {
    setIsLoading(true)
    logout()
    window.location.href = "/login"
  }

  if (!usuario) {
    return (
      <DashboardLayout>
        <div>Loading...</div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Mi Perfil</h1>
          <p className="text-muted-foreground mt-2">Información de tu cuenta</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Nombre</p>
                <p className="font-medium">{usuario.nombre}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Apellido</p>
                <p className="font-medium">{usuario.apellido}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{usuario.email}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Documento</p>
              <p className="font-medium">{usuario.documento}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Rol</p>
              <div className="mt-1">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    usuario.rol === "ADMIN"
                      ? "bg-red-100 text-red-800"
                      : usuario.rol === "PROFESIONAL"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {usuario.rol}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive/20">
          <CardHeader>
            <CardTitle className="text-destructive">Zona de Peligro</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Al cerrar sesión, tendrás que volver a iniciar sesión para acceder a tu cuenta.
            </p>
            <Button variant="destructive" onClick={handleLogout} disabled={isLoading}>
              {isLoading ? "Logging out..." : "Cerrar Sesión"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
