"use client"

import { useState, useEffect } from "react"

interface CrosswordPuzzleProps {
  onClose?: () => void
}

// Define the crossword layout matching the provided image exactly
const CROSSWORD_DATA = {
  words: {
    across: [
      { number: 1, word: 'SHRADDHA', row: 0, col: 0, clue: 'Most-followed Bollywood woman on Instagram in 2025' },
      { number: 6, word: 'SERENA', row: 3, col: 2, clue: 'Tennis legend with 23 Grand Slams & 4 Olympic golds' },
      { number: 7, word: 'NANCY', row: 4, col: 7, clue: 'Viral homegrown fashion designer, Cannes 2025 red carpet' },
      { number: 8, word: 'MRUNAL', row: 6, col: 1, clue: 'Apologised for past Bipasha Basu "manly" remark' },
             { number: 10, word: 'KAMALA', row: 9, col: 0, clue: 'First female U.S. Vice President' },
       { number: 11, word: 'MANUSHI', row: 11, col: 0, clue: 'Miss World 2017, wellness TV host in 2025' }
    ],
    down: [
      { number: 1, word: 'SYDNEY', row: 0, col: 0, clue: 'Sparked culture-war outrage with her "Great Jeans" ad' },
      { number: 2, word: 'REESE', row: 0, col: 2, clue: 'First woman to produce five consecutive Oscar-nominated films' },
      { number: 3, word: 'ARIANA', row: 0, col: 7, clue: 'Holds 20 Guinness World Records in music' },
      { number: 4, word: 'POONAM', row: 1, col: 9, clue: 'Faked her own death as cervical cancer awareness stunt' },
      { number: 5, word: 'LEENA', row: 2, col: 5, clue: 'CEO of Chanel' },
             { number: 8, word: 'MALALA', row: 6, col: 1, clue: 'Shot by Taliban at 15, youngest Nobel Peace laureate' },
             { number: 9, word: 'MANU', row: 8, col: 3, clue: 'Olympian shooter, gold medalist & mentor at Paris 2024' }
    ]
  }
}

