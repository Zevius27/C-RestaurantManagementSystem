import React from 'react'
import styles from './DashboardCard.module.css'

const DashboardCard = ({ title, children, className = '' }) => {
  return (
    <div className={`${styles['dashboard-card']} ${className}`}>
      <h3 className={styles['card-title']}>{title}</h3>
      <div className={styles['card-content']}>
        {children}
      </div>
    </div>
  )
}

export default DashboardCard 