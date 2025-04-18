import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { sampleOrders } from '../../utils/sampleData'
import styles from './Orders.module.css'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [customDateRange, setCustomDateRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  })
  
  useEffect(() => {
    // In a real app, this would be an API call
    setOrders(sampleOrders)
    setFilteredOrders(sampleOrders)
  }, [])
  
  useEffect(() => {
    applyFilters()
  }, [selectedStatus, dateFilter, searchQuery, customDateRange])
  
  const applyFilters = () => {
    let filtered = [...orders]
    
    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(order => order.status === selectedStatus)
    }
    
    // Filter by date
    filtered = filterByDate(filtered, dateFilter)
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(query) || 
        order.customer.toLowerCase().includes(query)
      )
    }
    
    setFilteredOrders(filtered)
  }
  
  const filterByDate = (orders, filter) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    const lastWeekStart = new Date(today)
    lastWeekStart.setDate(lastWeekStart.getDate() - 7)
    
    const lastMonthStart = new Date(today)
    lastMonthStart.setMonth(lastMonthStart.getMonth() - 1)
    
    switch (filter) {
      case 'today':
        return orders.filter(order => {
          const orderDate = new Date(order.date)
          return orderDate >= today
        })
      case 'yesterday':
        return orders.filter(order => {
          const orderDate = new Date(order.date)
          return orderDate >= yesterday && orderDate < today
        })
      case 'last7days':
        return orders.filter(order => {
          const orderDate = new Date(order.date)
          return orderDate >= lastWeekStart
        })
      case 'last30days':
        return orders.filter(order => {
          const orderDate = new Date(order.date)
          return orderDate >= lastMonthStart
        })
      case 'custom':
        return orders.filter(order => {
          const orderDate = new Date(order.date)
          const startDate = new Date(customDateRange.start)
          const endDate = new Date(customDateRange.end)
          endDate.setHours(23, 59, 59)
          return orderDate >= startDate && orderDate <= endDate
        })
      default:
        return orders
    }
  }

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value)
  }
  
  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value)
  }
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }
  
  const handleCustomDateChange = (type, value) => {
    setCustomDateRange(prev => ({
      ...prev,
      [type]: value
    }))
  }
  
  const getTotalAmount = () => {
    return filteredOrders.reduce((total, order) => total + order.totalAmount, 0).toFixed(2)
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
  }
  
  return (
    <DashboardLayout>
      <div className={styles['orders-page']}>
        <div className={styles['orders-header']}>
          <h2>Order Management</h2>
          <p className={styles['orders-subtitle']}>Track and manage customer orders efficiently.</p>
        </div>
        
        <div className={styles['filters-container']}>
          <div className={styles['search-container']}>
            <input
              type="text"
              placeholder="Search by order ID or customer name..."
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
                value={selectedStatus} 
                onChange={handleStatusChange}
                className={styles['filter-select']}
              >
                <option value="all">All Orders</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
              </select>
            </div>
            
            <div className={styles['filter-group']}>
              <label htmlFor="date-filter">Date Range:</label>
              <select 
                id="date-filter" 
                value={dateFilter} 
                onChange={handleDateFilterChange}
                className={styles['filter-select']}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="last7days">Last 7 Days</option>
                <option value="last30days">Last 30 Days</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            
            {dateFilter === 'custom' && (
              <div className={styles['custom-date-container']}>
                <div className={styles['custom-date-inputs']}>
                  <input 
                    type="date" 
                    value={customDateRange.start}
                    onChange={(e) => handleCustomDateChange('start', e.target.value)}
                    className={styles['date-input']}
                  />
                  <span>to</span>
                  <input 
                    type="date" 
                    value={customDateRange.end}
                    onChange={(e) => handleCustomDateChange('end', e.target.value)}
                    className={styles['date-input']}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className={styles['orders-summary']}>
          <div className={styles['summary-card']}>
            <div className={styles['summary-icon']}>📋</div>
            <div className={styles['summary-content']}>
              <h3>Total Orders</h3>
              <p>{filteredOrders.length}</p>
            </div>
          </div>
          
          <div className={styles['summary-card']}>
            <div className={styles['summary-icon']}>✓</div>
            <div className={styles['summary-content']}>
              <h3>Completed</h3>
              <p>{filteredOrders.filter(order => order.status === 'completed').length}</p>
            </div>
          </div>
          
          <div className={styles['summary-card']}>
            <div className={styles['summary-icon']}>⏱️</div>
            <div className={styles['summary-content']}>
              <h3>In Progress</h3>
              <p>{filteredOrders.filter(order => order.status === 'in-progress').length}</p>
            </div>
          </div>
          
          <div className={styles['summary-card']}>
            <div className={styles['summary-icon']}>💰</div>
            <div className={styles['summary-content']}>
              <h3>Total Revenue</h3>
              <p>${getTotalAmount()}</p>
            </div>
          </div>
        </div>
        
        <div className={styles['orders-table-container']}>
          {filteredOrders.length > 0 ? (
            <table className={styles['orders-table']}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date & Time</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.id} className={styles['order-row']}>
                    <td className={styles['order-id']}>{order.id}</td>
                    <td>{formatDate(order.date)}</td>
                    <td>{order.customer}</td>
                    <td>
                      <div className={styles['items-preview']}>
                        {order.items.slice(0, 2).map((item, index) => (
                          <span key={index}>
                            {item.quantity}x {item.name}
                            {index < Math.min(1, order.items.length - 1) ? ', ' : ''}
                          </span>
                        ))}
                        {order.items.length > 2 && (
                          <span className={styles['more-items']}>
                            +{order.items.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className={styles['order-amount']}>${order.totalAmount.toFixed(2)}</td>
                    <td>{order.paymentMethod}</td>
                    <td>
                      <span className={`${styles['status-badge']} ${styles[`status-${order.status}`]}`}>
                        {order.status === 'completed' ? 'Completed' : 'In Progress'}
                      </span>
                    </td>
                    <td>
                      <div className={styles['order-actions']}>
                        <button className={styles['view-btn']}>View</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={styles['no-orders']}>
              <p>No orders found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Orders 