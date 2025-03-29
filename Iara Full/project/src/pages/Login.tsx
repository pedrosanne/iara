import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/auth/AuthLayout';
import { PasswordInput } from '../components/auth/PasswordInput';
import { supabase } from '../lib/supabase';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate('/');
    } catch (err: any) {
      setError('Email ou senha inválidos');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11c0 5.5-4.5 10-10 10S1 16.5 1 11 5.5 1 11 1s10 4.5 10 10z"/>
                  <path d="M11 1v20"/>
                  <path d="M1 11h20"/>
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-2xl font-bold">NeuroTrader</span>
                <span className="text-sm text-gray-500">AI Trading Assistant</span>
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Bem-vindo de volta!</h1>
          <p className="text-gray-500">Entre com sua conta para continuar</p>
        </div>

        <div className="bg-[hsl(var(--card))] rounded-2xl shadow-xl p-8 border border-[hsl(var(--border))]">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Seu e-mail"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Senha</label>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={error}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>

            <div className="text-center space-y-4">
              <a href="/forgot-password" className="text-sm text-blue-500 hover:text-blue-400">
                Esqueceu sua senha?
              </a>
              <div className="text-sm">
                Não tem uma conta?{' '}
                <a href="/register" className="text-blue-500 hover:text-blue-400 font-medium">
                  Cadastre-se
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};