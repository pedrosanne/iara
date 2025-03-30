import { AssetType, TimeFrame } from '../types';

export interface ForecastDetails {
  type: 'BUY' | 'SELL';
  profitPotential: number;
  confidence: number;
  targetPrice: number;
  stopLoss: number;
  expiryTime: Date;
  riskLevel: 'BAIXO' | 'MÉDIO' | 'ALTO';
  volume: string;
}

const getExpiryTime = (timeFrame: TimeFrame): number => {
  switch (timeFrame) {
    case 'S10': return 10 * 1000; // 10 seconds
    case 'S30': return 30 * 1000; // 30 seconds
    case 'M1': return 60 * 1000; // 1 minute
    case 'M3': return 3 * 60 * 1000; // 3 minutes
    case 'M5': return 5 * 60 * 1000; // 5 minutes
    default: return 60 * 1000; // default to 1 minute
  }
};

export const generateForecastDetails = (
  assetType: AssetType,
  asset: string,
  timeFrame: TimeFrame,
  currentPrice: number
): ForecastDetails => {
  const type = Math.random() > 0.5 ? 'BUY' : 'SELL';
  const profitPotential = Math.floor(Math.random() * 30 + 70);
  const confidence = Math.floor(Math.random() * 20 + 80);
  const movement = (currentPrice * profitPotential) / 100;
  
  const targetPrice = type === 'BUY'
    ? currentPrice + movement
    : currentPrice - movement;
    
  const stopLoss = type === 'BUY'
    ? currentPrice - (movement * 0.3)
    : currentPrice + (movement * 0.3);

  const expiryTime = new Date(Date.now() + getExpiryTime(timeFrame));

  const riskLevels: Array<'BAIXO' | 'MÉDIO' | 'ALTO'> = ['BAIXO', 'MÉDIO', 'ALTO'];
  const riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)];

  const volume = (Math.floor(Math.random() * 9000) + 1000).toLocaleString('pt-BR');

  return {
    type,
    profitPotential,
    confidence,
    targetPrice,
    stopLoss,
    expiryTime,
    riskLevel,
    volume
  };
};