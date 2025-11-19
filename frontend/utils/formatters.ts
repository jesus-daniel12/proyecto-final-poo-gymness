export const formatDate = (date: string | Date): string => {
  const d = new Date(date)
  return d.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(amount)
}

export const formatFullName = (nombre: string, apellido: string): string => {
  return `${nombre} ${apellido}`
}
