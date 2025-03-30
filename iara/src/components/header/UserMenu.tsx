import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-800/50 transition-colors"
      >
        <User className="w-5 h-5 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 glass-panel py-1 z-50">
          <div className="px-4 py-2 border-b border-gray-800/50">
            <p className="text-sm font-medium text-gray-200">{user?.email}</p>
          </div>
          
          <button
            onClick={toggleTheme}
            className="w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800/50 flex items-center gap-2"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4" />
                Modo Claro
              </>
            ) : (
              <>
                <Moon className="w-4 h-4" />
                Modo Escuro
              </>
            )}
          </button>

          <button
            onClick={() => {
              setIsOpen(false);
              // Add profile settings navigation here
            }}
            className="w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800/50 flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Configurações
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-800/50 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      )}
    </div>
  );
};