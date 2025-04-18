import React, { useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import styles from './Settings.module.css'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general')
  const [formData, setFormData] = useState({
    restaurantName: 'My Restaurant',
    address: '123 Main Street, Anytown, USA',
    phone: '(555) 123-4567',
    email: 'contact@myrestaurant.com',
    website: 'https://www.myrestaurant.com',
    taxRate: '8.5',
    currencySymbol: '$',
    timeZone: 'America/New_York',
    language: 'en',
    theme: 'light',
    emailNotifications: true,
    smsNotifications: false,
    printReceipts: true
  })
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // This would typically save to the backend
    alert('Settings saved successfully!')
  }
  
  return (
    <DashboardLayout>
      <div className={styles['settings-page']}>
        <div className={styles['settings-header']}>
          <h2>System Settings</h2>
          <p className={styles['settings-subtitle']}>Configure your restaurant management system preferences.</p>
        </div>
        
        <div className={styles['settings-container']}>
          <div className={styles['settings-sidebar']}>
            <ul className={styles['settings-tabs']}>
              <li 
                className={`${styles['settings-tab']} ${activeTab === 'general' ? styles['active'] : ''}`}
                onClick={() => handleTabChange('general')}
              >
                <span className={styles['tab-icon']}>⚙️</span>
                General
              </li>
              <li 
                className={`${styles['settings-tab']} ${activeTab === 'billing' ? styles['active'] : ''}`}
                onClick={() => handleTabChange('billing')}
              >
                <span className={styles['tab-icon']}>💳</span>
                Billing & Taxes
              </li>
              <li 
                className={`${styles['settings-tab']} ${activeTab === 'notifications' ? styles['active'] : ''}`}
                onClick={() => handleTabChange('notifications')}
              >
                <span className={styles['tab-icon']}>🔔</span>
                Notifications
              </li>
              <li 
                className={`${styles['settings-tab']} ${activeTab === 'appearance' ? styles['active'] : ''}`}
                onClick={() => handleTabChange('appearance')}
              >
                <span className={styles['tab-icon']}>🎨</span>
                Appearance
              </li>
              <li 
                className={`${styles['settings-tab']} ${activeTab === 'users' ? styles['active'] : ''}`}
                onClick={() => handleTabChange('users')}
              >
                <span className={styles['tab-icon']}>👥</span>
                Users & Permissions
              </li>
              <li 
                className={`${styles['settings-tab']} ${activeTab === 'integrations' ? styles['active'] : ''}`}
                onClick={() => handleTabChange('integrations')}
              >
                <span className={styles['tab-icon']}>🔌</span>
                Integrations
              </li>
              <li 
                className={`${styles['settings-tab']} ${activeTab === 'backup' ? styles['active'] : ''}`}
                onClick={() => handleTabChange('backup')}
              >
                <span className={styles['tab-icon']}>💾</span>
                Backup & Restore
              </li>
            </ul>
          </div>
          
          <div className={styles['settings-content']}>
            {activeTab === 'general' && (
              <form className={styles['settings-form']} onSubmit={handleSubmit}>
                <h3 className={styles['section-title']}>Restaurant Information</h3>
                
                <div className={styles['form-group']}>
                  <label htmlFor="restaurantName">Restaurant Name</label>
                  <input
                    type="text"
                    id="restaurantName"
                    name="restaurantName"
                    value={formData.restaurantName}
                    onChange={handleInputChange}
                    className={styles['form-input']}
                  />
                </div>
                
                <div className={styles['form-group']}>
                  <label htmlFor="address">Address</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={styles['form-textarea']}
                    rows="3"
                  />
                </div>
                
                <div className={styles['form-row']}>
                  <div className={styles['form-group']}>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={styles['form-input']}
                    />
                  </div>
                  
                  <div className={styles['form-group']}>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={styles['form-input']}
                    />
                  </div>
                </div>
                
                <div className={styles['form-group']}>
                  <label htmlFor="website">Website</label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className={styles['form-input']}
                  />
                </div>
                
                <h3 className={styles['section-title']}>Regional Settings</h3>
                
                <div className={styles['form-row']}>
                  <div className={styles['form-group']}>
                    <label htmlFor="currencySymbol">Currency Symbol</label>
                    <input
                      type="text"
                      id="currencySymbol"
                      name="currencySymbol"
                      value={formData.currencySymbol}
                      onChange={handleInputChange}
                      className={styles['form-input']}
                    />
                  </div>
                  
                  <div className={styles['form-group']}>
                    <label htmlFor="taxRate">Default Tax Rate (%)</label>
                    <input
                      type="text"
                      id="taxRate"
                      name="taxRate"
                      value={formData.taxRate}
                      onChange={handleInputChange}
                      className={styles['form-input']}
                    />
                  </div>
                </div>
                
                <div className={styles['form-row']}>
                  <div className={styles['form-group']}>
                    <label htmlFor="timeZone">Time Zone</label>
                    <select
                      id="timeZone"
                      name="timeZone"
                      value={formData.timeZone}
                      onChange={handleInputChange}
                      className={styles['form-select']}
                    >
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="Europe/London">London (GMT)</option>
                    </select>
                  </div>
                  
                  <div className={styles['form-group']}>
                    <label htmlFor="language">Language</label>
                    <select
                      id="language"
                      name="language"
                      value={formData.language}
                      onChange={handleInputChange}
                      className={styles['form-select']}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                </div>
                
                <div className={styles['form-actions']}>
                  <button type="submit" className={styles['save-btn']}>Save Changes</button>
                  <button type="button" className={styles['cancel-btn']}>Cancel</button>
                </div>
              </form>
            )}
            
            {activeTab === 'appearance' && (
              <form className={styles['settings-form']}>
                <h3 className={styles['section-title']}>Theme Settings</h3>
                
                <div className={styles['form-group']}>
                  <label htmlFor="theme">Application Theme</label>
                  <div className={styles['theme-selector']}>
                    <div 
                      className={`${styles['theme-option']} ${formData.theme === 'light' ? styles['selected'] : ''}`}
                      onClick={() => handleInputChange({ target: { name: 'theme', value: 'light' } })}
                    >
                      <div className={styles['theme-preview']} style={{ backgroundColor: '#ffffff' }}>
                        <div className={styles['theme-header']} style={{ backgroundColor: '#f8f9fa' }}></div>
                        <div className={styles['theme-sidebar']} style={{ backgroundColor: '#f8f9fa' }}></div>
                      </div>
                      <span>Light</span>
                    </div>
                    
                    <div 
                      className={`${styles['theme-option']} ${formData.theme === 'dark' ? styles['selected'] : ''}`}
                      onClick={() => handleInputChange({ target: { name: 'theme', value: 'dark' } })}
                    >
                      <div className={styles['theme-preview']} style={{ backgroundColor: '#121212' }}>
                        <div className={styles['theme-header']} style={{ backgroundColor: '#1e1e1e' }}></div>
                        <div className={styles['theme-sidebar']} style={{ backgroundColor: '#1e1e1e' }}></div>
                      </div>
                      <span>Dark</span>
                    </div>
                  </div>
                </div>
                
                <div className={styles['form-actions']}>
                  <button type="submit" className={styles['save-btn']}>Save Changes</button>
                  <button type="button" className={styles['cancel-btn']}>Cancel</button>
                </div>
              </form>
            )}
            
            {activeTab === 'notifications' && (
              <form className={styles['settings-form']}>
                <h3 className={styles['section-title']}>Notification Preferences</h3>
                
                <div className={styles['form-group']}>
                  <div className={styles['checkbox-control']}>
                    <label className={styles['checkbox-label']}>
                      <input
                        type="checkbox"
                        name="emailNotifications"
                        checked={formData.emailNotifications}
                        onChange={handleInputChange}
                        className={styles['checkbox-input']}
                      />
                      <span className={styles['checkbox-text']}>Email Notifications</span>
                    </label>
                    <p className={styles['help-text']}>Receive notifications about new orders and important updates via email.</p>
                  </div>
                </div>
                
                <div className={styles['form-group']}>
                  <div className={styles['checkbox-control']}>
                    <label className={styles['checkbox-label']}>
                      <input
                        type="checkbox"
                        name="smsNotifications"
                        checked={formData.smsNotifications}
                        onChange={handleInputChange}
                        className={styles['checkbox-input']}
                      />
                      <span className={styles['checkbox-text']}>SMS Notifications</span>
                    </label>
                    <p className={styles['help-text']}>Receive text messages for urgent notifications and order updates.</p>
                  </div>
                </div>
                
                <div className={styles['form-group']}>
                  <div className={styles['checkbox-control']}>
                    <label className={styles['checkbox-label']}>
                      <input
                        type="checkbox"
                        name="printReceipts"
                        checked={formData.printReceipts}
                        onChange={handleInputChange}
                        className={styles['checkbox-input']}
                      />
                      <span className={styles['checkbox-text']}>Print Receipts Automatically</span>
                    </label>
                    <p className={styles['help-text']}>Automatically print receipts when an order is completed.</p>
                  </div>
                </div>
                
                <div className={styles['form-actions']}>
                  <button type="submit" className={styles['save-btn']}>Save Changes</button>
                  <button type="button" className={styles['cancel-btn']}>Cancel</button>
                </div>
              </form>
            )}
            
            {(activeTab === 'billing' || activeTab === 'users' || activeTab === 'integrations' || activeTab === 'backup') && (
              <div className={styles['coming-soon']}>
                <div className={styles['coming-soon-icon']}>🚧</div>
                <h3>Coming Soon</h3>
                <p>This section is currently under development and will be available in a future update.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Settings 