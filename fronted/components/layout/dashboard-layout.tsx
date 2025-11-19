"use client"

import { Navbar } from "./navbar"
import { ProtectedRoute } from "@/components/auth/protected-route"
import type { ReactNode } from "react"

interface DashboardLayoutProps {
  children: ReactNode
  allowedRoles?: ("ADMIN" | "CLIENTE" | "PROFESIONAL")[]
}

export function DashboardLayout({ children, allowedRoles }: DashboardLayoutProps) {
  return (
    <ProtectedRoute allowedRoles={allowedRoles}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
      </div>
    </ProtectedRoute>
  )
}
