import React from 'react'
import styles from './StatCard.module.css'

const StatCard = ({ title, value, icon, trend }) => {
  // Determine the background gradient based on title
  const getGradient = () => {
    switch(title) {
      case "Today's Orders":
        return `${styles['card-gradient']} ${styles['orders-gradient']}`;
      case "Revenue":
        return `${styles['card-gradient']} ${styles['revenue-gradient']}`;
      case "Active Tables":
        return `${styles['card-gradient']} ${styles['tables-gradient']}`;
      case "Avg. Order Value":
        return `${styles['card-gradient']} ${styles['avg-gradient']}`;
      default:
        return styles['card-gradient'];
    }
  };

  // Create a random ID for the animation
  const animationDelay = Math.random() * 0.5;
  
  return (
    <div 
      className={styles['stat-card']}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className={getGradient()}></div>
      
      {icon && <div className={styles['stat-icon']}>{icon}</div>}
      
      <div className={styles['stat-content']}>
        <h3 className={styles['stat-title']}>{title}</h3>
        <p className={styles['stat-value']}>{value}</p>
        
        {trend && (
          <div className={`${styles['stat-trend']} ${styles[trend.type]}`}>
            <span className={styles['trend-arrow']}>
              {trend.type === 'up' ? '↑' : trend.type === 'down' ? '↓' : '→'}
            </span>
            <span className={styles['trend-value']}>{trend.value}</span>
            <span className={styles['trend-label']}>{trend.label}</span>
          </div>
        )}
      </div>
      
      <div className={styles['stat-shine']}></div>
    </div>
  )
}

export default StatCard 