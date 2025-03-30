import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const PasswordInput = ({ value, onChange, error }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        className={`
          w-full px-4 py-2 bg-gray-700 border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500
          text-white placeholder-gray-400
          ${error ? 'border-red-500' : 'border-gray-600'}
        `}
        placeholder="Sua senha"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};