import React, { useState, useEffect } from 'react';
import { Globe, Clock, TrendingUp, TrendingDown, AlertTriangle, DollarSign, Bitcoin, Briefcase } from 'lucide-react';

export const MarketHeader = () => {
  const [marketData, setMarketData] = useState({
    time: new Date(),
    indices: [
      { name: 'S&P 500', value: 5123.45, change: 0.75, type: 'index' },
      { name: 'NASDAQ', value: 16789.23, change: 1.2, type: 'index' },
      { name: 'Bitcoin', value: 66789.12, change: 2.5, type: 'crypto' },
      { name: 'EUR/USD', value: 1.0923, change: -0.15, type: 'forex' },
      { name: 'Petróleo', value: 82.45, change: 1.8, type: 'commodity' },
      { name: 'Ouro', value: 2150.30, change: 0.5, type: 'commodity' }
    ],
    alerts: [
      'Alta volatilidade detectada no mercado',
      'Relatório econômico importante em 30 minutos',
      'Tendência de alta confirmada em múltiplos ativos',
      'Volume institucional acima da média',
      'Correlação forte entre criptomoedas e índices'
    ]
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setMarketData(prev => ({
        ...prev,
        time: new Date(),
        indices: prev.indices.map(index => ({
          ...index,
          value: index.value + (Math.random() - 0.5) * (index.type === 'crypto' ? 100 : 10),
          change: index.change + (Math.random() - 0.5) * 0.1
        }))
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'index': return <Briefcase className="w-3 h-3" />;
      case 'crypto': return <Bitcoin className="w-3 h-3" />;
      case 'forex': return <DollarSign className="w-3 h-3" />;
      default: return <TrendingUp className="w-3 h-3" />;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm text-xs">
      <div className="flex flex-col lg:flex-row gap-2">
        {/* Header Info */}
        <div className="flex items-center gap-3 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 pb-2 lg:pb-0 lg:pr-3">
          <div className="flex items-center gap-1.5 text-gray-600">
            <Globe className="w-3 h-3" />
            <span className="font-medium">Mercados Globais</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <Clock className="w-3 h-3" />
            <span className="font-mono">
              {marketData.time.toLocaleTimeString()}
            </span>
          </div>
        </div>

        {/* Market Indices */}
        <div className="relative flex-grow overflow-hidden">
          <div className="flex animate-scroll-x gap-3 py-1">
            {[...marketData.indices, ...marketData.indices].map((index, i) => (
              <div key={i} className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg flex-shrink-0">
                {getIcon(index.type)}
                <span className="font-medium text-gray-700 whitespace-nowrap">{index.name}</span>
                <span className="font-mono whitespace-nowrap">{index.value.toFixed(2)}</span>
                <span className={`flex items-center whitespace-nowrap ${index.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {index.change >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {Math.abs(index.change).toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="flex items-center gap-1.5 flex-shrink-0 border-t lg:border-t-0 lg:border-l border-gray-200 pt-2 lg:pt-0 lg:pl-3">
          <AlertTriangle className="w-3 h-3 text-yellow-500 flex-shrink-0" />
          <div className="relative overflow-hidden w-48">
            <div className="animate-scroll whitespace-nowrap">
              {marketData.alerts.map((alert, i) => (
                <span key={i} className="inline-block mx-3 text-gray-600">{alert}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};