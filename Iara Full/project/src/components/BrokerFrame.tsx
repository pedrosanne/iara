import React, { useState, useEffect } from 'react';

export const BrokerFrame = () => {
  const [iframeHeight, setIframeHeight] = useState('600px');

  useEffect(() => {
    const updateIframeHeight = () => {
      // For mobile devices, make the iframe taller
      if (window.innerWidth < 768) {
        setIframeHeight('800px');
      } else {
        // For tablets and desktops, use a more moderate height
        setIframeHeight('600px');
      }
    };

    // Initial setup
    updateIframeHeight();

    // Update on resize
    window.addEventListener('resize', updateIframeHeight);
    return () => window.removeEventListener('resize', updateIframeHeight);
  }, []);

  return (
    <div className="glass-panel p-4">
      <h2 className="text-xs font-medium mb-3">Abra sua conta na Corretora</h2>
      <div className="w-full overflow-hidden rounded-lg border border-[hsl(var(--border))]" style={{ height: iframeHeight }}>
        <iframe
          src="https://avantbroker.com/pt/signUp?ref=cm8lvf5oq00riiydbi283xnib"
          className="w-full h-full"
          style={{ border: 'none' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};