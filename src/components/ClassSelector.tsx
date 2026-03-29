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
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center text-green-400">
        Choose Your Guardian
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {guardianClasses.map((guardian) => (
          <div 
            key={guardian.id}
            className="bg-black/40 backdrop-blur-sm border-2 border-green-500/30 p-8 rounded-xl hover:border-green-400/50 transition-all duration-300 cursor-pointer group transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20"
            onClick={() => onClassSelect(guardian.id as 'hunter' | 'warlock' | 'titan')}
          >
            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-700 to-gray-800 rounded-full mb-6 flex items-center justify-center group-hover:from-green-600 group-hover:to-green-700 transition-all duration-300">
                <span className="text-5xl transform group-hover:scale-110 transition-transform duration-300">{guardian.emoji}</span>
              </div>
              <h3 className="text-2xl font-bold text-green-400 mb-3">{guardian.title}</h3>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">{guardian.description}</p>
              <button 
                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-black font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
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
