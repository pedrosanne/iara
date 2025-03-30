import React from 'react';
import { X, Brain, LineChart, CheckCircle, AlertTriangle, TrendingUp, BarChart as ChartBar } from 'lucide-react';

interface AnalysisResult {
  type: 'technical' | 'ai';
  confidence: number;
  signals: string[];
  recommendation: string;
  details: string[];
}

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: AnalysisResult | null;
  asset: string;
}

export const AnalysisModal = ({ isOpen, onClose, result, asset }: AnalysisModalProps) => {
  if (!isOpen || !result) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            {result.type === 'technical' ? (
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <LineChart className="w-6 h-6 text-blue-600" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-bold">
                {result.type === 'technical' ? 'Análise Técnica' : 'Análise IA'}
              </h3>
              <p className="text-sm text-gray-500">{asset}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Recommendation */}
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-green-600">Recomendação</p>
                <p className="text-xl font-bold text-green-700">{result.recommendation}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-green-600">Confiança</p>
              <p className="text-2xl font-bold text-green-700">{result.confidence}%</p>
            </div>
          </div>

          {/* Signals */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              Sinais Detectados
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {result.signals.map((signal, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <TrendingUp className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="text-sm">{signal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <ChartBar className="w-4 h-4 text-blue-500" />
              Detalhes da Análise
            </h4>
            <div className="space-y-2">
              {result.details.map((detail, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="text-sm">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};