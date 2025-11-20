"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Cliente } from "@/types/cliente.types"
import { formatDate } from "@/utils/formatters"

interface ClienteSummaryCardProps {
  cliente: Cliente
  onClick?: () => void
}

export function ClienteSummaryCard({ cliente, onClick }: ClienteSummaryCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-lg">
              {cliente.nombre} {cliente.apellido}
            </h3>
            <p className="text-sm text-muted-foreground">{cliente.email}</p>
          </div>
          {cliente.objetivo && <Badge variant="outline">{cliente.objetivo}</Badge>}
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
          <div>
            <p className="text-muted-foreground">Documento</p>
            <p className="font-medium">{cliente.documento}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Nacimiento</p>
            <p className="font-medium">{formatDate(cliente.fechaNacimiento)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
