"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Plan } from "@/types/plan.types"
import { formatCurrency } from "@/utils/formatters"

interface PlanDetailCardProps {
  plan: Plan
}

export function PlanDetailCard({ plan }: PlanDetailCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">{plan.nombre}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Descripción</p>
            <p className="text-lg font-medium">{plan.descripcion}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Precio</p>
            <p className="text-2xl font-bold text-primary">{formatCurrency(plan.precio)}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plan.sesionesIncluidas && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Sesiones Incluidas</p>
              <p className="text-2xl font-bold">{plan.sesionesIncluidas}</p>
            </div>
          )}
          {plan.duracionMeses && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Duración</p>
              <p className="text-2xl font-bold">{plan.duracionMeses} meses</p>
            </div>
          )}
          {plan.beneficios && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Beneficios</p>
              <p className="text-sm font-medium mt-2">{plan.beneficios}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
