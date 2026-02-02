import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

interface UserState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  updatePoints: (points: number) => void;
  updateStreak: (streak: number) => void;
  updateLevel: (level: number) => void;
  reset: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      setUser: (user) => set({ user, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),
      updatePoints: (points) =>
        set((state) => ({
          user: state.user ? { ...state.user, totalPoints: points } : null,
        })),
      updateStreak: (streak) =>
        set((state) => ({
          user: state.user ? { ...state.user, currentStreak: streak } : null,
        })),
      updateLevel: (level) =>
        set((state) => ({
          user: state.user ? { ...state.user, level } : null,
        })),
      reset: () => set({ user: null, isLoading: false }),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);
