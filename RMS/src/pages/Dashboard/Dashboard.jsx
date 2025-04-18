import React from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { DashboardCard } from './Dashboard-components'
import styles from './Dashboard.module.css'

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className={styles['dashboard-page']}>
        <div className={styles['dashboard-header']}>
          <h2>Dashboard Overview</h2>
          <div className={styles['date-filter']}>
            <select defaultValue="today">
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
        
        <div className={styles['dashboard-grid']}>
          <div className={`${styles['dashboard-card']} ${styles['sales-summary']}`}>
            <h3>Sales Summary</h3>
            <div className={styles['card-content']}>
              <p className={styles['sales-total']}>$3,450.75</p>
              <p className={styles['sales-compare']}>+12.5% from last period</p>
            </div>
          </div>
          
          <div className={`${styles['dashboard-card']} ${styles['orders-summary']}`}>
            <h3>Total Orders</h3>
            <div className={styles['card-content']}>
              <p className={styles['orders-total']}>156</p>
              <div className={styles['orders-breakdown']}>
                <span>Completed: 128</span>
                <span>In Progress: 28</span>
              </div>
            </div>
          </div>
          
          <div className={`${styles['dashboard-card']} ${styles['top-items']}`}>
            <h3>Top Menu Items</h3>
            <ul className={styles['top-items-list']}>
              <li>Margherita Pizza <span>32 orders</span></li>
              <li>Chicken Burger <span>27 orders</span></li>
              <li>Greek Salad <span>21 orders</span></li>
            </ul>
          </div>
          
          <div className={`${styles['dashboard-card']} ${styles['customer-stats']}`}>
            <h3>Customer Stats</h3>
            <div className={styles['card-content']}>
              <p>New Customers: 18</p>
              <p>Returning: 42</p>
              <p>Avg. Order: $22.15</p>
            </div>
          </div>
        </div>
        
        <div className={styles['recent-activity']}>
          <h3>Recent Activity</h3>
          <ul className={styles['activity-list']}>
            <li className={styles['activity-item']}>
              <span className={styles['activity-time']}>10:45 AM</span>
              <span className={styles['activity-desc']}>New order #1082 received</span>
            </li>
            <li className={styles['activity-item']}>
              <span className={styles['activity-time']}>10:30 AM</span>
              <span className={styles['activity-desc']}>Order #1081 completed</span>
            </li>
            <li className={styles['activity-item']}>
              <span className={styles['activity-time']}>10:15 AM</span>
              <span className={styles['activity-desc']}>New customer registered</span>
            </li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard 