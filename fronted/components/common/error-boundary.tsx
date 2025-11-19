"use client"

import React from "react"

import type { ReactNode } from "react"
import { ErrorAlert } from "./error-alert"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: (error: Error, retry: () => void) => ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error) {
    console.error("Error Boundary caught:", error)
  }

  retry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback ? (
        this.props.fallback(this.state.error, this.retry)
      ) : (
        <div className="p-6">
          <ErrorAlert
            title="Something went wrong"
            message={this.state.error.message}
            details={process.env.NODE_ENV === "development" ? [this.state.error.stack || ""] : undefined}
            onDismiss={this.retry}
          />
        </div>
      )
    }

    return this.props.children
  }
}
