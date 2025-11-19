"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Ejercicio } from "@/types/ejercicio.types"

interface EjercicioSummaryCardProps {
  ejercicio: Ejercicio
  onClick?: () => void
}

export function EjercicioSummaryCard({ ejercicio, onClick }: EjercicioSummaryCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-lg">{ejercicio.nombre}</h3>
            <p className="text-sm text-muted-foreground">{ejercicio.descripcion}</p>
          </div>
          <Badge variant={ejercicio.activo ? "default" : "secondary"}>{ejercicio.activo ? "Activo" : "Inactivo"}</Badge>
        </div>
        <div className="mt-4 space-y-2 text-sm">
          {ejercicio.dificultad && (
            <div>
              <p className="text-muted-foreground">Dificultad</p>
              <p className="font-medium">{ejercicio.dificultad}</p>
            </div>
          )}
          {ejercicio.gruposMusculares && ejercicio.gruposMusculares.length > 0 && (
            <div>
              <p className="text-muted-foreground mb-1">Grupos Musculares</p>
              <div className="flex flex-wrap gap-1">
                {ejercicio.gruposMusculares.map((grupo, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {grupo}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
