'use client'

const guardianClasses = [
  {
    id: 'hunter',
    emoji: '🏹',
    title: 'Hunter',
    description: 'Master of void, precision, and agility'
  },
  {
    id: 'warlock', 
    emoji: '🔮',
    title: 'Warlock',
    description: 'Wielder of cosmic Light and arcane power'
  },
  {
    id: 'titan',
    emoji: '🛡️',
    title: 'Titan', 
    description: 'Unstoppable force of resilience and strength'
  }
]

interface ClassSelectorProps {
  onClassSelect: (guardianClass: 'hunter' | 'warlock' | 'titan') => void
}

export function ClassSelector({ onClassSelect }: ClassSelectorProps) {
  return (
    <div style={{ padding: '2rem 0' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', color: '#4ade80', marginBottom: '2rem' }}>
        Choose Your Guardian
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '80rem', margin: '0 auto' }}>
        {guardianClasses.map((guardian) => (
          <div 
            key={guardian.id}
            style={{ 
              background: 'linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.6))', 
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(34, 197, 94, 0.3)',
              padding: '2rem',
              borderRadius: '0.75rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onClick={() => onClassSelect(guardian.id as 'hunter' | 'warlock' | 'titan')}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.5)';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(34, 197, 94, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '8rem', 
                height: '8rem', 
                margin: '0 auto 1.5rem', 
                background: 'linear-gradient(135deg, #374151, #1f2937)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}>
                <span style={{ fontSize: '3rem' }}>{guardian.emoji}</span>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4ade80', marginBottom: '0.75rem' }}>
                {guardian.title}
              </h3>
              <p style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                {guardian.description}
              </p>
              <button 
                style={{ 
                  width: '100%',
                  background: 'linear-gradient(135deg, #16a34a, #22c55e)', 
                  color: 'black', 
                  fontWeight: 'bold', 
                  padding: '0.75rem 1.5rem', 
                  borderRadius: '0.5rem', 
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: 'none',
                  fontSize: '1rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #16a34a, #22c55e)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Select {guardian.title}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
