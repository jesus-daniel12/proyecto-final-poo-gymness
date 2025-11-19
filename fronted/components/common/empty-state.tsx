"use client"

import type React from "react"

import { Package } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  title: string
  description: string
  icon?: React.ReactNode
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ title, description, icon, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {icon || <Package className="h-16 w-16 text-muted-foreground/40 mb-4" />}
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground mt-2 max-w-md">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-4">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
