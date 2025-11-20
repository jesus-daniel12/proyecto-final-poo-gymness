"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { Plan } from "@/types/plan.types"
import { formatCurrency } from "@/utils/formatters"

interface PlanSummaryCardProps {
  plan: Plan
  onClick?: () => void
}

export function PlanSummaryCard({ plan, onClick }: PlanSummaryCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
      <CardContent className="pt-6">
        <div className="mb-2">
          <h3 className="font-semibold text-lg">{plan.nombre}</h3>
          <p className="text-sm text-muted-foreground">{plan.descripcion}</p>
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold text-primary">{formatCurrency(plan.precio)}</p>
          <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
            {plan.sesionesIncluidas && (
              <div>
                <p className="text-muted-foreground">Sesiones</p>
                <p className="font-medium">{plan.sesionesIncluidas}</p>
              </div>
            )}
            {plan.duracionMeses && (
              <div>
                <p className="text-muted-foreground">Duración</p>
                <p className="font-medium">{plan.duracionMeses} meses</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
