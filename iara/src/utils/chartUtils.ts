import { AssetType } from '../types';
import { priceRanges } from '../constants/priceRanges';

export const generateChartData = (
  assetType: AssetType,
  asset: string,
  timeFrame: string,
  dataPoints = 100
) => {
  const range = priceRanges[assetType][asset] || { min: 100, max: 110 };
  const volatility = assetType === 'crypto' ? 0.015 : 0.008;
  const data = [];
  const now = new Date();
  let lastClose = (range.min + range.max) / 2;

  for (let i = 0; i < dataPoints; i++) {
    const time = new Date(now.getTime() - (dataPoints - i) * 60000);
    const change = (Math.random() - 0.5) * volatility * lastClose;
    const open = lastClose;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * Math.abs(change);
    const low = Math.min(open, close) - Math.random() * Math.abs(change);
    
    lastClose = close;
    
    data.push({
      time: time.getTime() / 1000,
      open,
      high,
      low,
      close,
    });
  }
  
  return data;
};