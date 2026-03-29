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
  const handleCardClick = (guardianClass: 'hunter' | 'warlock' | 'titan') => {
    console.log('Card clicked:', guardianClass);
    onClassSelect(guardianClass);
  };

  return (
    <div style={{ padding: '2rem 0' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', color: '#00ff88', marginBottom: '2rem' }}>
        Choose Your Guardian
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '80rem', margin: '0 auto' }}>
        {guardianClasses.map((guardian) => (
          <div 
            key={guardian.id}
            style={{ 
              background: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(10,10,10,0.8))', 
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(0,255,136,0.3)',
              padding: '2rem',
              borderRadius: '0.75rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onClick={() => handleCardClick(guardian.id as 'hunter' | 'warlock' | 'titan')}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0,255,136,0.6)';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,255,136,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0,255,136,0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '8rem', 
                height: '8rem', 
                margin: '0 auto 1.5rem', 
                background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                border: '2px solid #c0c0c0'
              }}>
                <span style={{ fontSize: '3rem' }}>{guardian.emoji}</span>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#00ff88', marginBottom: '0.75rem' }}>
                {guardian.title}
              </h3>
              <p style={{ color: '#c0c0c0', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                {guardian.description}
              </p>
              <button 
                style={{ 
                  width: '100%',
                  background: 'linear-gradient(135deg, #00ff88, #c0c0c0, #ffd700)', 
                  color: 'black', 
                  fontWeight: 'bold', 
                  padding: '0.75rem 1.5rem', 
                  borderRadius: '0.5rem', 
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: 'none',
                  fontSize: '1rem'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(guardian.id as 'hunter' | 'warlock' | 'titan');
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #00cc6a, #a0a0a0, #ccaa00)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #00ff88, #c0c0c0, #ffd700)';
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
