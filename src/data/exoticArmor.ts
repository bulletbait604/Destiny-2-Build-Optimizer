export interface ExoticArmorPiece {
  id: string;
  name: string;
  class: 'hunter' | 'warlock' | 'titan';
  slot: 'helmet' | 'gauntlets' | 'chest' | 'legs';
  description: string;
  perk: string;
}

export const exoticArmor: ExoticArmorPiece[] = [
  // Hunter Exotics
  {
    id: 'foetracer',
    name: 'Foetracer',
    class: 'hunter',
    slot: 'legs',
    description: 'Increased mobility and reload speed when dodging.',
    perk: 'Roadborn'
  },
  {
    id: 'stomp-ee5',
    name: 'Stomp-EE5',
    class: 'hunter',
    slot: 'legs',
    description: 'Powered melee kills grant increased weapon handling and reload speed.',
    perk: 'Kinetic Tremors'
  },
  {
    id: 'celestial-nighthawk',
    name: 'Celestial Nighthawk',
    class: 'hunter',
    slot: 'helmet',
    description: 'Golden Gun precision hits and final blows explode.',
    perk: 'Deadly Reach'
  },
  {
    id: 'graverobber',
    name: 'Graverobber',
    class: 'hunter',
    slot: 'gauntlets',
    description: 'Dodging automatically reloads your equipped weapon.',
    perk: 'Illicit Reload'
  },
  
  // Warlock Exotics
  {
    id: 'sunbracers',
    name: 'Sunbracers',
    class: 'warlock',
    slot: 'gauntlets',
    description: 'Solar grenades gain additional charges and deal more damage.',
    perk: 'Burning Bracers'
  },
  {
    id: 'transversive-steps',
    name: 'Transversive Steps',
    class: 'warlock',
    slot: 'legs',
    description: 'Charged with Light, your dodge becomes a damaging blast.',
    perk: 'Void Transversive'
  },
  {
    id: 'crown-of-temporal-storms',
    name: 'Crown of Temporal Storms',
    class: 'warlock',
    slot: 'helmet',
    description: 'Arc Soul ability casts have reduced cooldown and increased duration.',
    perk: 'Conduction Times'
  },
  {
    id: 'getaway-artist',
    name: 'Getaway Artist',
    class: 'warlock',
    slot: 'chest',
    description: 'Rifts charge faster and provide additional damage resistance.',
    perk: 'Escape Velocity'
  },
  
  // Titan Exotics
  {
    id: 'cuirass-of-the-falling-star',
    name: 'Cuirass of the Falling Star',
    class: 'titan',
    slot: 'chest',
    description: 'Final blows with a ranged weapon overload your next melee.',
    perk: 'Meteor Slam'
  },
  {
    id: 'dunemarchers',
    name: 'Dunemarchers',
    class: 'titan',
    slot: 'legs',
    description: 'Slam the ground to create a damaging shockwave.',
    perk: 'Ground Crater'
  },
  {
    id: 'icefall-mantle',
    name: 'Icefall Mantle',
    class: 'titan',
    slot: 'chest',
    description: 'Barricade can be deployed in the air and provides more cover.',
    perk: 'Glacial Guard'
  },
  {
    id: 'helm-of-saint-14',
    name: 'Helm of Saint-14',
    class: 'titan',
    slot: 'helmet',
    description: 'Throwing hammer kills grant overshield and reload weapons.',
    perk: 'Castigation'
  }
];
