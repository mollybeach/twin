import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeStoreType } from '../types/types';

export const useThemeStore = create<ThemeStoreType>()(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'dark' ? 'light' : 'dark' 
      })),
    }),
    {
      name: 'theme-storage',
    }
  )
);