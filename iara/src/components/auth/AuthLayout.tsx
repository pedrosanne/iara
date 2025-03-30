import React from 'react';
import { Logo } from '../Logo';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <Logo />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
        {subtitle && <p className="text-gray-400">{subtitle}</p>}
      </div>
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-700">
        {children}
      </div>
    </div>
  );
}