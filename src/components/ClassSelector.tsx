'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ClassSelectorProps {
  onClassSelect: (guardianClass: 'hunter' | 'warlock' | 'titan') => void
}

const guardianImages = {
  hunter: '/guardians/hunter.jpg',
  warlock: '/guardians/warlock.jpg',
  titan: '/guardians/titan.jpg'
}

const classDescriptions = {
  hunter: 'Master the void with precision and agility',
  warlock: 'Wield the cosmic power of the Light',
  titan: 'Unleash devastating strength and resilience'
}

export function ClassSelector({ onClassSelect }: ClassSelectorProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-400">
            Choose Your Guardian
          </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {Object.entries(guardianImages).map(([guardianClass, imagePath]) => (
          <Card 
            key={guardianClass}
            className="bg-black/50 border-green-500/30 hover:border-green-400/50 transition-all duration-300 cursor-pointer group"
            onClick={() => onClassSelect(guardianClass as 'hunter' | 'warlock' | 'titan')}
          >
            <CardHeader className="text-center">
              <div className="relative overflow-hidden rounded-lg mb-4">
                    <img 
                      src={imagePath}
                      alt={`${guardianClass} guardian`}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <CardTitle className="text-2xl font-bold text-green-400 capitalize">
                        {guardianClass}
                      </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-gray-300 text-sm">
                        {classDescriptions[guardianClass as keyof typeof classDescriptions]}
                      </CardDescription>
              <Button 
                className="w-full mt-4 bg-green-600 hover:bg-green-500 text-black font-semibold"
              >
                Select {guardianClass}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
