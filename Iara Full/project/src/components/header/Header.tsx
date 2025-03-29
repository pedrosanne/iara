import React from 'react';
import { Logo } from './Logo';
import { UserMenu } from './UserMenu';
import { Clock } from './Clock';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 py-2 bg-[hsl(var(--background))] border-b border-[hsl(var(--border))]">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Logo />
          <Clock />
        </div>
        <UserMenu />
      </div>
    </header>
  );
};