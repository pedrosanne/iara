import React, { useState, useEffect } from 'react';
import { UserCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

export const UserProfile = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProfile();
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('username, avatar_url')
      .eq('id', user.id)
      .single();
    
    if (data) {
      setUsername(data.username || '');
      setAvatarUrl(data.avatar_url || '');
    }
  };

  const updateProfile = async () => {
    if (!user) return;

    await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        username,
        updated_at: new Date().toISOString(),
      });

    setIsEditing(false);
  };

  return (
    <div className="relative group">
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={username || 'Profile'}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <UserCircle className="w-8 h-8" />
        )}
        <span className="text-sm">{username || user?.email}</span>
      </button>

      {isEditing && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl p-4 z-50">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nome de usuário"
            className="w-full px-3 py-2 bg-gray-700 rounded-lg mb-3"
          />
          <button
            onClick={updateProfile}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Salvar
          </button>
        </div>
      )}
    </div>
  );
};