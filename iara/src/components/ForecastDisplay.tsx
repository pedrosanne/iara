import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Rocket, Target, TrendingDown, TrendingUp, Timer, AlertTriangle } from 'lucide-react';
import { Apple, Bitcoin, DollarSign, CandlestickChart } from 'lucide-react';
import type { ForecastDetails } from '../utils/forecastUtils';
import { ShareButton } from './ShareButton';
import { BrokerButton } from './BrokerButton';
import { TimeFrame, AssetType } from '../types';
import { useAuth } from '../hooks/useAuth';
import { CircularProgress } from './CircularProgress';

interface ForecastDisplayProps {
  forecast: ForecastDetails;
  currentPrice: number;
  asset: string;
  timeFrame: TimeFrame;
  assetType: AssetType;
  onClose: () => void;
}

export const ForecastDisplay = ({
  forecast,
  currentPrice,
  asset,
  timeFrame,
  assetType,
  onClose
}: ForecastDisplayProps) => {
  const { user } = useAuth();
  const showTelegramButton = user?.email === 'saclotuz@outlook.com';
  const timeRemaining = Math.max(0, forecast.expiryTime.getTime() - Date.now());
  const [remainingTime, setRemainingTime] = React.useState(timeRemaining);

  React.useEffect(() => {
    const timer = setInterval(() => {
      const newTime = Math.max(0, forecast.expiryTime.getTime() - Date.now());
      setRemainingTime(newTime);
      if (newTime <= 0) {
        clearInterval(timer);
        onClose();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [forecast.expiryTime, onClose]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'BAIXO': return 'text-green-500';
      case 'MÉDIO': return 'text-yellow-500';
      case 'ALTO': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getAssetIcon = () => {
    switch (assetType) {
      case 'stocks': return <Apple className="w-8 h-8 text-blue-500" />;
      case 'crypto': return <Bitcoin className="w-8 h-8 text-yellow-500" />;
      case 'currency': return <DollarSign className="w-8 h-8 text-green-500" />;
      default: return <CandlestickChart className="w-8 h-8 text-purple-500" />;
    }
  };

  const formatTimeRemaining = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    return `${seconds}s`;
  };

  const progress = (remainingTime / timeRemaining) * 100;

  return (
    <div className={`
      relative p-4 sm:p-6 rounded-xl border-2 backdrop-blur-sm w-full max-w-2xl mx-auto
      bg-gradient-to-br from-[hsl(var(--card))] to-[hsl(var(--card))]
      ${forecast.type === 'BUY' ? 'border-green-500' : 'border-red-500'}
      shadow-xl animate-fade-in
    `}>
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        >
          <span className="sr-only">Fechar</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex items-start justify-between mb-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <button
              className={`
                forecast-type-button flex items-center gap-1 text-sm px-3 py-1
                ${forecast.type === 'BUY' ? 'buy' : 'sell'}
                shadow-lg hover:shadow-xl transform hover:scale-105
              `}
            >
              {forecast.type === 'BUY' ? (
                <>
                  <TrendingUp className="w-4 h-4" />
                  COMPRA
                </>
              ) : (
                <>
                  <TrendingDown className="w-4 h-4" />
                  VENDA
                </>
              )}
            </button>
            <div className={`
              flex items-center gap-1 px-2 py-1 rounded-lg text-sm
              ${getRiskColor(forecast.riskLevel)} bg-opacity-10
              border border-current
            `}>
              <AlertTriangle className="w-3 h-3" />
              <span className="font-medium">Risco {forecast.riskLevel}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {getAssetIcon()}
            <span className="text-xl font-bold">{asset}</span>
          </div>
        </div>
        
        <div className="relative w-16 h-16 flex-shrink-0">
          <CircularProgress progress={progress} size={60} strokeWidth={4} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-sm font-bold">{formatTimeRemaining(remainingTime)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-[hsl(var(--input))] space-y-1">
          <p className="text-xs opacity-70 flex items-center gap-1">
            <Target className="w-3 h-3" />
            Preço Atual
          </p>
          <p className="text-lg font-mono font-bold">
            {currentPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-[hsl(var(--input))] space-y-1">
          <p className="text-xs opacity-70 flex items-center gap-1">
            <Rocket className="w-3 h-3" />
            Alvo
          </p>
          <p className="text-lg font-mono font-bold">
            {forecast.targetPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-green-500/10 to-green-600/10 space-y-1 border border-green-500/20">
          <p className="text-xs opacity-70">Potencial de Lucro</p>
          <p className="text-xl font-bold text-green-500">{forecast.profitPotential}%</p>
        </div>
        <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10 space-y-1 border border-blue-500/20">
          <p className="text-xs opacity-70">Confiança</p>
          <p className="text-xl font-bold text-blue-500">{forecast.confidence}%</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-2">
        <BrokerButton />
        {showTelegramButton && (
          <ShareButton
            forecast={forecast}
            asset={asset}
            timeFrame={timeFrame}
          />
        )}
      </div>
    </div>
  );
};