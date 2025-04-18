import React from 'react'
import styles from './StatCard.module.css'

const StatCard = ({ title, value, icon, trend }) => {
  return (
    <div className={styles['stat-card']}>
      {icon && <div className={styles['stat-icon']}>{icon}</div>}
      
      <div className={styles['stat-content']}>
        <h3 className={styles['stat-title']}>{title}</h3>
        <p className={styles['stat-value']}>{value}</p>
        
        {trend && (
          <div className={`${styles['stat-trend']} ${styles[trend.type]}`}>
            <span className={styles['trend-value']}>{trend.value}</span>
            <span className={styles['trend-label']}>{trend.label}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default StatCard 