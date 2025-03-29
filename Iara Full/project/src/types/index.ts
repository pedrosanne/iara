export type AssetType = 'stocks' | 'crypto' | 'currency';
export type TimeFrame = 'S10' | 'S30' | 'M1' | 'M3' | 'M5';
export type ForecastType = 'BUY' | 'SELL';

export interface Asset {
  name: string;
  type: AssetType;
}

export interface Forecast {
  asset: Asset;
  type: ForecastType;
  timeFrame: TimeFrame;
  expiryTime: Date;
  profitPotential: string;
}