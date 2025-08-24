"use client"

import { useState } from "react"
import Link from "next/link"

interface NavLinkProps {
  children: React.ReactNode
  href: string
  className?: string
  onClick?: () => void
}

export default function NavLink({ children, href, className = "", onClick }: NavLinkProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <Link
      href={href}
      className={`
        relative text-white/80 hover:text-white text-lg font-medium px-5 py-2
        transition-all duration-300 cursor-pointer inline-block z-30
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        pointerEvents: 'auto'
      }}
    >
      <span className="relative z-10">
        {children}
      </span>
      
      {/* Glowing white underline */}
      <span 
        className={`
          absolute bottom-1 left-1/2 h-0.5 bg-white
          transition-all duration-300 transform -translate-x-1/2 pointer-events-none
          ${isHovered ? 'w-3/4 opacity-100' : 'w-0 opacity-0'}
        `}
        style={{
          boxShadow: isHovered 
            ? '0 0 8px rgba(255, 255, 255, 0.8), 0 0 15px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)'
            : 'none'
        }}
      />
    </Link>
  )
}
