import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { menuCategories, menuItems, getMenuItemsByCategory } from '../../utils/sampleData'
import styles from './Menu.module.css'

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState(null)
  const [filteredItems, setFilteredItems] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [availabilityFilter, setAvailabilityFilter] = useState('all')
  
  useEffect(() => {
    // Get initial menu items (all or from a specific category)
    const items = getMenuItemsByCategory(activeCategory)
    setFilteredItems(items)
  }, [activeCategory])
  
  useEffect(() => {
    // Apply filters whenever search or availability changes
    applyFilters()
  }, [searchQuery, availabilityFilter, activeCategory])
  
  const applyFilters = () => {
    let filtered = getMenuItemsByCategory(activeCategory)
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
      )
    }
    
    // Filter by availability
    if (availabilityFilter !== 'all') {
      filtered = filtered.filter(item => {
        if (availabilityFilter === 'available') return item.available
        return !item.available
      })
    }
    
    setFilteredItems(filtered)
  }
  
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId === activeCategory ? null : categoryId)
  }
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }
  
  const handleAvailabilityChange = (e) => {
    setAvailabilityFilter(e.target.value)
  }
  
  return (
    <DashboardLayout>
      <div className={styles['menu-page']}>
        <div className={styles['menu-header']}>
          <h2>Menu Management</h2>
          <p className={styles['menu-subtitle']}>Manage your restaurant's menu items, categories, and pricing.</p>
        </div>
        
        <div className={styles['menu-actions']}>
          <div className={styles['search-container']}>
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={handleSearchChange}
              className={styles['search-input']}
            />
          </div>
          
          <div className={styles['filter-container']}>
            <select 
              value={availabilityFilter}
              onChange={handleAvailabilityChange}
              className={styles['filter-select']}
            >
              <option value="all">All Items</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
            
            <button className={styles['add-item-btn']}>
              + Add Menu Item
            </button>
          </div>
        </div>
        
        <div className={styles['menu-content']}>
          <div className={styles['categories-container']}>
            <h3 className={styles['section-title']}>Categories</h3>
            <div className={styles['categories-list']}>
              <div 
                className={`${styles['category-item']} ${activeCategory === null ? styles['active'] : ''}`}
                onClick={() => handleCategoryChange(null)}
              >
                <span className={styles['category-icon']}>🍽️</span>
                <span className={styles['category-name']}>All Items</span>
              </div>
              
              {menuCategories.map(category => (
                <div 
                  key={category.id} 
                  className={`${styles['category-item']} ${activeCategory === category.id ? styles['active'] : ''}`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  <span className={styles['category-icon']}>{category.icon}</span>
                  <span className={styles['category-name']}>{category.name}</span>
                </div>
              ))}
              <button className={styles['add-category-btn']}>+ Add Category</button>
            </div>
          </div>
          
          <div className={styles['menu-items-container']}>
            <h3 className={styles['section-title']}>
              {activeCategory 
                ? `${menuCategories.find(c => c.id === activeCategory)?.name} Items` 
                : 'All Menu Items'} 
              <span className={styles['item-count']}>({filteredItems.length})</span>
            </h3>
            
            {filteredItems.length > 0 ? (
              <div className={styles['menu-items-grid']}>
                {filteredItems.map(item => (
                  <div key={item.id} className={styles['menu-item-card']}>
                    <div className={styles['item-image-container']}>
                      <img 
                        src={`${item.imageUrl}?w=400&h=300&fit=crop&auto=format`} 
                        alt={item.name} 
                        className={styles['item-image']} 
                      />
                      {item.popular && (
                        <span className={styles['popular-badge']}>Popular</span>
                      )}
                      {!item.available && (
                        <div className={styles['unavailable-overlay']}>
                          <span>Unavailable</span>
                        </div>
                      )}
                    </div>
                    
                    <div className={styles['item-content']}>
                      <div className={styles['item-header']}>
                        <h4 className={styles['item-name']}>{item.name}</h4>
                        <div className={styles['item-price']}>${item.price.toFixed(2)}</div>
                      </div>
                      
                      <p className={styles['item-description']}>{item.description}</p>
                      
                      <div className={styles['item-category']}>
                        <span 
                          className={styles['category-tag']}
                        >
                          {menuCategories.find(c => c.id === item.category)?.name}
                        </span>
                      </div>
                      
                      <div className={styles['item-actions']}>
                        <button className={styles['edit-btn']}>Edit</button>
                        <div className={styles['availability-toggle']}>
                          <label className={styles['toggle-label']}>
                            <input
                              type="checkbox"
                              checked={item.available}
                              readOnly
                              className={styles['toggle-input']}
                            />
                            <span className={styles['toggle-slider']}></span>
                          </label>
                          <span>{item.available ? 'Available' : 'Unavailable'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles['no-items']}>
                <p>No menu items found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Menu 