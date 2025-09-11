import React from 'react'

interface CardProps {
  children: React.ReactNode
  variant?: 'default' | 'elevated' | 'outlined'
  className?: string
  padding?: 'sm' | 'md' | 'lg'
}

export default function Card({ 
  children, 
  variant = 'default',
  className = '',
  padding = 'md'
}: CardProps) {
  const baseStyles = "bg-white rounded-xl shadow-lg border border-neutral-100"
  
  const variants = {
    default: "shadow-lg",
    elevated: "shadow-xl",
    outlined: "shadow-none border-2"
  }
  
  const paddings = {
    sm: "p-4",
    md: "p-6", 
    lg: "p-8"
  }
  
  return (
    <div 
      className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${className}`}
      style={{
        backgroundColor: 'rgb(255, 255, 255)',
        borderColor: 'rgb(229, 231, 235)',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      }}
    >
      {children}
    </div>
  )
}
