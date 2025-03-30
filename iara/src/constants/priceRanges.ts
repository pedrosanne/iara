import { AssetType } from '../types';

interface PriceRange {
  min: number;
  max: number;
}

export const priceRanges: Record<AssetType, Record<string, PriceRange>> = {
  stocks: {
    'Apple': { min: 170, max: 190 },
    'Google': { min: 140, max: 150 },
    'Amazon': { min: 170, max: 180 },
    'Meta': { min: 480, max: 500 },
    'Tesla': { min: 180, max: 200 },
    'Crude Oil Brent': { min: 80, max: 85 },
    'US 500': { min: 5100, max: 5200 },
    'US 100': { min: 17800, max: 18000 },
    'US 30': { min: 38500, max: 39000 }
  },
  crypto: {
    'Bitcoin': { min: 85000, max: 77000 },
    'Doge': { min: 0.15, max: 0.16 },
    'Ethereum': { min: 3500, max: 3600 },
    'Cardano': { min: 0.6, max: 0.65 },
    'Solana': { min: 125, max: 135 },
    'Shiba Inu': { min: 0.00002, max: 0.000022 },
    'Tron': { min: 0.12, max: 0.13 }
  },
  currency: {
    'EUR/USD': { min: 1.08, max: 1.09 },
    'EUR/JPY': { min: 162, max: 163 },
    'USD/BRL': { min: 4.95, max: 5.05 },
    'GBP/JPY': { min: 188, max: 189 },
    'EUR/GBP': { min: 0.85, max: 0.86 },
    'USD/JPY': { min: 150, max: 151 }
  }
};