import React from 'react'

const InputField = ({
  id,
  name,
  type = 'text',
  label,
  value,
  placeholder = '',
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  className = '',
  fullWidth = false,
  ...props
}) => {
  const inputId = id || name
  const baseClasses = 'input-field'
  const errorClass = error ? 'input-error' : ''
  const disabledClass = disabled ? 'input-disabled' : ''
  const widthClass = fullWidth ? 'input-full-width' : ''
  
  const inputClasses = [
    baseClasses,
    errorClass,
    disabledClass,
    widthClass,
    className
  ].filter(Boolean).join(' ')
  
  return (
    <div className="input-container">
      {label && (
        <label 
          htmlFor={inputId}
          className={required ? 'required-label' : ''}
        >
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      )}
      
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={inputClasses}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      
      {error && (
        <div 
          id={`${inputId}-error`}
          className="input-error-message"
        >
          {error}
        </div>
      )}
    </div>
  )
}

export default InputField 