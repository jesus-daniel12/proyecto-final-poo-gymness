export const passwordValidationRules = {
  minLength: 16,
  hasUppercase: /[A-Z]/,
  hasLowercase: /[a-z]/,
  hasNumber: /[0-9]/,
  hasSpecial: /[@$!%*?&]/,
}

export const validatePassword = (password: string): string[] => {
  const errors: string[] = []

  if (password.length < passwordValidationRules.minLength) {
    errors.push(`Password must be at least ${passwordValidationRules.minLength} characters`)
  }
  if (!passwordValidationRules.hasUppercase.test(password)) {
    errors.push("Password must contain at least one uppercase letter")
  }
  if (!passwordValidationRules.hasLowercase.test(password)) {
    errors.push("Password must contain at least one lowercase letter")
  }
  if (!passwordValidationRules.hasNumber.test(password)) {
    errors.push("Password must contain at least one number")
  }
  if (!passwordValidationRules.hasSpecial.test(password)) {
    errors.push("Password must contain at least one special character (@$!%*?&)")
  }

  return errors
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateDocumento = (documento: string): boolean => {
  return /^\d{8}$/.test(documento)
}

export const validatePlanName = (name: string): string[] => {
  const errors: string[] = []
  if (name.length < 3) errors.push("Plan name must be at least 3 characters")
  if (name.length > 50) errors.push("Plan name must not exceed 50 characters")
  return errors
}

export const validatePlanDescription = (description: string): string[] => {
  const errors: string[] = []
  if (description.length < 3) errors.push("Description must be at least 3 characters")
  if (description.length > 255) errors.push("Description must not exceed 255 characters")
  return errors
}

export const getErrorMessage = (error: any): string => {
  if (error.response?.data) {
    const data = error.response.data
    return data.detail || data.title || "An error occurred"
  }
  return error.message || "An unexpected error occurred"
}
