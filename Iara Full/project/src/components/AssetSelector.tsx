import React, { useState, useEffect } from 'react';
import { assets } from '../data/assets';
import { AssetType } from '../types';
import { 
  Briefcase, Bitcoin, DollarSign, Apple, Building2,
  LineChart, CandlestickChart, TrendingUp, Gauge,
  Activity, AlertCircle, Volume2, Timer, Sparkles,
  Zap, Brain, Cpu, Network, Lock
} from 'lucide-react';
import { AnalysisModal } from './AnalysisModal';

interface AssetSelectorProps {
  selectedType: AssetType;
  selectedAsset: string;
  onTypeChange: (type: AssetType) => void;
  onAssetChange: (asset: string) => void;
}

const getAssetIcon = (asset: string) => {
  switch (asset) {
    case 'Apple': return <Apple className="w-3 h-3" />;
    case 'Bitcoin': return <Bitcoin className="w-3 h-3" />;
    case 'EUR/USD': return <DollarSign className="w-3 h-3" />;
    default: return <CandlestickChart className="w-3 h-3" />;
  }
};

export const AssetSelector = ({
  selectedType,
  selectedAsset,
  onTypeChange,
  onAssetChange,
}: AssetSelectorProps) => {
  const [buyPressure, setBuyPressure] = useState(50);
  const [volatility, setVolatility] = useState(0);
  const [volume, setVolume] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisType, setAnalysisType] = useState<'technical' | 'ai' | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    type: 'technical' | 'ai';
    confidence: number;
    signals: string[];
    recommendation: string;
    details: string[];
  } | null>(null);

  useEffect(() => {
    const updateMetrics = () => {
      setBuyPressure(Math.random() * 100);
      setVolatility(Math.random() * 100);
      setVolume(Math.floor(Math.random() * 1000000));
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 2000);
    return () => clearInterval(interval);
  }, [selectedAsset]);

  const handleAnalysis = (type: 'technical' | 'ai') => {
    setIsAnalyzing(true);
    setAnalysisType(type);
    
    const steps = type === 'technical' ? [
      'Analisando padrões gráficos...',
      'Calculando indicadores técnicos...',
      'Identificando suportes e resistências...',
      'Verificando volume e momentum...',
      'Gerando relatório final...'
    ] : [
      'Inicializando redes neurais...',
      'Processando big data do mercado...',
      'Aplicando algoritmos preditivos...',
      'Analisando sentimento do mercado...',
      'Finalizando previsões...'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        console.log(steps[currentStep]);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsAnalyzing(false);
        setAnalysisType(null);
        
        // Generate analysis result
        const result = type === 'technical' ? {
          type: 'technical' as const,
          confidence: 78,
          signals: [
            'Cruzamento de Médias Móveis (9/21)',
            'RSI em zona de sobrecompra',
            'Suporte forte em 157.32',
            'Volume acima da média'
          ],
          recommendation: 'COMPRA',
          details: [
            'Tendência de alta confirmada',
            'Momentum positivo crescente',
            'Baixa volatilidade implícita',
            'Padrão de continuação identificado'
          ]
        } : {
          type: 'ai' as const,
          confidence: 92,
          signals: [
            'Padrão fractal detectado',
            'Correlação com índices globais',
            'Análise de sentimento positiva',
            'Fluxo institucional favorável'
          ],
          recommendation: 'COMPRA FORTE',
          details: [
            'Alta probabilidade de movimento direcional',
            'Baixo risco relativo',
            'Condições de mercado ideais',
            'Múltiplos fatores alinhados'
          ]
        };

        setAnalysisResult(result);
        setShowModal(true);
      }
    }, 800);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {([
          { type: 'stocks' as AssetType, icon: <Briefcase />, label: 'Ações' },
          { type: 'crypto' as AssetType, icon: <Bitcoin />, label: 'Criptomoedas' },
          { type: 'currency' as AssetType, icon: <DollarSign />, label: 'Pares de Moedas' }
        ]).map(({ type, icon, label }) => (
          <button
            key={type}
            onClick={() => onTypeChange(type)}
            className={`
              flex items-center gap-1.5 px-2 py-1.5 rounded text-xs font-medium
              transition-all duration-200 flex-1 justify-center
              ${selectedType === type
                ? 'bg-blue-600 text-white border border-blue-500'
                : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'}
            `}
          >
            {icon}
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
        {assets[selectedType].map((asset) => (
          <button
            key={asset}
            onClick={() => onAssetChange(asset)}
            className={`
              flex items-center gap-1.5 px-2 py-1.5 rounded text-xs
              transition-all duration-200
              ${selectedAsset === asset
                ? 'bg-blue-600 text-white border border-blue-500'
                : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'}
            `}
          >
            {getAssetIcon(asset)}
            <span className="truncate">{asset}</span>
          </button>
        ))}
      </div>

      {selectedAsset && (
        <div className="bg-white p-3 rounded border border-gray-200 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-blue-500" />
              Análise em Tempo Real
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Activity className="w-3 h-3" />
              Atualizado agora
            </div>
          </div>

          {/* Pressure Gauge */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium">Pressão de Compra/Venda</span>
              <span className="font-mono">{buyPressure.toFixed(1)}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden relative bg-gradient-to-r from-red-500 via-yellow-500 to-green-500">
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-white border border-gray-800 rounded-full transition-all duration-300 transform -translate-x-1/2"
                style={{ left: `${buyPressure}%` }}
              />
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-0.5">
                <AlertCircle className="w-3 h-3" />
                Volatilidade
              </div>
              <div className="text-sm font-bold">
                {volatility.toFixed(1)}%
              </div>
            </div>
            <div className="p-2 rounded bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-0.5">
                <Volume2 className="w-3 h-3" />
                Volume 24h
              </div>
              <div className="text-sm font-bold">
                {volume.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Analysis Actions */}
          <div className="flex gap-1.5 pt-1.5">
            <button 
              onClick={() => handleAnalysis('technical')}
              disabled={isAnalyzing}
              className="flex-1 px-2 py-1.5 bg-blue-50 text-blue-600 rounded text-xs font-medium hover:bg-blue-100 transition-colors relative overflow-hidden"
            >
              {isAnalyzing && analysisType === 'technical' ? (
                <div className="flex items-center justify-center gap-1.5">
                  <Cpu className="w-3 h-3 animate-spin" />
                  Analisando...
                </div>
              ) : (
                <span className="flex items-center justify-center gap-1.5">
                  <LineChart className="w-3 h-3" />
                  Análise Técnica
                </span>
              )}
            </button>
            <button 
              onClick={() => handleAnalysis('ai')}
              disabled={isAnalyzing}
              className="flex-1 px-2 py-1.5 bg-purple-50 text-purple-600 rounded text-xs font-medium hover:bg-purple-100 transition-colors relative overflow-hidden"
            >
              {isAnalyzing && analysisType === 'ai' ? (
                <div className="flex items-center justify-center gap-1.5">
                  <Brain className="w-3 h-3 animate-spin" />
                  Processando...
                </div>
              ) : (
                <span className="flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  Análise IA
                </span>
              )}
            </button>
          </div>

          {/* Analysis Indicators */}
          {isAnalyzing && (
            <div className="flex items-center gap-2 text-xs text-gray-500 animate-pulse">
              <div className="flex gap-1">
                {analysisType === 'technical' ? (
                  <>
                    <Network className="w-3 h-3" />
                    <Lock className="w-3 h-3" />
                    <Cpu className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    <Brain className="w-3 h-3" />
                    <Zap className="w-3 h-3" />
                    <Sparkles className="w-3 h-3" />
                  </>
                )}
              </div>
              <span>Processando dados em tempo real...</span>
            </div>
          )}
        </div>
      )}

      {/* Analysis Result Modal */}
      <AnalysisModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        result={analysisResult}
        asset={selectedAsset}
      />
    </div>
  );
};