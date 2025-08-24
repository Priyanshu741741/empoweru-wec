"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"

// Import PulsingBorder only on the client side
const PulsingBorderClient = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => mod.PulsingBorder),
  { ssr: false }
)

export default function PulsingCircle() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="absolute bottom-8 right-8 z-30">
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Pulsing Border Circle - Only render on client side */}
        {isMounted && (
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
            className="w-[60px] h-[60px] rounded-full"
          />
        )}

        {/* Rotating Text Around the Pulsing Border */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{ transform: "scale(1.6)" }}
        >
          <defs>
            <path id="circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
          </defs>
          <text className="text-sm fill-white/80 instrument">
            <textPath href="#circle" startOffset="0%">
              • Empower • Inspire • Empower • Unite • Together • Inspire • Empower • Unite •
            </textPath>
          </text>
        </motion.svg>
      </div>
    </div>
  )
}