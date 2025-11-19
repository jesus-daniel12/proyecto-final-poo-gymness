"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { validateEmail, getErrorMessage } from "@/utils/validators"
import Link from "next/link"

export function LoginForm() {
  const router = useRouter()
  const { login, isLoading } = useAuthContext()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: typeof errors = {}

    if (!email) newErrors.email = "Email is required"
    else if (!validateEmail(email)) newErrors.email = "Invalid email format"

    if (!password) newErrors.password = "Password is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      await login({ email, password })
      router.push("/dashboard")
    } catch (error: any) {
      setErrors({ general: getErrorMessage(error) })
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>Enter your credentials to access Gymness</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && (
            <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">{errors.general}</div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors({ ...errors, email: undefined })
              }}
              className={errors.email ? "border-destructive" : ""}
              disabled={isLoading}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (errors.password) setErrors({ ...errors, password: undefined })
              }}
              className={errors.password ? "border-destructive" : ""}
              disabled={isLoading}
            />
            {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Create one
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
