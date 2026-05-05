import { create } from 'zustand';
import { supabase } from '../services/supabase';
import { AuthState, User, UserRole } from '../types';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: 'guest',
  isLoading: false,
  isGuest: false,

  continueAsGuest: () => set({ user: null, role: 'guest', isGuest: true }),
  promptSignIn: () => set({ user: null, role: 'guest', isGuest: false }),

  signIn: async (email, password) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      const role: UserRole = profile?.role ?? 'customer';
      const user: User = {
        id: data.user.id,
        email: data.user.email || email,
        full_name: profile?.name ?? '',
        role,
      };
      set({ user, role, isGuest: false });
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (email, password, fullName) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;

      await supabase.from('users').insert({
        id: data.user!.id,
        name: fullName,
        email,
        role: 'customer',
      });

      const user: User = {
        id: data.user!.id,
        email,
        full_name: fullName,
        role: 'customer',
      };
      set({ user, role: 'customer', isGuest: false });
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, role: 'guest', isGuest: false });
  },
}));