import React from 'react';
import { TimeFrame } from '../types';

interface TimeFrameSelectorProps {
  selected: TimeFrame;
  onChange: (timeFrame: TimeFrame) => void;
}

export const TimeFrameSelector = ({ selected, onChange }: TimeFrameSelectorProps) => {
  const timeFrames: { value: TimeFrame; label: string }[] = [
    { value: 'S10', label: '10s' },
    { value: 'S30', label: '30s' },
    { value: 'M1', label: '1m' },
    { value: 'M3', label: '3m' },
    { value: 'M5', label: '5m' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {timeFrames.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${selected === value
              ? 'bg-gradient-to-r from-blue-600 to-white text-blue-900 shadow-lg'
              : 'bg-white text-blue-600 hover:bg-blue-50 border border-blue-200'}
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
};