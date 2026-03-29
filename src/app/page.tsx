'use client'

import { useState } from 'react'
import { ClassSelector } from '@/components/ClassSelector'

export default function HomePage() {
  const [selectedClass, setSelectedClass] = useState<'hunter' | 'warlock' | 'titan' | null>(null)

  const handleClassSelect = (guardianClass: 'hunter' | 'warlock' | 'titan') => {
    setSelectedClass(guardianClass)
    console.log(`${guardianClass} selected`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Destiny 2 Build Optimizer
          </h1>
          <p className="text-gray-300 text-lg">
            AI-Powered Build Optimization with Exotic Armor Synergy
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {selectedClass ? (
            <div className="text-center bg-black/40 backdrop-blur-sm rounded-2xl p-12 border border-green-500/30">
              <div className="w-24 h-24 mx-auto bg-gray-700 rounded-full mb-6 flex items-center justify-center">
                <span className="text-5xl">
                  {selectedClass === 'hunter' ? '🏹' : selectedClass === 'warlock' ? '🔮' : '🛡️'}
                </span>
              </div>
              <h2 className="text-4xl font-bold text-green-400 mb-4 capitalize">
                {selectedClass} Selected!
              </h2>
              <p className="text-gray-300 mb-8 text-lg">
                Build optimization features coming soon...
              </p>
              <div className="space-x-4">
                <button 
                  onClick={() => setSelectedClass(null)}
                  className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  ← Back to Class Selection
                </button>
                <button 
                  className="bg-green-600 hover:bg-green-500 text-black font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Continue to Build Optimizer →
                </button>
              </div>
            </div>
          ) : (
            <ClassSelector onClassSelect={handleClassSelect} />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-400">
          <p>Destiny 2 Build Optimizer - Choose Your Guardian Class</p>
        </div>
      </div>
    </div>
  )
}
