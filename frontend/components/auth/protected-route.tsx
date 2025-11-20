"use client"

import type React from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: ("ADMIN" | "CLIENTE" | "PROFESIONAL")[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  return <>{children}</>
}
