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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 25%, #1a1a1a 50%, #0f0f0f 75%, #000000 100%)', color: 'white' }}>
      <div style={{ padding: '2rem 1rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ 
            display: 'inline-block',
            perspective: '1000px',
            marginBottom: '1rem'
          }}>
            <h1 style={{ 
              fontSize: '4rem', 
              fontWeight: 'bold', 
              background: 'linear-gradient(135deg, #00ff88, #c0c0c0, #ffd700, #00ff88)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent', 
              backgroundClip: 'text',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textShadow: '0 0 20px rgba(0,255,136,0.5)',
              animation: 'gradient 3s ease infinite, float 3s ease-in-out infinite',
              transformStyle: 'preserve-3d',
              position: 'relative'
            }}>
              <span style={{ 
                display: 'block',
                transform: 'translateZ(20px)',
                position: 'relative'
              }}>
                Destiny 2
              </span>
              <span style={{ 
                display: 'block',
                fontSize: '2rem',
                marginTop: '0.5rem',
                transform: 'translateZ(10px)',
                position: 'relative',
                background: 'linear-gradient(135deg, #ffd700, #c0c0c0, #00ff88)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent', 
                backgroundClip: 'text',
                animation: 'gradient 3s ease infinite reverse'
              }}>
                Build Optimizer
              </span>
            </h1>
          </div>
          
          {/* Destiny 2 style icon */}
          <div style={{ 
            width: '80px',
            height: '80px',
            margin: '0 auto 1rem',
            background: 'linear-gradient(135deg, #00ff88, #00cc6a)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            animation: 'pulse 2s ease-in-out infinite',
            boxShadow: '0 0 30px rgba(0,255,136,0.6)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: '#000',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#00ff88'
            }}>
              D2
            </div>
          </div>
          
          <p style={{ 
            color: '#c0c0c0', 
            fontSize: '1.125rem',
            textShadow: '0 0 10px rgba(192,192,192,0.3)',
            animation: 'fadeIn 2s ease-in'
          }}>
            AI-Powered Build Optimization with Exotic Armor Synergy
          </p>
        </div>

        {/* Main Content */}
        <div style={{ maxWidth: '96rem', margin: '0 auto' }}>
          {selectedClass ? (
            <div style={{ textAlign: 'center', padding: '3rem', background: 'linear-gradient(135deg, rgba(0,0,0,0.8), rgba(20,20,20,0.9))', borderRadius: '1rem', backdropFilter: 'blur(10px)', border: '2px solid rgba(0,255,136,0.3)' }}>
              <div style={{ width: '6rem', height: '6rem', margin: '0 auto 1.5rem', background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #c0c0c0' }}>
                <span style={{ fontSize: '3rem' }}>
                  {selectedClass === 'hunter' ? '🏹' : selectedClass === 'warlock' ? '🔮' : '🛡️'}
                </span>
              </div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#00ff88', marginBottom: '1rem', textTransform: 'capitalize' }}>
                {selectedClass} Selected!
              </h2>
              <p style={{ color: '#c0c0c0', marginBottom: '2rem', fontSize: '1.125rem' }}>
                Build optimization features coming soon...
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => setSelectedClass(null)}
                  style={{ background: 'linear-gradient(135deg, #4b5563, #6b7280)', color: 'white', padding: '1rem 2rem', borderRadius: '0.5rem', cursor: 'pointer', border: '1px solid #c0c0c0' }}
                >
                  ← Back to Class Selection
                </button>
                <button 
                  style={{ background: 'linear-gradient(135deg, #00ff88, #c0c0c0, #ffd700)', color: 'black', padding: '1rem 2rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 'bold' }}
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
        <div style={{ textAlign: 'center', marginTop: '4rem', color: '#c0c0c0' }}>
          <p>Destiny 2 Build Optimizer - Choose Your Guardian Class</p>
        </div>
      </div>
    </div>
  )
}
