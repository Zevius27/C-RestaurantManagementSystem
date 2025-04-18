import React from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import styles from './Menu.module.css'

const Menu = () => {
  return (
    <DashboardLayout>
      <div className={styles['menu-page']}>
        <h2>Menu Management</h2>
        <p>Manage your restaurant's menu items, categories, and pricing.</p>
        
        {/* Menu management functionality will be implemented here */}
      </div>
    </DashboardLayout>
  )
}

export default Menu 