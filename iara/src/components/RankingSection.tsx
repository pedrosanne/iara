import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Trophy, Clock, TrendingUp, Award } from 'lucide-react';

interface Trader {
  id: number;
  name: string;
  avatar: string;
  profit: number;
  trades: number;
  winRate: number;
  balance: number;
  rank: number;
  badge: string;
}

const traders: Trader[] = [
  {
    id: 1,
    name: "Ana Silva",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    profit: 387450,
    trades: 142,
    winRate: 92,
    balance: 1250000,
    rank: 1,
    badge: "Elite"
  },
  {
    id: 2,
    name: "Carlos Santos",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    profit: 284320,
    trades: 98,
    winRate: 88,
    balance: 980000,
    rank: 2,
    badge: "Master"
  },
  {
    id: 3,
    name: "Mariana Costa",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    profit: 198750,
    trades: 76,
    winRate: 85,
    balance: 750000,
    rank: 3,
    badge: "Expert"
  },
  {
    id: 4,
    name: "Pedro Oliveira",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    profit: 156890,
    trades: 64,
    winRate: 82,
    balance: 520000,
    rank: 4,
    badge: "Pro"
  },
  {
    id: 5,
    name: "Julia Mendes",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    profit: 98760,
    trades: 45,
    winRate: 79,
    balance: 320000,
    rank: 5,
    badge: "Advanced"
  }
];

const getBadgeColor = (badge: string) => {
  switch (badge) {
    case 'Elite': return 'bg-purple-500';
    case 'Master': return 'bg-yellow-500';
    case 'Expert': return 'bg-blue-500';
    case 'Pro': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
};

export const RankingSection = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [topTraders, setTopTraders] = useState(traders);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      setTopTraders(prev => prev.map(trader => ({
        ...trader,
        profit: trader.profit + Math.random() * 1000,
        trades: trader.trades + (Math.random() > 0.8 ? 1 : 0),
        winRate: Math.min(100, trader.winRate + (Math.random() > 0.9 ? 0.1 : -0.1))
      })));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <h3 className="text-xl font-bold text-[hsl(var(--foreground))]">Top Traders</h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-[hsl(var(--foreground))]">
          <Clock className="w-4 h-4" />
          {format(currentTime, "HH:mm:ss", { locale: ptBR })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {topTraders.map((trader) => (
          <div key={trader.id} className="glass-panel p-4 hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <img
                  src={trader.avatar}
                  alt={trader.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[hsl(var(--border))]"
                />
                <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full ${getBadgeColor(trader.badge)} flex items-center justify-center text-sm font-bold text-white`}>
                  {trader.rank}
                </div>
              </div>
              
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-[hsl(var(--foreground))] truncate">{trader.name}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getBadgeColor(trader.badge)} text-white whitespace-nowrap`}>
                    {trader.badge}
                  </span>
                </div>
                <div className="text-sm text-[hsl(var(--foreground))] opacity-70 truncate">
                  {trader.trades} trades • {trader.winRate.toFixed(1)}% win rate
                </div>
              </div>
              
              <div className="text-right flex-shrink-0">
                <div className="text-green-500 font-bold flex items-center gap-1 whitespace-nowrap">
                  <TrendingUp className="w-4 h-4" />
                  <span>+{trader.profit.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="text-sm text-[hsl(var(--foreground))] opacity-70 whitespace-nowrap">
                  {trader.balance.toLocaleString('pt-BR')}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};