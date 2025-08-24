"use client"

import GlowButton from "./glow-button"

export default function HeroContent() {
  return (
    <main className="absolute inset-0 z-20 flex items-center justify-center">
      <div className="text-center max-w-2xl px-8">
        {/* Main Heading */}
        <h1 className="text-6xl md:text-7xl md:leading-16 tracking-tight font-light text-white mb-6">
          <span className="font-medium italic instrument">EmpowerU</span>
        </h1>

        {/* Description */}
        <p className="text-lg font-light text-white/80 mb-8 leading-relaxed max-w-xl mx-auto">
          Stories, resources and community to inspire and empower people around the world.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <GlowButton variant="secondary" onClick={() => window.location.href = '/publish'}>
            Publish
          </GlowButton>
          <GlowButton variant="primary" onClick={() => window.location.href = '/blog'}>
            Explore
          </GlowButton>
        </div>
        
        {/* Crossword Button */}
        <div className="flex justify-center mt-6">
          <GlowButton 
            variant="outline" 
            onClick={() => window.location.href = '/crossword'}
            className="instrument text-lg px-8 py-2"
          >
            Play Crossword
          </GlowButton>
        </div>
      </div>
    </main>
  )
}
