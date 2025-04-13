import React, { useState, useEffect } from 'react';

export const BrokerFrame = () => {
  const [iframeHeight, setIframeHeight] = useState('100vh');
  const [activeFrame, setActiveFrame] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const updateLayout = () => {
      setIsMobile(window.innerWidth < 768);
      setIframeHeight(window.innerWidth < 768 ? '100vh' : '100vh');
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  const toggleFrame = () => {
    setActiveFrame(activeFrame === 0 ? 1 : 0);
    new Audio('/switch-sound.mp3').play(); // Toca o som ao clicar
  };

  return (
    <div className="glass-panel p-4 text-center flex flex-col items-center w-full h-screen">
      <h2 className="text-sm font-semibold mb-4">Escolha sua opção</h2>
      <div className="relative flex flex-col items-center mb-6">
        <p className="text-xs text-gray-300 mb-2">Clique na chave para alternar entre Cadastro e Trading</p>
        <div className="flex items-center gap-3">
          <span className={`text-sm font-bold ${activeFrame === 0 ? 'text-blue-500' : 'text-gray-400'}`}>Cadastro</span>
          <div 
            className={`w-20 h-10 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 shadow-lg ${activeFrame === 1 ? 'bg-blue-500' : 'bg-gray-300'}`}
            onClick={toggleFrame}
          >
            <div 
              className={`w-8 h-8 bg-white rounded-full shadow-md transform transition-all duration-300 ${activeFrame === 1 ? 'translate-x-10' : 'translate-x-0'}`}
            ></div>
          </div>
          <span className={`text-sm font-bold ${activeFrame === 1 ? 'text-blue-500' : 'text-gray-400'}`}>Trading</span>
        </div>
      </div>
      <div className="relative w-full h-full border border-gray-300 rounded-lg overflow-hidden">
        <div 
          className={`flex transition-transform duration-500 w-full h-full ${isMobile ? "flex-col" : "flex-row"}`} 
          style={isMobile ? { transform: `translateY(-${activeFrame * 100}%)` } : { transform: `translateX(-${activeFrame * 100}%)` }}
        >
          <iframe
            src="https://avantbroker.com/pt/signIn/?ref=cm8lvf5oq00riiydbi283xnib"
            className="w-full h-full flex-shrink-0"
            style={{ border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <iframe
            src="https://avantbroker.com/pt/chart"
            className="w-full h-full flex-shrink-0"
            style={{ border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};
