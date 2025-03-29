import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ForecastDetails } from './forecastUtils';
import { TimeFrame } from '../types';

const TELEGRAM_BOT_TOKEN = '7652896023:AAGWxntCnkkh1u9LTjeqI_YN-VYmZwZWsgY';
const TELEGRAM_CHANNEL_ID = '-1002116386836';

const formatTimeFrame = (timeFrame: TimeFrame): string => {
  switch (timeFrame) {
    case 'S10': return '10 segundos';
    case 'S30': return '30 segundos';
    case 'M1': return '1 minuto';
    case 'M3': return '3 minutos';
    case 'M5': return '5 minutos';
    default: return timeFrame;
  }
};

const createForecastMessage = (
  forecast: ForecastDetails,
  asset: string,
  timeFrame: TimeFrame
): string => {
  const expiryTime = format(forecast.expiryTime, "HH:mm:ss", { locale: ptBR });
  const period = formatTimeFrame(timeFrame);

  const baseMessage = `⚠️⚠️⚠️ Scalping detectado...

- - - - - - - - - - - - - - - - - - - -
${forecast.type === 'BUY' ? '🟩 COMPRA' : '🟥 VENDA'}
💵 Ativo: ${asset}
⏰ Horário: ${expiryTime}
⌛️ Expiração: ${period}
- - - - - - - - - - - - - - - - - - - -

⚡⚡⚡⚡⚡ JAMAIS USE GALE!

⚡ Certifique-se de utilizar a corretora vinculada ao NeuroTrader IA.

• Toque abaixo para abrir:
📲 https://trade.avalonbroker.io/register?aff=410584&aff_model=revenue&afftrack=mm-telegram


⚠️⚡⚡⚡⚡⚡`;

  return baseMessage;
};

export const sendTelegramForecast = async (
  forecast: ForecastDetails,
  asset: string,
  timeFrame: TimeFrame
): Promise<boolean> => {
  const message = createForecastMessage(forecast, asset, timeFrame);
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHANNEL_ID,
        text: message,
        disable_web_page_preview: false
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Failed to send Telegram message:', data);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return false;
  }
};