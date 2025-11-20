"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Ejercicio } from "@/types/ejercicio.types"

interface EjercicioDetailCardProps {
  ejercicio: Ejercicio
}

export function EjercicioDetailCard({ ejercicio }: EjercicioDetailCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">{ejercicio.nombre}</CardTitle>
          <Badge variant={ejercicio.activo ? "default" : "secondary"}>{ejercicio.activo ? "Activo" : "Inactivo"}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground">Descripción</p>
          <p className="text-lg font-medium">{ejercicio.descripcion}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ejercicio.tiposEjercicio && ejercicio.tiposEjercicio.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Tipos de Ejercicio</p>
              <div className="flex flex-wrap gap-2">
                {ejercicio.tiposEjercicio.map((tipo, idx) => (
                  <Badge key={idx} variant="outline">
                    {tipo}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {ejercicio.gruposMusculares && ejercicio.gruposMusculares.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Grupos Musculares</p>
              <div className="flex flex-wrap gap-2">
                {ejercicio.gruposMusculares.map((grupo, idx) => (
                  <Badge key={idx} variant="secondary">
                    {grupo}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
        {ejercicio.equipoRequerido && (
          <div>
            <p className="text-sm text-muted-foreground">Equipo Requerido</p>
            <p className="text-lg font-medium">{ejercicio.equipoRequerido}</p>
          </div>
        )}
        {ejercicio.dificultad && (
          <div>
            <p className="text-sm text-muted-foreground">Dificultad</p>
            <Badge className="mt-1">{ejercicio.dificultad}</Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
