import React from 'react';
import { Send } from 'lucide-react';
import { ForecastDetails } from '../utils/forecastUtils';
import { TimeFrame } from '../types';
import { sendTelegramForecast } from '../utils/telegramUtils';

interface ShareButtonProps {
  forecast: ForecastDetails;
  asset: string;
  timeFrame: TimeFrame;
}

export const ShareButton = ({ forecast, asset, timeFrame }: ShareButtonProps) => {
  const [isSharing, setIsSharing] = React.useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const success = await sendTelegramForecast(forecast, asset, timeFrame);
      if (success) {
        alert('Previsão compartilhada com sucesso!');
      } else {
        alert('Erro ao compartilhar previsão. Tente novamente.');
      }
    } catch (error) {
      console.error('Error sharing forecast:', error);
      alert('Erro ao compartilhar previsão. Tente novamente.');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={isSharing}
      className={`
        flex items-center gap-2 px-4 py-2
        bg-blue-600 hover:bg-blue-700
        text-white font-semibold rounded-lg
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      <Send className="w-5 h-5" />
      {isSharing ? 'Compartilhando...' : 'Compartilhar no Telegram'}
    </button>
  );
};