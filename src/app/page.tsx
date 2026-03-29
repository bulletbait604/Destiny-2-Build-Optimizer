export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Destiny 2 Build Optimizer
          </h1>
          <p className="text-gray-300 text-lg">
            AI-Powered Build Optimization with Exotic Armor Synergy
          </p>
        </div>

        {/* Main Content - Step 1: Class Selection */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-green-400">
            Choose Your Guardian
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Hunter */}
            <div className="bg-black/50 border-2 border-green-500/30 p-6 rounded-lg hover:border-green-400/50 transition-all duration-300 cursor-pointer">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gray-700 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-4xl">🏹</span>
                </div>
                <h3 className="text-2xl font-bold text-green-400 mb-2">Hunter</h3>
                <p className="text-gray-300 text-sm mb-4">Master of void, precision, and agility</p>
                <button 
                  onClick={() => console.log('Hunter selected')}
                  className="w-full bg-green-600 hover:bg-green-500 text-black font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Select Hunter
                </button>
              </div>
            </div>

            {/* Warlock */}
            <div className="bg-black/50 border-2 border-green-500/30 p-6 rounded-lg hover:border-green-400/50 transition-all duration-300 cursor-pointer">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gray-700 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-4xl">🔮</span>
                </div>
                <h3 className="text-2xl font-bold text-green-400 mb-2">Warlock</h3>
                <p className="text-gray-300 text-sm mb-4">Wielder of cosmic Light and arcane power</p>
                <button 
                  onClick={() => console.log('Warlock selected')}
                  className="w-full bg-green-600 hover:bg-green-500 text-black font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Select Warlock
                </button>
              </div>
            </div>

            {/* Titan */}
            <div className="bg-black/50 border-2 border-green-500/30 p-6 rounded-lg hover:border-green-400/50 transition-all duration-300 cursor-pointer">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gray-700 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-4xl">🛡️</span>
                </div>
                <h3 className="text-2xl font-bold text-green-400 mb-2">Titan</h3>
                <p className="text-gray-300 text-sm mb-4">Unstoppable force of resilience and strength</p>
                <button 
                  onClick={() => console.log('Titan selected')}
                  className="w-full bg-green-600 hover:bg-green-500 text-black font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Select Titan
                </button>
              </div>
            </div>
          </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-400">
          <p>Destiny 2 Build Optimizer - Choose Your Guardian Class</p>
        </div>
      </div>
    </div>
  )
}
