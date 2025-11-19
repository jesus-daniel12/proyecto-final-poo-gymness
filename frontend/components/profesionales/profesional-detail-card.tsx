"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Profesional } from "@/types/profesional.types"
import { formatDate } from "@/utils/formatters"

interface ProfesionalDetailCardProps {
  profesional: Profesional
}

export function ProfesionalDetailCard({ profesional }: ProfesionalDetailCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">
            {profesional.nombre} {profesional.apellido}
          </CardTitle>
          <Badge variant={profesional.estado === "ACTIVO" ? "default" : "secondary"}>{profesional.estado}</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="text-lg font-medium">{profesional.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Teléfono</p>
            <p className="text-lg font-medium">{profesional.telefono}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Matrícula</p>
            <p className="text-lg font-medium">{profesional.matricula}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Especialidad</p>
            <p className="text-lg font-medium">{profesional.especialidad}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Documento</p>
            <p className="text-lg font-medium">{profesional.documento}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Fecha de Nacimiento</p>
            <p className="text-lg font-medium">{formatDate(profesional.fechaNacimiento)}</p>
          </div>
        </div>
        {profesional.experiencia && (
          <div className="md:col-span-2">
            <p className="text-sm text-muted-foreground">Experiencia</p>
            <p className="text-lg font-medium">{profesional.experiencia} años</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
