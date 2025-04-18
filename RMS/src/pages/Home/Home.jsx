import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import Button from '../../components/Button'
import { StatCard } from './Home-components'
import styles from './Home.module.css'
import { 
  FaShoppingBag, 
  FaMoneyBillWave, 
  FaChair, 
  FaChartLine,
  FaUsers,
  FaClipboardList,
  FaBoxes,
  FaBullhorn 
} from 'react-icons/fa'

const Home = () => {
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  
  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
    
    // Update current time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);
  
  const randomReservations = Math.floor(Math.random() * 5) + 3;
  
  return (
    <DashboardLayout>
      <div className={styles['home-page']}>
        <div className={styles['welcome-banner']}>
          <div className={styles['welcome-text']}>
            <h1 className={styles['greeting']}>{greeting}, Alex!</h1>
            <p className={styles['time-display']}>{currentTime}</p>
            <p className={styles['welcome-message']}>Your restaurant is performing well today</p>
          </div>
          <div className={styles['cta-container']}>
            <Button variant="primary" className={styles['premium-button']}>View Live Orders</Button>
            <Button variant="secondary" className={styles['premium-button']}>Today's Reservations ({randomReservations})</Button>
          </div>
        </div>
        
        <div className={styles['stats-container']}>
          <h2 className={styles['section-title']}>Today's Performance</h2>
          <div className={styles['quick-stats']}>
            <StatCard 
              title="Today's Orders" 
              value="24" 
              trend={{ type: 'up', value: '+5', label: 'from yesterday' }}
              icon={<FaShoppingBag />}
            />
            
            <StatCard 
              title="Revenue" 
              value="$1,250" 
              trend={{ type: 'up', value: '+12%', label: 'from last week' }}
              icon={<FaMoneyBillWave />}
            />
            
            <StatCard 
              title="Active Tables" 
              value="8/12" 
              icon={<FaChair />}
            />
            
            <StatCard 
              title="Avg. Order Value" 
              value="$52" 
              trend={{ type: 'up', value: '+4%', label: 'from last month' }}
              icon={<FaChartLine />}
            />
          </div>
        </div>
        
        <div className={styles['highlights-section']}>
          <div className={styles['highlight-card']}>
            <h3>Popular Items Today</h3>
            <div className={styles['popular-items']}>
              <div className={styles['popular-item']}>
                <span className={styles['item-name']}>Grilled Salmon</span>
                <span className={styles['item-count']}>12 orders</span>
              </div>
              <div className={styles['popular-item']}>
                <span className={styles['item-name']}>Ribeye Steak</span>
                <span className={styles['item-count']}>9 orders</span>
              </div>
              <div className={styles['popular-item']}>
                <span className={styles['item-name']}>Truffle Pasta</span>
                <span className={styles['item-count']}>7 orders</span>
              </div>
            </div>
          </div>
          
          <div className={styles['highlight-card']}>
            <h3>Quick Actions</h3>
            <div className={styles['action-grid']}>
              <button className={styles['action-button']}>
                <FaUsers className={styles['action-icon']} />
                <span>Manage Staff</span>
              </button>
              <button className={styles['action-button']}>
                <FaClipboardList className={styles['action-icon']} />
                <span>Update Menu</span>
              </button>
              <button className={styles['action-button']}>
                <FaBoxes className={styles['action-icon']} />
                <span>Inventory Check</span>
              </button>
              <button className={styles['action-button']}>
                <FaBullhorn className={styles['action-icon']} />
                <span>Special Promotions</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className={styles['notification-center']}>
          <h3>Recent Notifications</h3>
          <div className={styles['notifications-list']}>
            <div className={styles['notification-item']} data-priority="high">
              <span className={styles['notification-time']}>10:45 AM</span>
              <p>Table 5 requested the check</p>
            </div>
            <div className={styles['notification-item']} data-priority="medium">
              <span className={styles['notification-time']}>10:32 AM</span>
              <p>New reservation for 7:00 PM (Party of 6)</p>
            </div>
            <div className={styles['notification-item']} data-priority="low">
              <span className={styles['notification-time']}>9:15 AM</span>
              <p>Inventory alert: White wine stock running low</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home 