"use client"

import { CheckCircle2, X } from "lucide-react"
import { useState } from "react"

interface SuccessAlertProps {
  title?: string
  message: string
  onDismiss?: () => void
  closeable?: boolean
}

export function SuccessAlert({ title = "Success", message, onDismiss, closeable = true }: SuccessAlertProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  if (!isVisible) return null

  return (
    <div className="rounded-lg border border-green-500/50 bg-green-50 p-4">
      <div className="flex gap-3">
        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          {title && <h3 className="font-medium text-green-900 mb-1">{title}</h3>}
          <p className="text-sm text-green-800">{message}</p>
        </div>
        {closeable && (
          <button onClick={handleDismiss} className="text-green-600/60 hover:text-green-600 flex-shrink-0 mt-0.5">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
