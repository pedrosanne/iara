import React, { useState, useEffect, useRef } from 'react';
import { AssetSelector } from './components/AssetSelector';
import { TimeFrameSelector } from './components/TimeFrameSelector';
import { ForecastButton } from './components/ForecastButton';
import { Chart } from './components/Chart';
import { ForecastDisplay } from './components/ForecastDisplay';
import { NewsSection } from './components/NewsSection';
import { RankingSection } from './components/RankingSection';
import { RewardsSection } from './components/RewardsSection';
import { BrokerFrame } from './components/BrokerFrame';
import { AssetType, TimeFrame } from './types';
import { generateChartData } from './utils/chartUtils';
import { generateForecastDetails, type ForecastDetails } from './utils/forecastUtils';
import { MarketHeader } from './components/MarketHeader';
import useSound from 'use-sound';

export function App() {
  const [assetType, setAssetType] = useState<AssetType>('stocks');
  const [selectedAsset, setSelectedAsset] = useState('Apple');
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('M1');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [forecast, setForecast] = useState<ForecastDetails | null>(null);
  const [chartData, setChartData] = useState(() => generateChartData('stocks', 'Apple', 'M1'));
  const [currentPrice, setCurrentPrice] = useState(0);
  const [showForecast, setShowForecast] = useState(false);
  const [playSuccess] = useSound('/click.mp3');
  const forecastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newData = generateChartData(assetType, selectedAsset, timeFrame);
    setChartData(newData);
    setCurrentPrice(newData[newData.length - 1].close);
  }, [assetType, selectedAsset, timeFrame]);

  useEffect(() => {
    if (forecast) {
      setShowForecast(true);
      playSuccess();
      // Scroll to forecast
      if (forecastRef.current) {
        forecastRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      const timer = setTimeout(() => {
        setShowForecast(false);
        setForecast(null);
      }, forecast.expiryTime.getTime() - Date.now());
      return () => clearTimeout(timer);
    }
  }, [forecast]);

  const generateForecast = () => {
    setIsLoading(true);
    setProgress(0);

    const duration = 3000;
    const interval = 30;
    let currentProgress = 0;

    const timer = setInterval(() => {
      currentProgress += (interval / duration) * 100;
      setProgress(Math.min(currentProgress, 100));

      if (currentProgress >= 100) {
        clearInterval(timer);
        setForecast(generateForecastDetails(assetType, selectedAsset, timeFrame, currentPrice));
        setIsLoading(false);
      }
    }, interval);
  };

  return (
    <div className="flex flex-col gap-4 text-sm">
      <MarketHeader />

      {/* Chart and Forecast Section */}
      <div className="glass-panel p-4">
        <Chart
          data={chartData}
          onPriceUpdate={setCurrentPrice}
        />
        
        <div className="mt-4 flex flex-col items-center gap-4">
          <TimeFrameSelector
            selected={timeFrame}
            onChange={setTimeFrame}
          />
          
          <ForecastButton
            onGenerate={generateForecast}
            isLoading={isLoading}
            progress={progress}
          />

          <div ref={forecastRef}>
            {showForecast && forecast && (
              <ForecastDisplay
                forecast={forecast}
                currentPrice={currentPrice}
                asset={selectedAsset}
                timeFrame={timeFrame}
                assetType={assetType}
                onClose={() => {
                  setShowForecast(false);
                  setForecast(null);
                }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="glass-panel p-4">
            <h2 className="text-xs font-medium mb-3">Selecione o Ativo</h2>
            <AssetSelector
              selectedType={assetType}
              selectedAsset={selectedAsset}
              onTypeChange={setAssetType}
              onAssetChange={setSelectedAsset}
            />
          </div>
        </div>

        {/* Broker Frame */}
        <BrokerFrame />

        {/* Ranking Section */}
        <div className="glass-panel p-4">
          <h2 className="text-xs font-medium mb-3">Ranking Trader</h2>
          <RankingSection />
        </div>
      </div>

      {/* News Section */}
      <div className="glass-panel p-4">
        <h2 className="text-xs font-medium mb-3">Últimas Notícias</h2>
        <NewsSection asset={selectedAsset} />
      </div>

      {/* Rewards Section */}
      <RewardsSection />
    </div>
  );
}