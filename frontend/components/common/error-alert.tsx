"use client"

import { AlertCircle, X } from "lucide-react"
import { useState } from "react"

interface ErrorAlertProps {
  title?: string
  message: string
  onDismiss?: () => void
  closeable?: boolean
  details?: string[]
}

export function ErrorAlert({ title = "Error", message, onDismiss, closeable = true, details }: ErrorAlertProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  if (!isVisible) return null

  return (
    <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
      <div className="flex gap-3">
        <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          {title && <h3 className="font-medium text-destructive mb-1">{title}</h3>}
          <p className="text-sm text-destructive/80">{message}</p>
          {details && details.length > 0 && (
            <ul className="mt-2 text-xs text-destructive/70 space-y-1">
              {details.map((detail, idx) => (
                <li key={idx} className="ml-4">
                  • {detail}
                </li>
              ))}
            </ul>
          )}
        </div>
        {closeable && (
          <button onClick={handleDismiss} className="text-destructive/60 hover:text-destructive flex-shrink-0 mt-0.5">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
