import { create } from 'zustand'

// Sample global store with authentication and notifications
export const useStore = create((set) => ({
  // Auth state
  user: null,
  isAuthenticated: false,
  
  // Login and logout actions
  login: (userData) => set({ user: userData, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  
  // Notifications state
  notifications: [],
  
  // Notification actions
  addNotification: (notification) => 
    set((state) => ({ 
      notifications: [...state.notifications, { id: Date.now(), ...notification }] 
    })),
    
  removeNotification: (id) => 
    set((state) => ({ 
      notifications: state.notifications.filter(item => item.id !== id) 
    })),
    
  clearNotifications: () => set({ notifications: [] }),
})) 