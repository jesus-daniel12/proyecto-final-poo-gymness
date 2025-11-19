"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { validateEmail, validatePassword, validateDocumento, getErrorMessage } from "@/utils/validators"
import Link from "next/link"

export function RegisterForm() {
  const router = useRouter()
  const { register, isLoading } = useAuthContext()
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    documento: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { [key: string]: string } = {}

    if (!formData.nombre) newErrors.nombre = "First name is required"
    if (!formData.apellido) newErrors.apellido = "Last name is required"

    if (!formData.documento) newErrors.documento = "Document is required"
    else if (!validateDocumento(formData.documento)) newErrors.documento = "Document must be 8 digits"

    if (!formData.email) newErrors.email = "Email is required"
    else if (!validateEmail(formData.email)) newErrors.email = "Invalid email format"

    if (!formData.password) newErrors.password = "Password is required"
    else {
      const passwordErrors = validatePassword(formData.password)
      if (passwordErrors.length > 0) {
        newErrors.password = passwordErrors[0]
      }
    }

    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password"
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      await register({
        nombre: formData.nombre,
        apellido: formData.apellido,
        documento: formData.documento,
        email: formData.email,
        password: formData.password,
      })
      router.push("/dashboard")
    } catch (error: any) {
      setErrors({ general: getErrorMessage(error) })
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">Create Account</CardTitle>
        <CardDescription>Sign up to join Gymness</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          {errors.general && (
            <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">{errors.general}</div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label htmlFor="nombre" className="text-sm font-medium">
                First Name
              </label>
              <Input
                id="nombre"
                name="nombre"
                placeholder="John"
                value={formData.nombre}
                onChange={handleChange}
                className={errors.nombre ? "border-destructive" : ""}
                disabled={isLoading}
              />
              {errors.nombre && <p className="text-xs text-destructive">{errors.nombre}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="apellido" className="text-sm font-medium">
                Last Name
              </label>
              <Input
                id="apellido"
                name="apellido"
                placeholder="Doe"
                value={formData.apellido}
                onChange={handleChange}
                className={errors.apellido ? "border-destructive" : ""}
                disabled={isLoading}
              />
              {errors.apellido && <p className="text-xs text-destructive">{errors.apellido}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="documento" className="text-sm font-medium">
              Document (8 digits)
            </label>
            <Input
              id="documento"
              name="documento"
              placeholder="12345678"
              value={formData.documento}
              onChange={handleChange}
              className={errors.documento ? "border-destructive" : ""}
              disabled={isLoading}
              maxLength={8}
            />
            {errors.documento && <p className="text-xs text-destructive">{errors.documento}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              type="password"
              placeholder="Min 16 chars, uppercase, lowercase, number, special char"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "border-destructive" : ""}
              disabled={isLoading}
            />
            {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? "border-destructive" : ""}
              disabled={isLoading}
            />
            {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
