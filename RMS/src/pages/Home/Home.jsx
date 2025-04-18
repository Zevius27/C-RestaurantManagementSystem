import React from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import Button from '../../components/Button'
import { StatCard } from './Home-components'
import styles from './Home.module.css'

const Home = () => {
  return (
    <DashboardLayout>
      <div className={styles['home-page']}>
        <div className={styles['welcome-section']}>
          <h2>Welcome to Restaurant Management System</h2>
          <p>Manage your restaurant operations efficiently with our comprehensive tools.</p>
          
          <div className={styles['action-buttons']}>
            <Button variant="primary">View Dashboard</Button>
            <Button variant="secondary">Manage Orders</Button>
          </div>
        </div>
        
        <div className={styles['quick-stats']}>
          <StatCard 
            title="Today's Orders" 
            value="24" 
            trend={{ type: 'up', value: '+5', label: 'from yesterday' }}
          />
          
          <StatCard 
            title="Revenue" 
            value="$1,250" 
            trend={{ type: 'up', value: '+12%', label: 'from last week' }}
          />
          
          <StatCard 
            title="Active Tables" 
            value="8/12" 
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home 