import React from 'react';
import useSound from 'use-sound';
import { PlayCircle } from 'lucide-react';

interface ForecastButtonProps {
  onGenerate: () => void;
  isLoading: boolean;
  progress: number;
}

export const ForecastButton = ({ onGenerate, isLoading, progress }: ForecastButtonProps) => {
  const [play] = useSound('/click.mp3');

  const handleClick = () => {
    play();
    onGenerate();
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`
          relative overflow-hidden
          px-8 py-4 rounded-lg
          bg-gradient-to-r from-blue-900 to-black
          text-white font-bold text-lg
          transform transition-all duration-300
          hover:scale-105 hover:shadow-lg
          disabled:opacity-50 disabled:cursor-not-allowed
          border-2 border-blue-500
        `}
      >
        <div className="flex items-center gap-2">
          <PlayCircle className="w-6 h-6" />
          <span>GERAR SCALPING</span>
        </div>
        {isLoading && (
          <div
            className="absolute bottom-0 left-0 h-1 bg-blue-500"
            style={{ width: `${progress}%`, transition: 'width 0.3s ease-in-out' }}
          />
        )}
      </button>
    </div>
  );
};