"use client"

import CrosswordPuzzle from "@/components/crossword-puzzle"
import Header from "@/components/header"
import ShaderBackground from "@/components/shader-background"

export default function CrosswordPage() {
  return (
    <ShaderBackground>
      <Header />
      <div className="pt-8">
        <CrosswordPuzzle />
      </div>
    </ShaderBackground>
  )
}
