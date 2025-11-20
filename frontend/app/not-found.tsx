import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Página no encontrada</h2>
        <p className="text-muted-foreground mb-6">La página que buscas no existe o ha sido movida.</p>
        <Link href="/dashboard">
          <Button className="w-full">Ir al Dashboard</Button>
        </Link>
      </div>
    </div>
  )
}
