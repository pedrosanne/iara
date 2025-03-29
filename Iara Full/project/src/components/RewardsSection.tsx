import React from 'react';
import { Trophy, Gift, Car, Home, Star, Laptop, Smartphone, ChevronLeft, ChevronRight } from 'lucide-react';

interface Reward {
  milestone: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const rewards: Reward[] = [
  {
    milestone: '100K',
    title: 'Tech Bundle',
    description: 'MacBook Pro M3 + iPhone 15 Pro Max',
    icon: <div className="flex gap-1"><Laptop className="w-5 h-5" /><Smartphone className="w-5 h-5" /></div>,
    color: 'from-blue-500 to-blue-600'
  },
  {
    milestone: '500K',
    title: 'PCX',
    description: 'Honda PCX 150 0KM',
    icon: <Car className="w-5 h-5" />,
    color: 'from-green-500 to-green-600'
  },
  {
    milestone: '1M',
    title: 'Range Rover',
    description: 'Land Rover Evoque 0KM',
    icon: <Car className="w-5 h-5" />,
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    milestone: '5M',
    title: 'Porsche',
    description: 'Porsche 911 0KM',
    icon: <Car className="w-5 h-5" />,
    color: 'from-orange-500 to-orange-600'
  },
  {
    milestone: '10M',
    title: 'Dream House',
    description: 'Casa própria ou bônus em dinheiro',
    icon: <Home className="w-5 h-5" />,
    color: 'from-red-500 to-red-600'
  },
  {
    milestone: '100M',
    title: 'Prêmio Exclusivo',
    description: 'Premiação secreta revelada apenas ao vencedor',
    icon: <Star className="w-5 h-5" />,
    color: 'from-purple-500 to-purple-600'
  }
];

export const RewardsSection = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="glass-panel p-4 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <h2 className="text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            Programa de Premiações
          </h2>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors ```
          shadow-lg"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors shadow-lg"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div 
          ref={scrollRef}
          className="overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-4">
            {rewards.map((reward, index) => (
              <div
                key={index}
                className="flex-none w-72 glass-panel p-6 hover:scale-[1.02] transition-all duration-300 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg border border-white/10"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${reward.color} flex items-center justify-center text-white shadow-lg`}>
                    {reward.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                      {reward.milestone}
                    </h3>
                    <p className="text-sm text-gray-400">{reward.title}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-4">{reward.description}</p>
                <button className="w-full px-4 py-3 text-sm font-medium bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/20 rounded-lg hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300 text-blue-400 hover:text-blue-300 flex items-center justify-center gap-2">
                  <Gift className="w-4 h-4" />
                  Saiba mais
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};