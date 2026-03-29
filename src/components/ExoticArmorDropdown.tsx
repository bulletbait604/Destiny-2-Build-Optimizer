'use client';

import React, { useState } from 'react';
import { exoticArmor, ExoticArmorPiece } from '@/data/exoticArmor';

interface ExoticArmorDropdownProps {
  selectedClass: 'hunter' | 'warlock' | 'titan';
  onArmorSelect: (armor: ExoticArmorPiece) => void;
}

export function ExoticArmorDropdown({ selectedClass, onArmorSelect }: ExoticArmorDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedArmor, setSelectedArmor] = useState<ExoticArmorPiece | null>(null);

  const classArmor = exoticArmor.filter(armor => armor.class === selectedClass);

  const handleArmorSelect = (armor: ExoticArmorPiece) => {
    setSelectedArmor(armor);
    setIsOpen(false);
    onArmorSelect(armor);
  };

  return (
    <div style={{ position: 'relative', zIndex: 1000 }}>
      <button
        style={{
          width: '100%',
          background: 'linear-gradient(135deg, #00ff88, #c0c0c0, #ffd700)',
          color: 'black',
          fontWeight: 'bold',
          padding: '1rem 1.5rem',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          border: 'none',
          fontSize: '1rem',
          transition: 'all 0.2s ease',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #00cc6a, #a0a0a0, #ccaa00)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #00ff88, #c0c0c0, #ffd700)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {selectedArmor ? selectedArmor.name : `Select ${selectedClass} Exotic Armor`}
        <span style={{ marginLeft: '0.5rem' }}>▼</span>
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'linear-gradient(135deg, rgba(0,0,0,0.95), rgba(10,10,10,0.98))',
          border: '2px solid rgba(0,255,136,0.5)',
          borderRadius: '0.5rem',
          marginTop: '0.5rem',
          maxHeight: '300px',
          overflowY: 'auto',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
          {classArmor.map((armor) => (
            <div
              key={armor.id}
              style={{
                padding: '1rem 1.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                borderBottom: '1px solid rgba(192,192,192,0.2)',
                color: '#c0c0c0'
              }}
              onClick={() => handleArmorSelect(armor)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0,255,136,0.1)';
                e.currentTarget.style.color = '#00ff88';
                e.currentTarget.style.borderColor = 'rgba(0,255,136,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#c0c0c0';
                e.currentTarget.style.borderColor = 'rgba(192,192,192,0.2)';
              }}
            >
              <div style={{ fontWeight: 'bold', marginBottom: '0.25rem', color: '#00ff88' }}>
                {armor.name}
              </div>
              <div style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                {armor.slot.charAt(0).toUpperCase() + armor.slot.slice(1)}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#a0a0a0', fontStyle: 'italic' }}>
                {armor.perk}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
