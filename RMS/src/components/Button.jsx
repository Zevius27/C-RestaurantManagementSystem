import React from 'react'

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  onClick,
  className = '',
  ...props
}) => {
  const baseClasses = 'button'
  const variantClasses = {
    primary: 'button-primary',
    secondary: 'button-secondary',
    outline: 'button-outline',
    danger: 'button-danger',
    success: 'button-success',
    text: 'button-text'
  }
  
  const sizeClasses = {
    small: 'button-small',
    medium: 'button-medium',
    large: 'button-large'
  }
  
  const widthClass = fullWidth ? 'button-full-width' : ''
  const disabledClass = disabled ? 'button-disabled' : ''
  
  const buttonClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClass,
    disabledClass,
    className
  ].filter(Boolean).join(' ')
  
  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button 