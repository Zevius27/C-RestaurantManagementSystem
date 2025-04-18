import React, { useEffect } from 'react'
import { useTheme } from '../app/theme'
import styles from './ThemeToggle.module.css'

const ThemeToggle = () => {
  const { theme, toggleTheme, applyTheme } = useTheme()
  
  // Apply theme when component mounts and when theme changes
  useEffect(() => {
    applyTheme()
  }, [theme, applyTheme])
  
  return (
    <button
      className={styles['theme-toggle']}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <span className={styles['toggle-icon']}>🌙</span>
      ) : (
        <span className={styles['toggle-icon']}>☀️</span>
      )}
    </button>
  )
}

export default ThemeToggle 