export default function CrosswordPuzzle({ onClose }: CrosswordPuzzleProps) {
  const [userInputs, setUserInputs] = useState<{[key: string]: string}>({})
  const [completedWords, setCompletedWords] = useState<Set<string>>(new Set())
  const [isMobile, setIsMobile] = useState(false)
  
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Create grid based on word positions
  const createGrid = () => {
    const maxRow = 15
    const maxCol = 15
    const grid: {isInput: boolean, number?: number}[][] = Array(maxRow).fill(null).map(() => 
      Array(maxCol).fill(null).map(() => ({ isInput: false }))
    )
    
    // First, place all ACROSS words
    CROSSWORD_DATA.words.across.forEach(word => {
      // Mark starting cell with number
      grid[word.row][word.col] = { isInput: true, number: word.number }
      
      // Mark all cells of the word as input cells
      for (let i = 0; i < word.word.length; i++) {
        const row = word.row
        const col = word.col + i
        
        if (row < maxRow && col < maxCol) {
          grid[row][col] = { isInput: true, number: i === 0 ? word.number : undefined }
        }
      }
    })
    
    // Then, place all DOWN words
    CROSSWORD_DATA.words.down.forEach(word => {
      // Mark starting cell with number (if not already marked)
      if (!grid[word.row][word.col].number) {
        grid[word.row][word.col].number = word.number
      }
      
      // Mark all cells of the word as input cells
      for (let i = 0; i < word.word.length; i++) {
        const row = word.row + i
        const col = word.col
        
        if (row < maxRow && col < maxCol) {
          // Preserve any existing number
          const existingNumber = grid[row][col].number
          grid[row][col] = { isInput: true, number: existingNumber || (i === 0 ? word.number : undefined) }
        }
      }
    })
    
    return grid
  }

  const grid = createGrid()

  const getCellKey = (row: number, col: number) => `${row}-${col}`

  const handleInputChange = (row: number, col: number, value: string) => {
    const key = getCellKey(row, col)
    setUserInputs(prev => ({
      ...prev,
      [key]: value.toUpperCase()
    }))
  }

  const checkWordCompletion = () => {
    const newCompleted = new Set<string>()
    
    // Check across words
    CROSSWORD_DATA.words.across.forEach(word => {
      let isComplete = true
      for (let i = 0; i < word.word.length; i++) {
        const key = getCellKey(word.row, word.col + i)
        if (userInputs[key] !== word.word[i]) {
          isComplete = false
          break
        }
      }
      if (isComplete) newCompleted.add(`across-${word.number}`)
    })
    
    // Check down words
    CROSSWORD_DATA.words.down.forEach(word => {
      let isComplete = true
      for (let i = 0; i < word.word.length; i++) {
        const key = getCellKey(word.row + i, word.col)
        if (userInputs[key] !== word.word[i]) {
          isComplete = false
          break
        }
      }
      if (isComplete) newCompleted.add(`down-${word.number}`)
    })
    
    setCompletedWords(newCompleted)
  }
  
  // Check if a specific cell is part of a completed word
  const isCellCompleted = (row: number, col: number) => {
    // Check if cell is part of any completed across word
    const acrossWord = CROSSWORD_DATA.words.across.find(word => 
      row === word.row && col >= word.col && col < word.col + word.word.length
    )
    
    if (acrossWord && completedWords.has(`across-${acrossWord.number}`)) {
      return true
    }
    
    // Check if cell is part of any completed down word
    const downWord = CROSSWORD_DATA.words.down.find(word => 
      col === word.col && row >= word.row && row < word.row + word.word.length
    )
    
    if (downWord && completedWords.has(`down-${downWord.number}`)) {
      return true
    }
    
    return false
  }

  useEffect(() => {
    checkWordCompletion()
  }, [userInputs])

  return (
          <div className="min-h-screen text-white p-4 overflow-x-hidden" style={{
      background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #ec4899 100%)'
    }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');
      `}</style>
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-7xl font-normal mb-2 text-white drop-shadow-lg instrument italic">
              Women Of Influence
            </h1>
            
          
          {onClose && (
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={onClose}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/40 px-4 py-2 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col xl:flex-row gap-8 md:gap-16 xl:gap-24 overflow-visible">
          {/* Crossword Grid */}
          <div className="flex justify-center mb-8 xl:mb-0 overflow-visible">
            <div className="inline-block bg-transparent p-4 rounded-lg overflow-visible" style={{ 
              minWidth: isMobile ? '300px' : '400px', 
              minHeight: isMobile ? '300px' : '400px',
              marginRight: isMobile ? '20px' : '40px'
            }}>
              <div className="relative overflow-visible" style={{ 
                width: isMobile ? '300px' : '400px', 
                height: isMobile ? '300px' : '400px',
                paddingRight: '40px'
              }}>
                {grid.map((row, rowIndex) =>
                  row.map((cell, colIndex) => {
                    const cellKey = getCellKey(rowIndex, colIndex)
                    
                    // Only render input cells
                    if (!cell.isInput) return null;
                    
                    // Check if this cell is part of a completed word
                    const isCompleted = isCellCompleted(rowIndex, colIndex)
                    
                    return (
                      <div
                        key={cellKey}
                        className={`border border-gray-400 absolute transition-colors ${
                          isCompleted ? 'bg-green-200' : 'bg-white'
                        }`}
                        style={{
                          top: `${rowIndex * (isMobile ? 1.8 : 2.5)}rem`,
                          left: `${colIndex * (isMobile ? 1.8 : 2.5)}rem`,
                          width: isMobile ? '1.6rem' : '2.25rem',
                          height: isMobile ? '1.6rem' : '2.25rem',
                          zIndex: 10,
                          boxSizing: 'border-box'
                        }}
                      >
                        {cell.number && (
                          <span className={`absolute top-0 left-0 ${isMobile ? 'text-[8px]' : 'text-xs'} font-bold text-black leading-none ${isMobile ? 'pl-0.25' : 'pl-0.5'}`}>
                            {cell.number}
                          </span>
                        )}
                        <input
                          type="text"
                          maxLength={1}
                          className={`w-full h-full text-center font-bold ${isMobile ? 'text-sm' : 'text-lg'} bg-transparent border-none outline-none ${
                            isCompleted ? 'text-green-800' : 'text-black'
                          }`}
                          value={userInputs[cellKey] || ''}
                          onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                        />
                      </div>
                    )
                  }).filter(Boolean)
                )}
              </div>
            </div>
          </div>

          {/* Clues */}
          <div className="xl:w-1/2" style={{ zIndex: 20, minWidth: isMobile ? '300px' : '400px' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 h-auto">
              {/* Across Clues */}
              <div className="bg-pink-600 p-3 md:p-4 rounded-md shadow-md h-auto">
                <h4 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-2 md:mb-3 text-white border-b border-white/30 pb-1`} style={{ fontFamily: "'Shadows Into Light', cursive" }}>ACROSS</h4>
                <div className="space-y-4 max-h-none overflow-visible pr-2">
                  {CROSSWORD_DATA.words.across.map((word) => (
                    <div 
                      key={`across-${word.number}`}
                      className="py-3 mb-1"
                    >
                      <div className="flex items-start">
                        <span className={`font-bold ${isMobile ? 'text-sm' : 'text-base'} mr-2 text-white min-w-[20px] md:min-w-[24px]`}>
                          {word.number}.
                        </span>
                        <span className={`${isMobile ? 'text-sm' : 'text-base'} text-white`} style={{ fontFamily: "'Shadows Into Light', cursive" }}>{word.clue} <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white/80`}>({word.word.length})</span></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Down Clues */}
              <div className="bg-pink-600 p-3 md:p-4 rounded-md shadow-md h-auto">
                <h4 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-2 md:mb-3 text-white border-b border-white/30 pb-1`} style={{ fontFamily: "'Shadows Into Light', cursive" }}>DOWN</h4>
                <div className="space-y-4 max-h-none overflow-visible pr-2">
                  {CROSSWORD_DATA.words.down.map((word) => (
                    <div 
                      key={`down-${word.number}`}
                      className="py-3 mb-1"
                    >
                      <div className="flex items-start">
                        <span className={`font-bold ${isMobile ? 'text-sm' : 'text-base'} mr-2 text-white min-w-[20px] md:min-w-[24px]`}>
                          {word.number}.
                        </span>
                        <span className={`${isMobile ? 'text-sm' : 'text-base'} text-white`} style={{ fontFamily: "'Shadows Into Light', cursive" }}>{word.clue} <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white/80`}>({word.word.length})</span></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}