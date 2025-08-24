"use client"

import { useState } from "react"

interface GlowButtonProps {
  children: React.ReactNode
  variant: "primary" | "secondary"
  className?: string
  onClick?: () => void
}

export default function GlowButton({ children, variant, className = "", onClick }: GlowButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const isPrimary = variant === "primary"
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative px-8 py-3 rounded-full font-normal text-sm transition-all duration-300 cursor-pointer
        ${isPrimary 
          ? "bg-white text-black hover:bg-white/90" 
          : "bg-transparent border border-white/30 text-white hover:bg-white/10"
        }
        ${isHovered ? 'shadow-glow' : ''}
        ${className}
      `}
      style={{
        boxShadow: isHovered 
          ? isPrimary
            ? '0 0 20px 4px rgba(255, 255, 255, 0.8), 0 0 40px 8px rgba(255, 255, 255, 0.6), inset 0 0 15px rgba(255, 255, 255, 0.3)'
            : '0 0 20px 4px rgba(236, 72, 153, 0.8), 0 0 40px 8px rgba(236, 72, 153, 0.6), inset 0 0 15px rgba(255, 255, 255, 0.2)'
          : 'none',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      }}
    >
      <span className={`
        relative z-10
        ${isHovered ? 'transform scale-105 transition-transform duration-300' : 'transform scale-100 transition-transform duration-300'}
      `}>
        {children}
      </span>
    </button>
  )
}
