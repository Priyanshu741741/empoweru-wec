"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Import PulsingBorder only on the client side
const PulsingBorderClient = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => mod.PulsingBorder),
  { ssr: false }
)

interface PulsingButtonProps {
  children: React.ReactNode
  variant: "primary" | "secondary"
  className?: string
  onClick?: () => void
}

export default function PulsingButton({ children, variant, className = "", onClick }: PulsingButtonProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const isPrimary = variant === "primary"

  return (
    <div 
      className="relative group" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Pulsing Border - Only visible on hover and only render on client side */}
      {isMounted && isHovered && (
        <div className="absolute inset-0 -m-1">
          <PulsingBorderClient
            colors={["#ec4899", "#be185d", "#f97316", "#881337", "#fdf2f8", "#9f1239"]}
            colorBack="#00000000"
            speed={1.5}
            roundness={1}
            thickness={0.1}
            softness={0.2}
            intensity={5}
            spotSize={0.1}
            pulse={0.1}
            smoke={0.5}
            smokeSize={4}
            scale={0.65}
            rotation={0}
            frame={9161408.251009725}
            className="w-full h-full rounded-full"
          />
        </div>
      )}
      
      {/* Actual button */}
      <button
        onClick={onClick}
        className={`
          px-8 py-3 rounded-full font-normal text-sm transition-all duration-200 cursor-pointer z-10 relative
          ${isPrimary 
            ? "bg-white text-black hover:bg-white/90" 
            : "bg-transparent border border-white/30 text-white hover:bg-white/10 hover:border-white/50"
          }
          ${className}
        `}
      >
        {children}
      </button>
    </div>
  )
}
