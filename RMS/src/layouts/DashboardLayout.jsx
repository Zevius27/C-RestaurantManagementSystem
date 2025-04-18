import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import styles from './DashboardLayout.module.css'

const DashboardLayout = ({ children }) => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/orders', label: 'Orders' },
    { path: '/menu', label: 'Menu' },
    { path: '/customers', label: 'Customers' },
    { path: '/settings', label: 'Settings' }
  ]

  return (
    <div className={styles['dashboard-layout']}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <h2>RMS</h2>
        </div>
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={location.pathname === item.path ? styles.active : ''}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles['sidebar-footer']}>
          <ThemeToggle />
          <p>© 2024 RMS</p>
        </div>
      </aside>
      <main className={styles.content}>
        <header className={styles['content-header']}>
          <h1>{navItems.find(item => item.path === location.pathname)?.label || 'Page'}</h1>
        </header>
        <div className={styles['content-body']}>
          {children}
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout 