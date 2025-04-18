// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Password validation - min 8 chars, at least one letter and one number
export const isValidPassword = (password) => {
  return password.length >= 8 && 
    /[A-Za-z]/.test(password) && 
    /[0-9]/.test(password)
}

// Phone number validation (simple)
export const isValidPhone = (phone) => {
  const phoneRegex = /^\+?[\d\s-]{10,15}$/
  return phoneRegex.test(phone)
}

// Required field validation
export const isRequired = (value) => {
  return value !== null && value !== undefined && value.trim() !== ''
}

// Min length validation
export const minLength = (value, min) => {
  return value.length >= min
}

// Max length validation
export const maxLength = (value, max) => {
  return value.length <= max
}

// Number range validation
export const isInRange = (number, min, max) => {
  return number >= min && number <= max
} 