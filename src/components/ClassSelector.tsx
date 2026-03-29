'use client';

import { useState } from 'react';
import { HunterSymbol, WarlockSymbol, TitanSymbol } from './ClassSymbols';
import { ExoticArmorDropdown } from './ExoticArmorDropdown';
import { ExoticArmorPiece } from '@/data/exoticArmor';

const guardianClasses = [
  {
    id: 'hunter',
    symbol: <HunterSymbol />,
    title: 'Hunter',
    description: 'Master of void, precision, and agility'
  },
  {
    id: 'warlock', 
    symbol: <WarlockSymbol />,
    title: 'Warlock',
    description: 'Wielder of cosmic Light and arcane power'
  },
  {
    id: 'titan',
    symbol: <TitanSymbol />,
    title: 'Titan', 
    description: 'Unstoppable force of resilience and strength'
  }
];

interface ClassSelectorProps {
  onClassSelect: (guardianClass: 'hunter' | 'warlock' | 'titan') => void
}

export function ClassSelector({ onClassSelect }: ClassSelectorProps) {
  const [selectedClass, setSelectedClass] = useState<'hunter' | 'warlock' | 'titan' | null>(null);
  const [selectedArmor, setSelectedArmor] = useState<ExoticArmorPiece | null>(null);
  const [showBuildResults, setShowBuildResults] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleClassSelect = (guardianClass: 'hunter' | 'warlock' | 'titan') => {
    setSelectedClass(guardianClass);
    setSelectedArmor(null);
    setShowBuildResults(false);
  };

  const handleArmorSelect = async (armor: ExoticArmorPiece) => {
    setSelectedArmor(armor);
    setIsOptimizing(true);
    
    // Simulate AI optimization
    setTimeout(() => {
      setShowBuildResults(true);
      setIsOptimizing(false);
    }, 2000);
  };

  const handleBackToClasses = () => {
    setSelectedClass(null);
    setSelectedArmor(null);
    setShowBuildResults(false);
  };

  if (selectedClass && selectedArmor && showBuildResults) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(0,0,0,0.8), rgba(20,20,20,0.9))', 
          borderRadius: '1rem', 
          padding: '2rem',
          border: '2px solid rgba(0,255,136,0.3)',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{ fontSize: '2rem', color: '#00ff88', marginBottom: '1rem' }}>
            Optimized Build for {selectedArmor.name}
          </h2>
          
          <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
            <h3 style={{ color: '#ffd700', marginBottom: '1rem' }}>Recommended Loadout:</h3>
            
            <div style={{ 
              background: 'rgba(0,255,136,0.1)', 
              padding: '1rem', 
              borderRadius: '0.5rem', 
              marginBottom: '1rem',
              border: '1px solid rgba(0,255,136,0.3)'
            }}>
              <h4 style={{ color: '#00ff88', marginBottom: '0.5rem' }}>Exotic Weapon:</h4>
              <p style={{ color: '#c0c0c0' }}>Ace of Spades (Hand Cannon)</p>
            </div>
            
            <div style={{ 
              background: 'rgba(192,192,192,0.1)', 
              padding: '1rem', 
              borderRadius: '0.5rem', 
              marginBottom: '1rem',
              border: '1px solid rgba(192,192,192,0.3)'
            }}>
              <h4 style={{ color: '#c0c0c0', marginBottom: '0.5rem' }}>Legendary Weapons:</h4>
              <p style={{ color: '#c0c0c0' }}>• Trust (Kinetic Hand Cannon)</p>
              <p style={{ color: '#c0c0c0' }}>• Wish-Ender (Energy Sniper Rifle)</p>
            </div>
            
            <div style={{ 
              background: 'rgba(255,215,0,0.1)', 
              padding: '1rem', 
              borderRadius: '0.5rem', 
              marginBottom: '1rem',
              border: '1px solid rgba(255,215,0,0.3)'
            }}>
              <h4 style={{ color: '#ffd700', marginBottom: '0.5rem' }}>Synergy:</h4>
              <p style={{ color: '#c0c0c0', lineHeight: '1.5' }}>
                Explosive Golden Gun shots pair perfectly with Ace of Spades' Firefly perk, creating devastating chain reactions.
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={handleBackToClasses}
              style={{ 
                background: 'linear-gradient(135deg, #4b5563, #6b7280)', 
                color: 'white', 
                padding: '1rem 2rem', 
                borderRadius: '0.5rem', 
                cursor: 'pointer',
                border: '1px solid #c0c0c0'
              }}
            >
              ← Back to Classes
            </button>
            <button 
              style={{ 
                background: 'linear-gradient(135deg, #00ff88, #c0c0c0, #ffd700)', 
                color: 'black', 
                padding: '1rem 2rem', 
                borderRadius: '0.5rem', 
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Scan DIM Inventory
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedClass) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', color: '#00ff88', marginBottom: '2rem' }}>
          Choose {selectedClass.charAt(0).toUpperCase() + selectedClass.slice(1)} Exotic Armor
        </h2>
        
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <ExoticArmorDropdown 
            selectedClass={selectedClass} 
            onArmorSelect={handleArmorSelect}
          />
        </div>
        
        {isOptimizing && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <div style={{ 
              display: 'inline-block', 
              padding: '1rem 2rem', 
              background: 'rgba(0,255,136,0.1)', 
              borderRadius: '0.5rem',
              border: '2px solid rgba(0,255,136,0.3)'
            }}>
              <p style={{ color: '#00ff88', fontWeight: 'bold' }}>🤖 AI Optimizing Your Build...</p>
            </div>
          </div>
        )}
        
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button 
            onClick={handleBackToClasses}
            style={{ 
              background: 'linear-gradient(135deg, #4b5563, #6b7280)', 
              color: 'white', 
              padding: '1rem 2rem', 
              borderRadius: '0.5rem', 
              cursor: 'pointer',
              border: '1px solid #c0c0c0'
            }}
          >
            ← Back to Class Selection
          </button>
        </div>
      </div>
    );
  }

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
            onClick={() => handleClassSelect(guardian.id as 'hunter' | 'warlock' | 'titan')}
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
                {guardian.symbol}
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
                  handleClassSelect(guardian.id as 'hunter' | 'warlock' | 'titan');
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
