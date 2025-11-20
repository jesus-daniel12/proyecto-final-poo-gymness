import type { Metadata } from "next"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "Register | Gymness",
  description: "Create a new Gymness account",
}

export default function RegisterPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted py-12 px-4">
      <RegisterForm />
    </main>
  )
}
