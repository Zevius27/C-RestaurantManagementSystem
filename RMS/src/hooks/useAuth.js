import { useStore } from '../app/store'

// Custom hook for authentication
export const useAuth = () => {
  const { 
    user, 
    isAuthenticated, 
    login, 
    logout 
  } = useStore(state => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    login: state.login,
    logout: state.logout
  }))

  // Sample login function that would integrate with an API
  const handleLogin = async (email, password) => {
    try {
      // Mock API call - replace with actual API
      // const response = await api.login(email, password)
      
      // Mock successful login
      const userData = {
        id: 1,
        name: 'Demo User',
        email,
        role: 'admin'
      }
      
      login(userData)
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Login failed' 
      }
    }
  }

  // Handle logout
  const handleLogout = () => {
    logout()
  }

  return {
    user,
    isAuthenticated,
    login: handleLogin,
    logout: handleLogout
  }
} 