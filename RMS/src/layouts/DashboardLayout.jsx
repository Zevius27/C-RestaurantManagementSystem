import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import styles from './DashboardLayout.module.css'
import { 
  FaHome, 
  FaChartBar, 
  FaShoppingCart, 
  FaUtensils, 
  FaUsers, 
  FaCog, 
  FaSearch, 
  FaBell, 
  FaAngleLeft, 
  FaAngleRight 
} from 'react-icons/fa'

const DashboardLayout = ({ children }) => {
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  const navItems = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/dashboard', label: 'Dashboard', icon: <FaChartBar /> },
    { path: '/orders', label: 'Orders', icon: <FaShoppingCart /> },
    { path: '/menu', label: 'Menu', icon: <FaUtensils /> },
    { path: '/customers', label: 'Customers', icon: <FaUsers /> },
    { path: '/settings', label: 'Settings', icon: <FaCog /> }
  ]

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className={styles['dashboard-layout']}>
      <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
        <div className={styles.logo}>
          <h2>
            <span className={styles['logo-initial']}>R</span>
            {!isCollapsed && <span className={styles['logo-text']}>MS</span>}
          </h2>
          <button 
            className={styles['collapse-btn']} 
            onClick={toggleSidebar}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <FaAngleRight /> : <FaAngleLeft />}
          </button>
        </div>
        
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={location.pathname === item.path ? styles.active : ''}
                  title={item.label}
                >
                  <span className={styles['nav-icon']}>{item.icon}</span>
                  {!isCollapsed && <span className={styles['nav-text']}>{item.label}</span>}
                  {location.pathname === item.path && (
                    <span className={styles['active-indicator']}></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className={styles['sidebar-footer']}>
          <ThemeToggle />
          {!isCollapsed && <p>© 2024 RMS</p>}
        </div>
      </aside>
      
      <main className={styles.content}>
        <header className={styles['content-header']}>
          <div className={styles['header-left']}>
            <h1>{navItems.find(item => item.path === location.pathname)?.label || 'Page'}</h1>
          </div>
          
          <div className={styles['header-right']}>
            <div className={styles['search-bar']}>
              <input type="text" placeholder="Search..." />
              <button type="button"><FaSearch /></button>
            </div>
            
            <div className={styles['user-menu']}>
              <div className={styles.notifications}>
                <button className={styles['notification-btn']}><FaBell /></button>
                <span className={styles['notification-badge']}>3</span>
              </div>
              
              <div className={styles['user-profile']}>
                <img 
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234a6fa5'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E" 
                  alt="User Profile"
                  className={styles['user-avatar']}
                />
                <span className={styles['user-name']}>Alex</span>
              </div>
            </div>
          </div>
        </header>
        
        <div className={styles['content-body']}>
          {children}
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout 