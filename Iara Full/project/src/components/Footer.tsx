import React from 'react';
import { Mail, Shield, TrendingUp, DollarSign } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="glass-panel mx-4 mb-4 mt-2 px-6 py-8">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 text-sm text-gray-400">
              <Shield className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <p className="font-medium text-gray-300">Aviso de Risco</p>
                <p>O NeuroTrader é uma ferramenta de auxílio para traders e não garante resultados financeiros. 
                  Trading envolve alto risco e você pode perder dinheiro. Não nos responsabilizamos por perdas 
                  financeiras decorrentes do uso desta ferramenta.</p>
              </div>
            </div>

            {/* Affiliate Program Section */}
            <a 
              href="https://lotuz.info/affiliateprogram"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
            >
              <DollarSign className="w-8 h-8 text-green-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-lg font-bold text-green-400 mb-2 group-hover:text-green-300">
                  Programa de Afiliados
                </h3>
                <p className="text-sm text-gray-300 mb-2">
                  Ganhe até <span className="text-green-400 font-bold">R$ 7.000.000</span> por mês!
                </p>
                <p className="text-xs text-gray-400">
                  Afiliados iniciantes já estão ganhando R$ 12.000 mensais
                </p>
                <div className="mt-2 inline-flex items-center gap-1 text-blue-400 group-hover:text-blue-300">
                  <span className="text-sm">Saiba mais</span>
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
            </a>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-800/50">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Lótuz Infoproducer. Todos os direitos reservados.
            </p>
            <a 
              href="mailto:saclotuz@outlook.com"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
              saclotuz@outlook.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};