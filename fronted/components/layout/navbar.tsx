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
    <header className="border-b border-border bg-background">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="text-2xl font-bold text-primary">
          Gymness
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {usuario?.rol === "ADMIN" && (
            <>
              <Link href="/dashboard/clientes" className="text-sm hover:text-primary">
                Clientes
              </Link>
              <Link href="/dashboard/profesionales" className="text-sm hover:text-primary">
                Profesionales
              </Link>
              <Link href="/dashboard/planes" className="text-sm hover:text-primary">
                Planes
              </Link>
              <Link href="/dashboard/ejercicios" className="text-sm hover:text-primary">
                Ejercicios
              </Link>
            </>
          )}
          {usuario?.rol === "PROFESIONAL" && (
            <>
              <Link href="/dashboard/rutinas" className="text-sm hover:text-primary">
                Rutinas
              </Link>
              <Link href="/dashboard/sesiones" className="text-sm hover:text-primary">
                Sesiones
              </Link>
            </>
          )}
          {usuario?.rol === "CLIENTE" && (
            <>
              <Link href="/dashboard/mis-rutinas" className="text-sm hover:text-primary">
                Mis Rutinas
              </Link>
              <Link href="/dashboard/mis-sesiones" className="text-sm hover:text-primary">
                Mis Sesiones
              </Link>
            </>
          )}
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {usuario?.nombre} {usuario?.apellido}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href="/dashboard/perfil" className="w-full">
                Mi Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
