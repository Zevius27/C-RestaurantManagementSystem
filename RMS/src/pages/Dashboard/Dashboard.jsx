import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { DashboardCard } from './Dashboard-components'
import styles from './Dashboard.module.css'
import { 
  getWeeklySalesData, 
  getTodaySales, 
  getTodayOrderCount,
  getOrdersByDateRange, 
  sampleOrders 
} from '../../utils/sampleData'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const Dashboard = () => {
  const [dateFilter, setDateFilter] = useState('today')
  const [salesData, setSalesData] = useState({ labels: [], data: [] })
  const [ordersToShow, setOrdersToShow] = useState([])
  const [customDateRange, setCustomDateRange] = useState({
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    // Get chart data
    const weeklyData = getWeeklySalesData()
    setSalesData(weeklyData)

    // Filter orders based on selected date range
    filterOrdersByDate(dateFilter)
  }, [dateFilter])

  const filterOrdersByDate = (filter) => {
    const now = new Date()
    let startDate = new Date()
    let endDate = new Date()

    switch (filter) {
      case 'today':
        // Start date is beginning of today
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        // End date is end of today
        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)
        break
      case 'week':
        // Start date is 7 days ago
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
        endDate = now
        break
      case 'month':
        // Start date is 30 days ago
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30)
        endDate = now
        break
      case 'year':
        // Start date is 365 days ago
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
        endDate = now
        break
      case 'custom':
        startDate = new Date(customDateRange.start)
        endDate = new Date(customDateRange.end)
        endDate.setHours(23, 59, 59)
        break
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        endDate = now
    }

    const filteredOrders = getOrdersByDateRange(startDate, endDate)
    setOrdersToShow(filteredOrders)
  }

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value)
  }

  const handleCustomDateChange = (type, value) => {
    setCustomDateRange(prev => ({
      ...prev,
      [type]: value
    }))
    
    // If we're already on custom filter, update the data
    if (dateFilter === 'custom') {
      filterOrdersByDate('custom')
    }
  }

  // Chart configuration
  const chartData = {
    labels: salesData.labels,
    datasets: [
      {
        label: 'Sales ($)',
        data: salesData.data,
        backgroundColor: 'rgba(74, 111, 165, 0.8)',
        borderColor: 'rgba(74, 111, 165, 1)',
        borderWidth: 1,
        borderRadius: 5,
        hoverBackgroundColor: 'rgba(74, 111, 165, 1)'
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekly Sales',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 13
        },
        padding: 12,
        cornerRadius: 6,
        displayColors: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(200, 200, 200, 0.1)'
        },
        ticks: {
          font: {
            size: 12
          },
          callback: function(value) {
            return '$' + value
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12
          }
        }
      }
    }
  }

  // Calculate totals based on filtered orders
  const totalSales = ordersToShow.reduce((sum, order) => sum + order.totalAmount, 0).toFixed(2)
  const completedOrders = ordersToShow.filter(order => order.status === 'completed').length
  const pendingOrders = ordersToShow.filter(order => order.status === 'in-progress').length

  return (
    <DashboardLayout>
      <div className={styles['dashboard-page']}>
        <div className={styles['dashboard-header']}>
          <h2>Dashboard Overview</h2>
          <div className={styles['date-filter-container']}>
            <select 
              value={dateFilter} 
              onChange={handleDateFilterChange}
              className={styles['date-select']}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
            
            {dateFilter === 'custom' && (
              <div className={styles['custom-date-range']}>
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
            )}
          </div>
        </div>
        
        <div className={styles['dashboard-grid']}>
          <div className={`${styles['dashboard-card']} ${styles['sales-summary']}`}>
            <h3>Sales Summary</h3>
            <div className={styles['card-content']}>
              <p className={styles['sales-total']}>${totalSales}</p>
              <p className={styles['sales-compare']}>
                <span className={styles['trend-icon']}>↗</span> 
                +12.5% from last period
              </p>
            </div>
          </div>
          
          <div className={`${styles['dashboard-card']} ${styles['orders-summary']}`}>
            <h3>Total Orders</h3>
            <div className={styles['card-content']}>
              <p className={styles['orders-total']}>{ordersToShow.length}</p>
              <div className={styles['orders-breakdown']}>
                <div className={styles['order-stat']}>
                  <span className={styles['order-stat-label']}>Completed:</span>
                  <span className={styles['order-stat-value']}>{completedOrders}</span>
                </div>
                <div className={styles['order-stat']}>
                  <span className={styles['order-stat-label']}>In Progress:</span>
                  <span className={styles['order-stat-value']}>{pendingOrders}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`${styles['dashboard-card']} ${styles['top-items']}`}>
            <h3>Top Menu Items</h3>
            <ul className={styles['top-items-list']}>
              <li>
                <div className={styles['item-name']}>
                  <span className={styles['item-rank']}>1</span>
                  Margherita Pizza
                </div>
                <span className={styles['item-count']}>32 orders</span>
              </li>
              <li>
                <div className={styles['item-name']}>
                  <span className={styles['item-rank']}>2</span>
                  Chicken Burger
                </div>
                <span className={styles['item-count']}>27 orders</span>
              </li>
              <li>
                <div className={styles['item-name']}>
                  <span className={styles['item-rank']}>3</span>
                  Greek Salad
                </div>
                <span className={styles['item-count']}>21 orders</span>
              </li>
            </ul>
          </div>
          
          <div className={`${styles['dashboard-card']} ${styles['customer-stats']}`}>
            <h3>Customer Stats</h3>
            <div className={styles['card-content']}>
              <div className={styles['stat-row']}>
                <div className={styles['stat-icon']}>👤</div>
                <span className={styles['stat-label']}>New Customers:</span>
                <span className={styles['stat-value']}>18</span>
              </div>
              <div className={styles['stat-row']}>
                <div className={styles['stat-icon']}>🔄</div>
                <span className={styles['stat-label']}>Returning:</span>
                <span className={styles['stat-value']}>42</span>
              </div>
              <div className={styles['stat-row']}>
                <div className={styles['stat-icon']}>💰</div>
                <span className={styles['stat-label']}>Avg. Order:</span>
                <span className={styles['stat-value']}>$22.15</span>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Sales Chart */}
        <div className={styles['chart-container']}>
          <div className={styles['chart-card']}>
            <Bar data={chartData} options={chartOptions} height={300} />
          </div>
        </div>
        
        {/* Recent Orders */}
        <div className={styles['recent-orders']}>
          <h3>Recent Orders</h3>
          <div className={styles['orders-table-container']}>
            <table className={styles['orders-table']}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {ordersToShow.slice(0, 5).map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{new Date(order.date).toLocaleDateString()} {new Date(order.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                    <td>{order.customer}</td>
                    <td>{order.items.length} items</td>
                    <td>${order.totalAmount.toFixed(2)}</td>
                    <td>
                      <span className={`${styles['status-badge']} ${styles[`status-${order.status}`]}`}>
                        {order.status === 'completed' ? 'Completed' : 'In Progress'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard 