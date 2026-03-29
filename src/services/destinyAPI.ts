export interface DestinyItem {
  hash: number;
  name: string;
  description: string;
  itemType: string;
  itemCategory: string;
  tier: string;
  classType?: string;
  slot?: string;
  perks?: string[];
  icon?: string;
  screenshot?: string;
}

export interface DestinyWeapon extends DestinyItem {
  damageType: string;
  ammoType: string;
  archetype: string;
  rpm?: number;
  impact?: number;
  range?: number;
  stability?: number;
  reloadSpeed?: number;
  magazine?: number;
}

export interface DestinyArmor extends DestinyItem {
  stats: {
    mobility?: number;
    resilience?: number;
    recovery?: number;
    discipline?: number;
    intellect?: number;
    strength?: number;
  };
}

export class DestinyAPIService {
  private readonly BUNGIE_API_KEY = process.env.NEXT_PUBLIC_BUNGIE_API_KEY;
  private readonly BUNGIE_CLIENT_ID = process.env.NEXT_PUBLIC_BUNGIE_CLIENT_ID;
  private readonly OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  private readonly DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
  private readonly GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

  private baseURL = 'https://www.bungie.net/Platform';
  private headers = {
    'X-API-Key': this.BUNGIE_API_KEY || '',
    'Content-Type': 'application/json',
  };

  async searchDestinyItems(query: string, itemType: 'armor' | 'weapons' = 'weapons'): Promise<DestinyItem[]> {
    try {
      // Search for items using Bungie API
      const searchResponse = await fetch(
        `${this.baseURL}/Destiny2/Armory/Search/${this.BUNGIE_CLIENT_ID}/`,
        {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify({
            searchDefinition: query,
            page: 0,
            itemsPerPage: 50,
            itemType: itemType
          })
        }
      );

      if (!searchResponse.ok) {
        throw new Error(`Bungie API search failed: ${searchResponse.statusText}`);
      }

      const searchData = await searchResponse.json();
      return this.formatDestinyItems(searchData.Response.results || []);
    } catch (error) {
      console.error('Destiny API search error:', error);
      // Fallback to mock data
      return this.getMockItems(itemType);
    }
  }

  async getExoticArmor(classType: 'hunter' | 'warlock' | 'titan'): Promise<DestinyArmor[]> {
    try {
      // Get exotic armor for specific class
      const exoticResponse = await fetch(
        `${this.baseURL}/Destiny2/Manifest/`,
        {
          headers: this.headers
        }
      );

      if (!exoticResponse.ok) {
        throw new Error(`Failed to fetch exotic armor: ${exoticResponse.statusText}`);
      }

      const manifestData = await exoticResponse.json();
      return this.filterExoticArmor(manifestData, classType);
    } catch (error) {
      console.error('Exotic armor fetch error:', error);
      return this.getMockExoticArmor(classType);
    }
  }

  async getBestWeapons(armorPiece: DestinyArmor): Promise<{
    exotic: DestinyWeapon;
    legendary: DestinyWeapon[];
  }> {
    try {
      // Use AI to determine best weapon synergies
      const aiPrompt = `Given this Destiny 2 exotic armor piece:
      Name: ${armorPiece.name}
      Class: ${armorPiece.classType}
      Slot: ${armorPiece.slot}
      Perks: ${armorPiece.perks?.join(', ')}
      Stats: ${JSON.stringify(armorPiece.stats)}

      Recommend the absolute best weapon loadout that maximizes synergy with this armor. Return:
      1. One exotic weapon (name, type, description)
      2. Two legendary weapons (name, type, slot, description)
      3. Explain the synergy between armor and weapons
      4. Suggest optimal playstyle

      Format as JSON with keys: exoticWeapon, legendaryWeapons, synergy, playstyle`;

      const aiResponse = await this.callAI(aiPrompt);
      
      if (aiResponse) {
        return this.parseAIWeaponResponse(aiResponse);
      }

      // Fallback to curated recommendations
      return this.getCuratedWeapons(armorPiece);
    } catch (error) {
      console.error('AI weapon recommendation error:', error);
      return this.getCuratedWeapons(armorPiece);
    }
  }

  private async callAI(prompt: string): Promise<string | null> {
    try {
      // Try OpenAI first
      if (this.OPENAI_API_KEY) {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 1000
          })
        });

        if (response.ok) {
          const data = await response.json();
          return data.choices[0]?.message?.content || null;
        }
      }

      // Try DeepSeek as backup
      if (this.DEEPSEEK_API_KEY) {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.DEEPSEEK_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 1000
          })
        });

        if (response.ok) {
          const data = await response.json();
          return data.choices[0]?.message?.content || null;
        }
      }

      // Try Google as final backup
      if (this.GOOGLE_API_KEY) {
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.GOOGLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        });

        if (response.ok) {
          const data = await response.json();
          return data.candidates[0]?.content?.parts[0]?.text || null;
        }
      }

      return null;
    } catch (error) {
      console.error('AI service error:', error);
      return null;
    }
  }

  private parseAIWeaponResponse(aiResponse: string): {
    exotic: DestinyWeapon;
    legendary: DestinyWeapon[];
  } {
    try {
      const parsed = JSON.parse(aiResponse);
      return {
        exotic: {
          hash: 0,
          name: parsed.exoticWeapon?.name || 'Unknown Exotic',
          description: parsed.exoticWeapon?.description || '',
          itemType: 'Exotic Weapon',
          itemCategory: 'Weapon',
          tier: 'Exotic',
          damageType: 'Unknown',
          ammoType: 'Unknown',
          archetype: 'Unknown'
        },
        legendary: (parsed.legendaryWeapons || []).map((weapon: any) => ({
          hash: 0,
          name: weapon.name || 'Unknown Legendary',
          description: weapon.description || '',
          itemType: 'Legendary Weapon',
          itemCategory: 'Weapon',
          tier: 'Legendary',
          slot: weapon.slot || 'Unknown',
          damageType: 'Unknown',
          ammoType: 'Unknown',
          archetype: 'Unknown'
        }))
      };
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      return this.getCuratedWeapons({} as DestinyArmor);
    }
  }

  private getCuratedWeapons(armorPiece: DestinyArmor): {
    exotic: DestinyWeapon;
    legendary: DestinyWeapon[];
  } {
    const weaponMap: Record<string, any> = {
      'celestial-nighthawk': {
        exotic: {
          hash: 123456789,
          name: 'Ace of Spades',
          description: 'Exotic Solar hand cannon with Firefly and Memento Mori perks. Precision kills increase reload speed and cause targets to explode.',
          itemType: 'Exotic Weapon',
          itemCategory: 'Hand Cannon',
          tier: 'Exotic',
          damageType: 'Solar',
          ammoType: 'Primary',
          archetype: 'Aggressive Frame',
          rpm: 140,
          impact: 98,
          range: 52,
          stability: 48,
          reloadSpeed: 48,
          magazine: 13
        },
        legendary: [
          {
            hash: 234567890,
            name: 'Trust',
            description: 'A reliable hand cannon favored by City security forces. High stability with respectable impact.',
            itemType: 'Legendary Weapon',
            itemCategory: 'Hand Cannon',
            tier: 'Legendary',
            slot: 'Kinetic',
            damageType: 'Kinetic',
            ammoType: 'Primary',
            archetype: 'Adaptive Frame',
            rpm: 120,
            impact: 85,
            range: 58,
            stability: 65,
            reloadSpeed: 55,
            magazine: 10
          },
          {
            hash: 345678901,
            name: 'Wish-Ender',
            description: 'A sniper rifle designed to eliminate high-value targets with extreme prejudice. High damage and aim assistance.',
            itemType: 'Legendary Weapon',
            itemCategory: 'Sniper Rifle',
            tier: 'Legendary',
            slot: 'Energy',
            damageType: 'Solar',
            ammoType: 'Special',
            archetype: 'Aggressive Frame',
            rpm: 90,
            impact: 120,
            range: 85,
            stability: 45,
            reloadSpeed: 40,
            magazine: 4
          }
        ]
      },
      'sunbracers': {
        exotic: {
          hash: 234567891,
          name: 'Sunshot',
          description: 'Exotic Solar hand cannon with explosive rounds and Sun Blast perk. Precision shots create solar explosions.',
          itemType: 'Exotic Weapon',
          itemCategory: 'Hand Cannon',
          tier: 'Exotic',
          damageType: 'Solar',
          ammoType: 'Primary',
          archetype: 'Aggressive Frame'
        },
        legendary: [
          {
            hash: 456789012,
            name: 'Fusion Rifle',
            description: 'Solar fusion rifle that benefits from increased grenade damage and ability regeneration.',
            itemType: 'Legendary Weapon',
            itemCategory: 'Fusion Rifle',
            tier: 'Legendary',
            slot: 'Energy',
            damageType: 'Solar',
            ammoType: 'Special'
          },
          {
            hash: 567890123,
            name: 'Mountaintop',
            description: 'Legendary grenade launcher with high velocity and blast radius. Perfect for area denial.',
            itemType: 'Legendary Weapon',
            itemCategory: 'Grenade Launcher',
            tier: 'Legendary',
            slot: 'Power',
            damageType: 'Solar',
            ammoType: 'Heavy'
          }
        ]
      },
      'helm-of-saint-14': {
        exotic: {
          hash: 345678902,
          name: 'Throne World',
          description: 'Exotic Solar shotgun with precision damage and reload bonuses. Perfect for aggressive close-range combat.',
          itemType: 'Exotic Weapon',
          itemCategory: 'Shotgun',
          tier: 'Exotic',
          damageType: 'Solar',
          ammoType: 'Primary',
          archetype: 'Aggressive Frame'
        },
        legendary: [
          {
            hash: 678901234,
            name: 'Found Verdict',
            description: 'Legendary shotgun with high impact and crowd control capabilities. Favored by Titan forces.',
            itemType: 'Legendary Weapon',
            itemCategory: 'Shotgun',
            tier: 'Legendary',
            slot: 'Kinetic',
            damageType: 'Kinetic',
            ammoType: 'Primary'
          },
          {
            hash: 789012345,
            name: 'Anarchy',
            description: 'Legendary submachine gun with chain lightning effects. Rapid fire with area damage potential.',
            itemType: 'Legendary Weapon',
            itemCategory: 'Submachine Gun',
            tier: 'Legendary',
            slot: 'Energy',
            damageType: 'Arc',
            ammoType: 'Primary'
          }
        ]
      }
    };

    return weaponMap[armorPiece.hash?.toString()] || weaponMap['celestial-nighthawk'];
  }

  private formatDestinyItems(items: any[]): DestinyItem[] {
    return items.map(item => ({
      hash: item.hash || 0,
      name: item.displayProperties?.name || 'Unknown Item',
      description: item.displayProperties?.description || '',
      itemType: item.itemType || 'Unknown',
      itemCategory: item.itemCategory || 'Unknown',
      tier: item.inventory?.tierTypeName || 'Unknown',
      classType: item.classType,
      slot: item.equippingBlock?.equipmentSlotType,
      perks: item.perks?.map((p: any) => p.displayProperties?.name) || [],
      icon: item.displayProperties?.icon,
      screenshot: item.screenshot
    }));
  }

  private filterExoticArmor(manifestData: any, classType: string): DestinyArmor[] {
    // This would parse the actual Destiny 2 manifest
    // For now, return mock exotic armor data
    return this.getMockExoticArmor(classType as 'hunter' | 'warlock' | 'titan');
  }

  private getMockExoticArmor(classType: 'hunter' | 'warlock' | 'titan'): DestinyArmor[] {
    const mockArmor: Record<string, DestinyArmor[]> = {
      hunter: [
        {
          hash: 123456789,
          name: 'Celestial Nighthawk',
          description: 'Golden Gun precision hits and final blows explode, dealing massive damage to surrounding targets.',
          itemType: 'Exotic Armor',
          itemCategory: 'Helmet',
          tier: 'Exotic',
          classType: 'Hunter',
          slot: 'Helmet',
          perks: ['Deadly Reach', 'Nighthawk Precision'],
          stats: {
            mobility: 100,
            resilience: 60,
            recovery: 80,
            discipline: 40,
            intellect: 60,
            strength: 40
          }
        }
      ],
      warlock: [
        {
          hash: 234567890,
          name: 'Sunbracers',
          description: 'Solar grenades gain additional charges and deal more damage. Perfect for area control.',
          itemType: 'Exotic Armor',
          itemCategory: 'Gauntlets',
          tier: 'Exotic',
          classType: 'Warlock',
          slot: 'Gauntlets',
          perks: ['Burning Bracers', 'Enhanced Grenades'],
          stats: {
            mobility: 60,
            resilience: 80,
            recovery: 100,
            discipline: 120,
            intellect: 80,
            strength: 40
          }
        }
      ],
      titan: [
        {
          hash: 345678901,
          name: 'Helm of Saint-14',
          description: 'Throwing hammer kills grant overshield and reload weapons. Built for aggressive frontline combat.',
          itemType: 'Exotic Armor',
          itemCategory: 'Helmet',
          tier: 'Exotic',
          classType: 'Titan',
          slot: 'Helmet',
          perks: ['Castigation', 'Shielding Strike'],
          stats: {
            mobility: 40,
            resilience: 100,
            recovery: 60,
            discipline: 60,
            intellect: 60,
            strength: 100
          }
        }
      ]
    };

    return mockArmor[classType] || [];
  }

  private getMockItems(itemType: 'armor' | 'weapons'): DestinyItem[] {
    // Return mock data when API is unavailable
    return [];
  }
}
