'use client';

import { useState } from 'react';
import { HunterSymbol, WarlockSymbol, TitanSymbol } from './ClassSymbols';
import { ExoticArmorDropdown } from './ExoticArmorDropdown';
import { ExoticArmorPiece } from '@/data/exoticArmor';
import { BuildOptimizerService, OptimizedBuild } from '@/services/buildOptimizer';

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
  const [optimizedBuild, setOptimizedBuild] = useState<OptimizedBuild | null>(null);
  const [dimScanResults, setDimScanResults] = useState<string[]>([]);

  const buildOptimizer = new BuildOptimizerService();

  const handleClassSelect = (guardianClass: 'hunter' | 'warlock' | 'titan') => {
    setSelectedClass(guardianClass);
    setSelectedArmor(null);
    setShowBuildResults(false);
    setOptimizedBuild(null);
    setDimScanResults([]);
  };

  const handleArmorSelect = async (armor: ExoticArmorPiece) => {
    setSelectedArmor(armor);
    setIsOptimizing(true);
    setShowBuildResults(false);
    
    try {
      // Use real API to optimize build
      const build = await buildOptimizer.optimizeBuild(armor);
      setOptimizedBuild(build);
      setShowBuildResults(true);
    } catch (error) {
      console.error('Build optimization failed:', error);
      // Fallback to mock data
      setShowBuildResults(true);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleDIMScan = async () => {
    if (!optimizedBuild) return;
    
    setDimScanResults(['🔍 Scanning your DIM inventory...']);
    
    try {
      const scanResults = await buildOptimizer.scanDIMInventory(optimizedBuild);
      setDimScanResults(scanResults);
    } catch (error) {
      console.error('DIM scan failed:', error);
      setDimScanResults(['❌ Failed to scan DIM inventory']);
    }
  };

  const handleBackToClasses = () => {
    setSelectedClass(null);
    setSelectedArmor(null);
    setShowBuildResults(false);
    setOptimizedBuild(null);
    setDimScanResults([]);
  };

  if (selectedClass && selectedArmor && showBuildResults && optimizedBuild) {
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
            Optimized Build for {optimizedBuild.exoticArmor.name}
          </h2>
          
          <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
            <h3 style={{ color: '#ffd700', marginBottom: '1rem' }}>🔥 AI-Optimized Loadout:</h3>
            
            <div style={{ 
              background: 'rgba(0,255,136,0.1)', 
              padding: '1rem', 
              borderRadius: '0.5rem', 
              marginBottom: '1rem',
              border: '1px solid rgba(0,255,136,0.3)'
            }}>
              <h4 style={{ color: '#00ff88', marginBottom: '0.5rem' }}>⚡ Exotic Weapon:</h4>
              <p style={{ color: '#c0c0c0', fontWeight: 'bold' }}>{optimizedBuild.weapons.exotic.name}</p>
              <p style={{ color: '#a0a0a0', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                {optimizedBuild.weapons.exotic.description}
              </p>
              <div style={{ fontSize: '0.75rem', color: '#00ff88', marginTop: '0.5rem' }}>
                {optimizedBuild.weapons.exotic.damageType} • {optimizedBuild.weapons.exotic.itemCategory}
                {optimizedBuild.weapons.exotic.rpm && ` • ${optimizedBuild.weapons.exotic.rpm} RPM`}
                {optimizedBuild.weapons.exotic.impact && ` • ${optimizedBuild.weapons.exotic.impact} Impact`}
              </div>
            </div>
            
            <div style={{ 
              background: 'rgba(192,192,192,0.1)', 
              padding: '1rem', 
              borderRadius: '0.5rem', 
              marginBottom: '1rem',
              border: '1px solid rgba(192,192,192,0.3)'
            }}>
              <h4 style={{ color: '#c0c0c0', marginBottom: '0.5rem' }}>⚔️ Legendary Weapons:</h4>
              {optimizedBuild.weapons.legendary.map((weapon, index) => (
                <div key={index} style={{ marginBottom: '1rem' }}>
                  <p style={{ color: '#c0c0c0', fontWeight: 'bold' }}>
                    {weapon.name} ({weapon.slot})
                  </p>
                  <p style={{ color: '#a0a0a0', fontSize: '0.875rem' }}>
                    {weapon.description}
                  </p>
                  <div style={{ fontSize: '0.75rem', color: '#c0c0c0', marginTop: '0.5rem' }}>
                    {weapon.damageType} • {weapon.itemCategory}
                    {weapon.rpm && ` • ${weapon.rpm} RPM`}
                    {weapon.impact && ` • ${weapon.impact} Impact`}
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ 
              background: 'rgba(255,215,0,0.1)', 
              padding: '1rem', 
              borderRadius: '0.5rem', 
              marginBottom: '1rem',
              border: '1px solid rgba(255,215,0,0.3)'
            }}>
              <h4 style={{ color: '#ffd700', marginBottom: '0.5rem' }}>🔗 Armor Synergy:</h4>
              <p style={{ color: '#c0c0c0', lineHeight: '1.5' }}>
                {optimizedBuild.armorSynergy}
              </p>
            </div>
            
            <div style={{ 
              background: 'rgba(0,255,136,0.05)', 
              padding: '1rem', 
              borderRadius: '0.5rem', 
              marginBottom: '1rem',
              border: '1px solid rgba(0,255,136,0.2)'
            }}>
              <h4 style={{ color: '#00ff88', marginBottom: '0.5rem' }}>🎯 Recommended Playstyle:</h4>
              <p style={{ color: '#c0c0c0', fontStyle: 'italic' }}>
                {optimizedBuild.playstyle}
              </p>
            </div>
          </div>
          
          {dimScanResults.length > 0 && (
            <div style={{ 
              background: 'rgba(0,100,200,0.1)', 
              padding: '1rem', 
              borderRadius: '0.5rem', 
              marginBottom: '1rem',
              border: '1px solid rgba(0,100,200,0.3)'
            }}>
              <h4 style={{ color: '#00b4d8', marginBottom: '0.5rem' }}>🔍 DIM Inventory Scan Results:</h4>
              {dimScanResults.map((result, index) => (
                <p key={index} style={{ color: '#c0c0c0', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                  {result}
                </p>
              ))}
            </div>
          )}
          
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
              onClick={handleDIMScan}
              disabled={dimScanResults.length > 0}
              style={{ 
                background: dimScanResults.length > 0 
                  ? 'linear-gradient(135deg, #6b7280, #4b5563)' 
                  : 'linear-gradient(135deg, #00ff88, #c0c0c0, #ffd700)', 
                color: dimScanResults.length > 0 ? '#9ca3af' : 'black', 
                padding: '1rem 2rem', 
                borderRadius: '0.5rem', 
                cursor: dimScanResults.length > 0 ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                opacity: dimScanResults.length > 0 ? 0.6 : 1
              }}
            >
              {dimScanResults.length > 0 ? '✓ Scanned' : '🔍 Scan DIM Inventory'}
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
