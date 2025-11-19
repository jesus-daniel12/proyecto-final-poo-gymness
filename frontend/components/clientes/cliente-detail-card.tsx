"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Cliente } from "@/types/cliente.types"
import { formatDate } from "@/utils/formatters"

interface ClienteDetailCardProps {
  cliente: Cliente
}

export function ClienteDetailCard({ cliente }: ClienteDetailCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">
          {cliente.nombre} {cliente.apellido}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Documento</p>
            <p className="text-lg font-medium">{cliente.documento}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="text-lg font-medium">{cliente.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Teléfono</p>
            <p className="text-lg font-medium">{cliente.telefono || "N/A"}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Fecha de Nacimiento</p>
            <p className="text-lg font-medium">{formatDate(cliente.fechaNacimiento)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Género</p>
            <p className="text-lg font-medium">{cliente.genero || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Objetivo</p>
            <Badge variant="outline">{cliente.objetivo || "Sin objetivo"}</Badge>
          </div>
        </div>
        {cliente.direccion && (
          <div className="md:col-span-2">
            <p className="text-sm text-muted-foreground">Dirección</p>
            <p className="text-lg font-medium">{cliente.direccion}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
