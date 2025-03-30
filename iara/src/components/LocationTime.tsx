import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MapPin } from 'lucide-react';

export const LocationTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState<string>('Carregando...');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&accept-language=pt-BR`
          );
          const data = await response.json();
          setLocation(`${data.address.city || data.address.town}, ${data.address.country}`);
        } catch (error) {
          setLocation('Localização indisponível');
        }
      });
    }

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-gray-300 text-sm flex items-center gap-2">
      <div className="flex items-center gap-1">
        <MapPin className="w-4 h-4 text-red-500" />
        <span>{location}</span>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
      </div>
      <div>
        {format(currentTime, "dd 'de' MMMM 'de' yyyy, HH:mm:ss", { locale: ptBR })}
      </div>
    </div>
  );
};