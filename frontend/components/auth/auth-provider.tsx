"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useAuth } from "@/hooks/use-auth"
import type { AuthContextType } from "@/types/auth.types"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    console.log("[v0] AuthProvider hydrating")
    setIsHydrated(true)
  }, [])

  if (!isHydrated) {
    return null
  }

  console.log("[v0] AuthProvider rendered with auth state - authenticated:", !!auth.token)

  return <AuthContext.Provider value={auth as AuthContextType}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within AuthProvider")
  }
  return context
}
