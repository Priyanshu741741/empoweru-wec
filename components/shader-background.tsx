"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"

// Import MeshGradient only on the client side
const MeshGradientClient = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => mod.MeshGradient),
  { ssr: false }
)

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export default function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-rose-950 relative overflow-hidden">
      {/* SVG Filters */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.1
                      0 1 0 0 0.05
                      0 0 1 0 0.1
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Background Shaders - Only render on client side */}
      {isMounted && (
        <>
          <MeshGradientClient
            className="absolute inset-0 w-full h-full"
            colors={["#881337", "#ec4899", "#fdf2f8", "#be185d", "#f97316"]}
            speed={0.3}
          />
          <MeshGradientClient
            className="absolute inset-0 w-full h-full opacity-60"
            colors={["#9f1239", "#fdf2f8", "#ec4899", "#881337"]}
            speed={0.2}
            wireframe="true"
          />
        </>
      )}

      {children}
    </div>
  )
}