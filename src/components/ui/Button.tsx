import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  onClick,
  disabled = false
}: ButtonProps) {
  const baseStyles = "font-sans font-medium rounded-lg transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
  
  const variants = {
    primary: "text-white",
    secondary: "text-white", 
    tertiary: "text-gray-700 bg-gray-100 hover:bg-gray-200"
  }
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  }
  
  const getBackgroundColor = () => {
    if (variant === 'primary') return 'rgb(24, 64, 46)' // Your exact green
    if (variant === 'secondary') return 'rgb(218, 129, 108)' // Your exact terracotta
    return ''
  }
  
  const getHoverColor = () => {
    if (variant === 'primary') return 'rgb(20, 54, 38)'
    if (variant === 'secondary') return 'rgb(198, 117, 96)'
    return ''
  }
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      style={{
        backgroundColor: getBackgroundColor(),
        '--hover-bg': getHoverColor()
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = getHoverColor()
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = getBackgroundColor()
        }
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
