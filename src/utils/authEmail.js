/** Normalize Sri Lankan mobile input to digits-only local form. */
export function normalizeMobile(mobile) {
  let digits = String(mobile || '').replace(/\D/g, '')
  if (digits.startsWith('94') && digits.length > 9) {
    digits = digits.slice(2)
  }
  if (digits.startsWith('0') && digits.length === 10) {
    digits = digits.slice(1)
  }
  return digits
}

export function mobileToAuthEmail(mobile) {
  const digits = normalizeMobile(mobile)
  return `${digits}@volley.local`
}

export function displayMobile(mobile) {
  const digits = normalizeMobile(mobile)
  if (digits.length === 9) return `0${digits}`
  return mobile || '—'
}

export function isValidMobile(mobile) {
  const digits = normalizeMobile(mobile)
  return digits.length === 9 || digits.length === 10
}
