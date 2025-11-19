"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Navbar() {
  const router = useRouter()
  const { usuario, logout } = useAuthContext()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <header className="border-b border-border bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">G</span>
          </div>
          <span className="text-2xl font-bold text-primary hidden sm:inline">Gymness</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {usuario?.rol === "ADMIN" && (
            <>
              <Link
                href="/dashboard/clientes"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Clientes
              </Link>
              <Link
                href="/dashboard/profesionales"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Profesionales
              </Link>
              <Link
                href="/dashboard/planes"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Planes
              </Link>
              <Link
                href="/dashboard/ejercicios"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Ejercicios
              </Link>
            </>
          )}
          {usuario?.rol === "PROFESIONAL" && (
            <>
              <Link
                href="/dashboard/rutinas"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Rutinas
              </Link>
              <Link
                href="/dashboard/sesiones"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Sesiones
              </Link>
            </>
          )}
          {usuario?.rol === "CLIENTE" && (
            <>
              <Link
                href="/dashboard/mis-rutinas"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Mis Rutinas
              </Link>
              <Link
                href="/dashboard/mis-sesiones"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Mis Sesiones
              </Link>
            </>
          )}
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full w-10 h-10 p-0 flex items-center justify-center bg-transparent"
            >
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-primary font-bold text-sm">
                {usuario?.nombre?.charAt(0).toUpperCase()}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="text-sm">
              <span className="font-medium">
                {usuario?.nombre} {usuario?.apellido}
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/dashboard/perfil" className="w-full text-sm">
                Mi Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
