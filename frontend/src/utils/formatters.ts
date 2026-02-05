/**
 * Format satang to Baht with currency symbol
 */
export function formatMoney(satang: number): string {
  const baht = satang / 100
  return `฿${baht.toLocaleString('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

/**
 * Format ISO datetime to readable format
 */
export function formatDateTime(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Format ISO date to readable date
 */
export function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}