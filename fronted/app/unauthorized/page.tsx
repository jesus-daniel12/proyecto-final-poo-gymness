import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold mb-2">403</h1>
        <h2 className="text-2xl font-semibold mb-4">Acceso Denegado</h2>
        <p className="text-muted-foreground mb-6">
          No tienes permiso para acceder a esta página. Contacta con el administrador si crees que es un error.
        </p>
        <div className="space-y-2">
          <Link href="/dashboard" className="block">
            <Button className="w-full">Ir al Dashboard</Button>
          </Link>
          <Link href="/login" className="block">
            <Button variant="outline" className="w-full bg-transparent">
              Volver a Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
