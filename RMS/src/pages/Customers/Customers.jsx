import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { 
  sampleCustomers, 
  searchCustomers, 
  filterCustomersByStatus, 
  filterCustomersByMembership 
} from '../../utils/sampleData'
import styles from './Customers.module.css'

const Customers = () => {
  const [customers, setCustomers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [membershipFilter, setMembershipFilter] = useState('all')
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'ascending'
  })
  
  useEffect(() => {
    // Initialize with all customers
    setCustomers(sampleCustomers)
  }, [])
  
  useEffect(() => {
    // Apply filters and search
    applyFilters()
  }, [searchQuery, statusFilter, membershipFilter])
  
  const applyFilters = () => {
    let filteredCustomers = [...sampleCustomers]
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filteredCustomers = filterCustomersByStatus(statusFilter)
    }
    
    // Apply membership filter
    if (membershipFilter !== 'all') {
      filteredCustomers = filterCustomersByMembership(membershipFilter)
    }
    
    // Apply search
    if (searchQuery.trim() !== '') {
      filteredCustomers = searchCustomers(searchQuery)
    }
    
    // Apply sorting
    if (sortConfig.key) {
      filteredCustomers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    
    setCustomers(filteredCustomers)
  }
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }
  
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value)
  }
  
  const handleMembershipFilterChange = (e) => {
    setMembershipFilter(e.target.value)
  }
  
  const requestSort = (key) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }
  
  const getMembershipBadgeClass = (level) => {
    switch (level) {
      case 'gold':
        return styles['gold-badge']
      case 'silver':
        return styles['silver-badge']
      case 'bronze':
        return styles['bronze-badge']
      default:
        return ''
    }
  }

  return (
    <DashboardLayout>
      <div className={styles['customers-page']}>
        <div className={styles['customers-header']}>
          <h2>Customer Management</h2>
          <p className={styles['customers-subtitle']}>Manage your customer database and loyalty programs.</p>
        </div>
        
        <div className={styles['filters-container']}>
          <div className={styles['search-container']}>
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={handleSearchChange}
              className={styles['search-input']}
            />
          </div>
          
          <div className={styles['filters']}>
            <div className={styles['filter-group']}>
              <label htmlFor="status-filter">Status:</label>
              <select 
                id="status-filter" 
                value={statusFilter} 
                onChange={handleStatusFilterChange}
                className={styles['filter-select']}
              >
                <option value="all">All Customers</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <div className={styles['filter-group']}>
              <label htmlFor="membership-filter">Membership:</label>
              <select 
                id="membership-filter" 
                value={membershipFilter} 
                onChange={handleMembershipFilterChange}
                className={styles['filter-select']}
              >
                <option value="all">All Levels</option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
                <option value="bronze">Bronze</option>
              </select>
            </div>
            
            <button className={styles['add-customer-btn']}>
              + Add Customer
            </button>
          </div>
        </div>
        
        <div className={styles['customer-stats']}>
          <div className={styles['stat-card']}>
            <div className={styles['stat-icon']}>👤</div>
            <div className={styles['stat-content']}>
              <h3>Total Customers</h3>
              <p>{sampleCustomers.length}</p>
            </div>
          </div>
          
          <div className={styles['stat-card']}>
            <div className={styles['stat-icon']}>✓</div>
            <div className={styles['stat-content']}>
              <h3>Active Customers</h3>
              <p>{sampleCustomers.filter(c => c.status === 'active').length}</p>
            </div>
          </div>
          
          <div className={styles['stat-card']}>
            <div className={styles['stat-icon']}>⭐</div>
            <div className={styles['stat-content']}>
              <h3>Gold Members</h3>
              <p>{sampleCustomers.filter(c => c.membershipLevel === 'gold').length}</p>
            </div>
          </div>
          
          <div className={styles['stat-card']}>
            <div className={styles['stat-icon']}>💰</div>
            <div className={styles['stat-content']}>
              <h3>Total Revenue</h3>
              <p>${sampleCustomers.reduce((total, customer) => total + customer.totalSpent, 0).toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className={styles['customers-table-container']}>
          {customers.length > 0 ? (
            <table className={styles['customers-table']}>
              <thead>
                <tr>
                  <th onClick={() => requestSort('name')} className={styles['sortable']}>
                    Customer Name
                    {sortConfig.key === 'name' && (
                      <span className={styles['sort-indicator']}>
                        {sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}
                      </span>
                    )}
                  </th>
                  <th>Contact</th>
                  <th onClick={() => requestSort('joinDate')} className={styles['sortable']}>
                    Join Date
                    {sortConfig.key === 'joinDate' && (
                      <span className={styles['sort-indicator']}>
                        {sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}
                      </span>
                    )}
                  </th>
                  <th onClick={() => requestSort('totalOrders')} className={styles['sortable']}>
                    Orders
                    {sortConfig.key === 'totalOrders' && (
                      <span className={styles['sort-indicator']}>
                        {sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}
                      </span>
                    )}
                  </th>
                  <th onClick={() => requestSort('totalSpent')} className={styles['sortable']}>
                    Total Spent
                    {sortConfig.key === 'totalSpent' && (
                      <span className={styles['sort-indicator']}>
                        {sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}
                      </span>
                    )}
                  </th>
                  <th onClick={() => requestSort('lastOrder')} className={styles['sortable']}>
                    Last Order
                    {sortConfig.key === 'lastOrder' && (
                      <span className={styles['sort-indicator']}>
                        {sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}
                      </span>
                    )}
                  </th>
                  <th>Membership</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map(customer => (
                  <tr key={customer.id} className={styles['customer-row']}>
                    <td className={styles['customer-name']}>{customer.name}</td>
                    <td>
                      <div className={styles['contact-info']}>
                        <div className={styles['email']}>{customer.email}</div>
                        <div className={styles['phone']}>{customer.phone}</div>
                      </div>
                    </td>
                    <td>{formatDate(customer.joinDate)}</td>
                    <td>{customer.totalOrders}</td>
                    <td className={styles['amount']}>${customer.totalSpent.toFixed(2)}</td>
                    <td>{formatDate(customer.lastOrder)}</td>
                    <td>
                      <span className={`${styles['membership-badge']} ${getMembershipBadgeClass(customer.membershipLevel)}`}>
                        {customer.membershipLevel.charAt(0).toUpperCase() + customer.membershipLevel.slice(1)}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles['status-badge']} ${styles[`status-${customer.status}`]}`}>
                        {customer.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className={styles['customer-actions']}>
                        <button className={styles['view-btn']}>View</button>
                        <button className={styles['edit-btn']}>Edit</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={styles['no-customers']}>
              <p>No customers found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Customers 