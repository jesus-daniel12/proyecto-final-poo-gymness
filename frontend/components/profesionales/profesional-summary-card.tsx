"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Profesional } from "@/types/profesional.types"

interface ProfesionalSummaryCardProps {
  profesional: Profesional
  onClick?: () => void
}

export function ProfesionalSummaryCard({ profesional, onClick }: ProfesionalSummaryCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-lg">
              {profesional.nombre} {profesional.apellido}
            </h3>
            <p className="text-sm text-muted-foreground">{profesional.email}</p>
          </div>
          <Badge variant={profesional.estado === "ACTIVO" ? "default" : "secondary"}>{profesional.estado}</Badge>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
          <div>
            <p className="text-muted-foreground">Especialidad</p>
            <p className="font-medium">{profesional.especialidad}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Matrícula</p>
            <p className="font-medium">{profesional.matricula}</p>
          </div>
          <div className="col-span-2">
            <p className="text-muted-foreground">Teléfono</p>
            <p className="font-medium">{profesional.telefono}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
