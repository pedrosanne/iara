import React from 'react';
import { Sparkles } from 'lucide-react';

export const Logo = () => {
  return (
    <div className="flex items-center gap-1.5">
      <Sparkles className="w-5 h-5 text-blue-500" />
      <span className="text-base font-medium tracking-tight bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
        Iara
      </span>
    </div>
  );
};