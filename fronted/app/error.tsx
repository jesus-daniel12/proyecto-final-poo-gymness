"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold mb-2">500</h1>
        <h2 className="text-2xl font-semibold mb-4">Algo salió mal</h2>
        <p className="text-muted-foreground mb-6">
          {error.message || "Hubo un error inesperado. Por favor intenta de nuevo."}
        </p>
        <div className="space-y-2">
          <Button onClick={() => reset()} className="w-full">
            Intentar de Nuevo
          </Button>
          <Button
            variant="outline"
            className="w-full bg-transparent"
            onClick={() => (window.location.href = "/dashboard")}
          >
            Ir al Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
