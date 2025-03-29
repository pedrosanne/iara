import React, { useState, useEffect } from 'react';
import { Newspaper, ExternalLink, TrendingUp, TrendingDown } from 'lucide-react';

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  impact?: 'high' | 'medium' | 'low';
}

interface NewsSectionProps {
  asset: string;
}

export const NewsSection = ({ asset }: NewsSectionProps) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        // Simulated news data with sentiment analysis
        const simulatedNews = [
          {
            title: `${asset} mostra forte tendência de alta após anúncio de novos investimentos`,
            link: 'https://example.com/news/1',
            pubDate: new Date().toISOString(),
            source: 'Financial Times',
            sentiment: 'positive',
            impact: 'high'
          },
          {
            title: `Análise técnica: ${asset} forma padrão bullish no gráfico diário`,
            link: 'https://example.com/news/2',
            pubDate: new Date().toISOString(),
            source: 'Bloomberg',
            sentiment: 'positive',
            impact: 'medium'
          },
          {
            title: `Mercado reage positivamente aos resultados trimestrais de ${asset}`,
            link: 'https://example.com/news/3',
            pubDate: new Date().toISOString(),
            source: 'Reuters',
            sentiment: 'positive',
            impact: 'high'
          },
          {
            title: `Analistas recomendam cautela com ${asset} após volatilidade recente`,
            link: 'https://example.com/news/4',
            pubDate: new Date().toISOString(),
            source: 'MarketWatch',
            sentiment: 'neutral',
            impact: 'medium'
          },
          {
            title: `${asset} pode enfrentar resistência nos níveis atuais, dizem especialistas`,
            link: 'https://example.com/news/5',
            pubDate: new Date().toISOString(),
            source: 'Trading View',
            sentiment: 'negative',
            impact: 'low'
          }
        ] as NewsItem[];
        setNews(simulatedNews);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [asset]);

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-500';
      case 'negative': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getImpactBadge = (impact?: string) => {
    switch (impact) {
      case 'high':
        return <span className="px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-600">Alto Impacto</span>;
      case 'medium':
        return <span className="px-2 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-600">Médio Impacto</span>;
      case 'low':
        return <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-600">Baixo Impacto</span>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {news.map((item, index) => (
        <a
          key={index}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 rounded-lg bg-white hover:bg-gray-50 transition-colors border border-gray-200"
        >
          <div className="flex items-start gap-3">
            <div className={`mt-1 ${getSentimentColor(item.sentiment)}`}>
              {item.sentiment === 'positive' ? (
                <TrendingUp className="w-5 h-5" />
              ) : item.sentiment === 'negative' ? (
                <TrendingDown className="w-5 h-5" />
              ) : (
                <Newspaper className="w-5 h-5" />
              )}
            </div>
            <div className="flex-grow">
              <h3 className="text-sm font-medium text-gray-900 mb-1">{item.title}</h3>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">{item.source}</span>
                  {getImpactBadge(item.impact)}
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};