import { createChart, ColorType, IChartApi } from 'lightweight-charts';
import { useEffect, useRef, useState } from 'react';

interface ChartProps {
  data: any[];
  onPriceUpdate?: (price: number) => void;
}

export const Chart = ({ data, onPriceUpdate }: ChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const [hoveredPrice, setHoveredPrice] = useState<number | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#9CA3AF',
        fontSize: 12,
        fontFamily: 'Inter, system-ui, sans-serif',
      },
      grid: {
        vertLines: { color: '#1F2937' },
        horzLines: { color: '#1F2937' },
      },
      crosshair: {
        mode: 1,
        vertLine: {
          width: 1,
          color: '#3B82F6',
          style: 3,
        },
        horzLine: {
          width: 1,
          color: '#3B82F6',
          style: 3,
        },
      },
      rightPriceScale: {
        borderColor: '#1F2937',
        scaleMargins: {
          top: 0.1,
          bottom: 0.2,
        },
      },
      timeScale: {
        borderColor: '#1F2937',
        timeVisible: true,
        secondsVisible: false,
      },
      width: chartContainerRef.current.clientWidth,
      height: window.innerWidth < 640 ? 300 : 400,
    });

    chartRef.current = chart;

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#10B981',
      downColor: '#EF4444',
      borderVisible: false,
      wickUpColor: '#10B981',
      wickDownColor: '#EF4444',
    });

    candlestickSeries.setData(data);

    // Volume series with minimal height
    const volumeSeries = chart.addHistogramSeries({
      color: '#3B82F6',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
      scaleMargins: {
        top: 0.95, // Makes volume bars very small
        bottom: 0,
      },
    });

    const volumes = data.map(item => ({
      time: item.time,
      value: Math.random() * 100,
      color: item.close >= item.open ? '#10B98122' : '#EF444422' // Very transparent colors
    }));

    volumeSeries.setData(volumes);

    chart.subscribeCrosshairMove((param) => {
      if (param.point && param.seriesPrices) {
        const priceData = param.seriesPrices.get(candlestickSeries);
        if (priceData && typeof priceData.close === 'number') {
          setHoveredPrice(priceData.close);
          onPriceUpdate?.(priceData.close);
        }
      }
    });

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: window.innerWidth < 640 ? 300 : 400,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data]);

  return (
    <div className="relative">
      <div ref={chartContainerRef} className="w-full h-[300px] sm:h-[400px]" />
      {hoveredPrice && (
        <div className="absolute top-2 right-2 glass-panel px-3 py-1">
          <span className="text-sm font-mono">
            {hoveredPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>
      )}
    </div>
  );
};