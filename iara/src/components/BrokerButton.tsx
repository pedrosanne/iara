import React from 'react';
import { TrendingUp, ExternalLink } from 'lucide-react';

export const BrokerButton = () => {
  return (
    <a
      href="https://avantbroker.com/pt/chart/?ref=cm8lvf5oq00riiydbi283xnib"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
    >
      <TrendingUp className="w-5 h-5" />
      <span className="relative z-10">Abrir Corretora</span>
      <ExternalLink className="w-4 h-4 opacity-75" />
      
      {/* Subtle shine effect */}
      <div className="absolute inset-0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </a>
  );
};