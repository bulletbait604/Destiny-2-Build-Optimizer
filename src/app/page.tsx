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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #064e3b 0%, #000000 50%, #1f2937 100%)', color: 'white' }}>
      <div style={{ padding: '2rem 1rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1rem', background: 'linear-gradient(135deg, #4ade80, #eab308, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Destiny 2 Build Optimizer
          </h1>
          <p style={{ color: '#d1d5db', fontSize: '1.125rem' }}>
            AI-Powered Build Optimization with Exotic Armor Synergy
          </p>
        </div>

        {/* Main Content */}
        <div style={{ maxWidth: '96rem', margin: '0 auto' }}>
          {selectedClass ? (
            <div style={{ textAlign: 'center', padding: '3rem', background: 'linear-gradient(135deg, #374151, #1f2937)', borderRadius: '1rem', backdropFilter: 'blur(10px)' }}>
              <div style={{ width: '6rem', height: '6rem', margin: '0 auto 1.5rem', background: 'linear-gradient(135deg, #374151, #1f2937)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '3rem' }}>
                  {selectedClass === 'hunter' ? '🏹' : selectedClass === 'warlock' ? '🔮' : '🛡️'}
                </span>
              </div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4ade80', marginBottom: '1rem', textTransform: 'capitalize' }}>
                {selectedClass} Selected!
              </h2>
              <p style={{ color: '#d1d5db', marginBottom: '2rem', fontSize: '1.125rem' }}>
                Build optimization features coming soon...
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => setSelectedClass(null)}
                  style={{ background: 'linear-gradient(135deg, #4b5563, #6b7280)', color: 'white', padding: '1rem 2rem', borderRadius: '0.5rem', cursor: 'pointer' }}
                >
                  ← Back to Class Selection
                </button>
                <button 
                  style={{ background: 'linear-gradient(135deg, #4ade80, #eab308, #f97316)', color: 'black', padding: '1rem 2rem', borderRadius: '0.5rem', cursor: 'pointer' }}
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
        <div style={{ textAlign: 'center', marginTop: '4rem', color: '#9ca3af' }}>
          <p>Destiny 2 Build Optimizer - Choose Your Guardian Class</p>
        </div>
      </div>
    </div>
  )
}
