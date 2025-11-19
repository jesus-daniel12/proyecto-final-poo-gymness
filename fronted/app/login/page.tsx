import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Login | Gymness",
  description: "Sign in to your Gymness account",
}

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted">
      <LoginForm />
    </main>
  )
}
