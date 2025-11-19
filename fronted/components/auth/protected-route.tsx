"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/components/auth/auth-provider"
import { LoadingSpinner } from "@/components/common/loading-spinner"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: ("ADMIN" | "CLIENTE" | "PROFESIONAL")[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter()
  const { usuario, isLoading } = useAuthContext()

  useEffect(() => {
    if (!isLoading) {
      if (!usuario) {
        router.push("/login")
      } else if (allowedRoles && !allowedRoles.includes(usuario.rol)) {
        router.push("/unauthorized")
      }
    }
  }, [usuario, isLoading, router, allowedRoles])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  if (!usuario) {
    return null
  }

  if (allowedRoles && !allowedRoles.includes(usuario.rol)) {
    return null
  }

  return <>{children}</>
}
