import React from 'react'

interface InputProps {
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  disabled?: boolean
  type?: 'text' | 'email' | 'password'
}

export default function Input({ 
  placeholder = '',
  value = '',
  onChange,
  className = '',
  disabled = false,
  type = 'text'
}: InputProps) {
  const baseStyles = "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-offset-2 transition-all duration-200 font-sans"
  
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`${baseStyles} ${className}`}
      style={{
        borderColor: 'rgb(209, 213, 219)',
        color: 'rgb(17, 17, 17)',
        backgroundColor: 'rgb(255, 255, 255)'
      }}
      onFocus={(e) => {
        e.target.style.borderColor = 'transparent'
        e.target.style.boxShadow = '0 0 0 2px rgb(24, 64, 46)'
      }}
      onBlur={(e) => {
        e.target.style.borderColor = 'rgb(209, 213, 219)'
        e.target.style.boxShadow = 'none'
      }}
    />
  )
}
