import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Theme store with persistence
export const useThemeStore = create(
  persist(
    (set) => ({
      // Theme state
      theme: 'light', // 'light' or 'dark'
      
      // Theme actions
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),
    }),
    {
      name: 'theme-storage', // Local storage key
    }
  )
)

// Hook to apply theme to document
export const useTheme = () => {
  const { theme, toggleTheme } = useThemeStore()
  
  // Apply theme to document body
  const applyTheme = () => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-theme')
    } else {
      document.documentElement.classList.remove('dark-theme')
    }
  }
  
  return { theme, toggleTheme, applyTheme }
} 