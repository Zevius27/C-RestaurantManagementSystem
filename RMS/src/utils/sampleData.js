// Sample data for orders with dates, amounts, and order details
export const sampleOrders = [
  // Today
  {
    id: "ORD-1092",
    date: new Date().toISOString(),
    status: "completed",
    customer: "John Smith",
    items: [
      { name: "Margherita Pizza", quantity: 2, price: 12.99 },
      { name: "Greek Salad", quantity: 1, price: 8.50 },
    ],
    totalAmount: 34.48,
    paymentMethod: "Credit Card"
  },
  {
    id: "ORD-1091",
    date: new Date(new Date().setHours(new Date().getHours() - 2)).toISOString(),
    status: "in-progress",
    customer: "Emma Johnson",
    items: [
      { name: "Chicken Burger", quantity: 1, price: 10.99 },
      { name: "French Fries", quantity: 1, price: 4.50 },
      { name: "Soda", quantity: 2, price: 2.50 },
    ],
    totalAmount: 20.49,
    paymentMethod: "Cash"
  },
  
  // Yesterday
  {
    id: "ORD-1090",
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    status: "completed",
    customer: "Michael Brown",
    items: [
      { name: "Grilled Salmon", quantity: 1, price: 18.99 },
      { name: "Mashed Potatoes", quantity: 1, price: 5.50 },
      { name: "House Wine", quantity: 1, price: 7.99 },
    ],
    totalAmount: 32.48,
    paymentMethod: "Credit Card"
  },
  {
    id: "ORD-1089",
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    status: "completed",
    customer: "Sophia Williams",
    items: [
      { name: "Caesar Salad", quantity: 1, price: 9.99 },
      { name: "Garlic Bread", quantity: 1, price: 3.99 },
    ],
    totalAmount: 13.98,
    paymentMethod: "Credit Card"
  },
  
  // Last week
  {
    id: "ORD-1088",
    date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
    status: "completed",
    customer: "James Wilson",
    items: [
      { name: "Steak", quantity: 1, price: 24.99 },
      { name: "Baked Potato", quantity: 1, price: 4.50 },
      { name: "Craft Beer", quantity: 2, price: 6.99 },
    ],
    totalAmount: 43.47,
    paymentMethod: "Credit Card"
  },
  {
    id: "ORD-1087",
    date: new Date(new Date().setDate(new Date().getDate() - 6)).toISOString(),
    status: "completed",
    customer: "Olivia Martin",
    items: [
      { name: "Vegetarian Pasta", quantity: 1, price: 14.50 },
      { name: "Tiramisu", quantity: 1, price: 6.99 },
    ],
    totalAmount: 21.49,
    paymentMethod: "Cash"
  },
  {
    id: "ORD-1086",
    date: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(),
    status: "completed",
    customer: "Alexander Davis",
    items: [
      { name: "Margherita Pizza", quantity: 1, price: 12.99 },
      { name: "Chicken Wings", quantity: 1, price: 9.99 },
      { name: "Soda", quantity: 2, price: 2.50 },
    ],
    totalAmount: 27.98,
    paymentMethod: "Credit Card"
  },
  
  // Two weeks ago
  {
    id: "ORD-1085",
    date: new Date(new Date().setDate(new Date().getDate() - 12)).toISOString(),
    status: "completed",
    customer: "Emma Thompson",
    items: [
      { name: "Club Sandwich", quantity: 1, price: 11.50 },
      { name: "French Fries", quantity: 1, price: 4.50 },
      { name: "Iced Tea", quantity: 1, price: 3.50 },
    ],
    totalAmount: 19.50,
    paymentMethod: "Credit Card"
  },
  {
    id: "ORD-1084",
    date: new Date(new Date().setDate(new Date().getDate() - 13)).toISOString(),
    status: "completed",
    customer: "Daniel White",
    items: [
      { name: "Chicken Burger", quantity: 2, price: 10.99 },
      { name: "Onion Rings", quantity: 1, price: 5.99 },
      { name: "Milkshake", quantity: 2, price: 5.50 },
    ],
    totalAmount: 38.97,
    paymentMethod: "Cash"
  },
  {
    id: "ORD-1083",
    date: new Date(new Date().setDate(new Date().getDate() - 14)).toISOString(),
    status: "completed",
    customer: "Ava Garcia",
    items: [
      { name: "Fish and Chips", quantity: 1, price: 15.99 },
      { name: "Coleslaw", quantity: 1, price: 3.50 },
      { name: "Soft Drink", quantity: 1, price: 2.99 },
    ],
    totalAmount: 22.48,
    paymentMethod: "Credit Card"
  }
];

// Helper function to get orders by date range
export const getOrdersByDateRange = (startDate, endDate) => {
  return sampleOrders.filter(order => {
    const orderDate = new Date(order.date);
    return orderDate >= startDate && orderDate <= endDate;
  });
};

// Helper function to calculate total sales by day
export const getTotalSalesByDay = () => {
  const salesByDay = {};
  
  sampleOrders.forEach(order => {
    const date = new Date(order.date).toISOString().split('T')[0];
    if (!salesByDay[date]) {
      salesByDay[date] = 0;
    }
    salesByDay[date] += order.totalAmount;
  });
  
  return salesByDay;
};

// Helper function to get weekly sales data for chart
export const getWeeklySalesData = () => {
  const now = new Date();
  const oneWeekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
  
  const days = [];
  const salesData = [];
  
  // Create array of last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const formattedDate = date.toISOString().split('T')[0];
    days.push(formattedDate);
    salesData.push(0); // Initialize with 0
  }
  
  // Fill in actual sales data
  sampleOrders.forEach(order => {
    const orderDate = new Date(order.date).toISOString().split('T')[0];
    const index = days.indexOf(orderDate);
    if (index !== -1) {
      salesData[index] += order.totalAmount;
    }
  });
  
  return {
    labels: days.map(day => {
      const date = new Date(day);
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }),
    data: salesData
  };
};

// Helper function to get today's total sales
export const getTodaySales = () => {
  const today = new Date().toISOString().split('T')[0];
  return sampleOrders
    .filter(order => order.date.includes(today))
    .reduce((total, order) => total + order.totalAmount, 0);
};

// Helper function to get total number of orders for today
export const getTodayOrderCount = () => {
  const today = new Date().toISOString().split('T')[0];
  return sampleOrders.filter(order => order.date.includes(today)).length;
};

// Sample menu categories and items
export const menuCategories = [
  { id: 1, name: "Pizza", icon: "🍕" },
  { id: 2, name: "Burgers", icon: "🍔" },
  { id: 3, name: "Pasta", icon: "🍝" },
  { id: 4, name: "Salads", icon: "🥗" },
  { id: 5, name: "Beverages", icon: "🥤" },
  { id: 6, name: "Desserts", icon: "🍰" }
];

export const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and fresh basil",
    price: 12.99,
    category: 1,
    imageUrl: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca",
    popular: true,
    available: true
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    description: "Traditional pizza topped with tomato sauce, mozzarella, and pepperoni",
    price: 14.99,
    category: 1,
    imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e",
    popular: true,
    available: true
  },
  {
    id: 3,
    name: "Vegetarian Pizza",
    description: "Pizza topped with bell peppers, mushrooms, onions, olives, and fresh tomatoes",
    price: 13.99,
    category: 1,
    imageUrl: "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5",
    popular: false,
    available: true
  },
  {
    id: 4,
    name: "Classic Cheeseburger",
    description: "Beef patty with cheddar cheese, lettuce, tomato, and special sauce",
    price: 10.99,
    category: 2,
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    popular: true,
    available: true
  },
  {
    id: 5,
    name: "Chicken Burger",
    description: "Grilled chicken breast with avocado, bacon, lettuce, and honey mustard",
    price: 11.99,
    category: 2,
    imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec",
    popular: true,
    available: true
  },
  {
    id: 6,
    name: "Veggie Burger",
    description: "Plant-based patty with lettuce, tomato, pickles, and vegan mayo",
    price: 9.99,
    category: 2,
    imageUrl: "https://images.unsplash.com/photo-1520072959219-c595dc870360",
    popular: false,
    available: true
  },
  {
    id: 7,
    name: "Spaghetti Bolognese",
    description: "Spaghetti with rich meat sauce, topped with parmesan",
    price: 14.50,
    category: 3,
    imageUrl: "https://images.unsplash.com/photo-1622973536968-3ead9e780960",
    popular: true,
    available: true
  },
  {
    id: 8,
    name: "Fettuccine Alfredo",
    description: "Fettuccine pasta in creamy parmesan sauce with grilled chicken",
    price: 15.99,
    category: 3,
    imageUrl: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a",
    popular: false,
    available: true
  },
  {
    id: 9,
    name: "Penne Arrabbiata",
    description: "Penne pasta in spicy tomato sauce with garlic and chili",
    price: 13.50,
    category: 3,
    imageUrl: "https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb",
    popular: false,
    available: true
  },
  {
    id: 10,
    name: "Caesar Salad",
    description: "Romaine lettuce with Caesar dressing, croutons, and parmesan",
    price: 9.99,
    category: 4,
    imageUrl: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9",
    popular: true,
    available: true
  },
  {
    id: 11,
    name: "Greek Salad",
    description: "Mixed greens with feta cheese, olives, tomatoes, and cucumber",
    price: 8.99,
    category: 4,
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999",
    popular: true,
    available: true
  },
  {
    id: 12,
    name: "Soft Drink",
    description: "Choice of Coca-Cola, Sprite, or Fanta",
    price: 2.99,
    category: 5,
    imageUrl: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a",
    popular: false,
    available: true
  },
  {
    id: 13,
    name: "Fresh Juice",
    description: "Freshly squeezed orange, apple, or watermelon juice",
    price: 4.99,
    category: 5,
    imageUrl: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38",
    popular: false,
    available: true
  },
  {
    id: 14,
    name: "Chocolate Cake",
    description: "Rich chocolate cake with a layer of chocolate ganache",
    price: 6.99,
    category: 6,
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    popular: true,
    available: true
  },
  {
    id: 15,
    name: "Cheesecake",
    description: "Creamy New York style cheesecake with berry compote",
    price: 7.99,
    category: 6,
    imageUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad",
    popular: true,
    available: true
  }
];

// Helper function to get menu items by category
export const getMenuItemsByCategory = (categoryId) => {
  if (!categoryId) return menuItems;
  return menuItems.filter(item => item.category === categoryId);
};

// Helper function to get popular menu items
export const getPopularMenuItems = () => {
  return menuItems.filter(item => item.popular);
};

// Sample customer data
export const sampleCustomers = [
  {
    id: 1,
    name: "John Smith",
    email: "johnsmith@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, CA 12345",
    joinDate: new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString(),
    totalOrders: 12,
    totalSpent: 253.45,
    lastOrder: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
    status: "active",
    membershipLevel: "gold"
  },
  {
    id: 2,
    name: "Emma Johnson",
    email: "emma.j@example.com",
    phone: "(555) 234-5678",
    address: "456 Oak Ave, Somecity, NY 23456",
    joinDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(),
    totalOrders: 5,
    totalSpent: 98.75,
    lastOrder: new Date(new Date().setHours(new Date().getHours() - 2)).toISOString(),
    status: "active",
    membershipLevel: "silver"
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "mbrown@example.com",
    phone: "(555) 345-6789",
    address: "789 Pine Rd, Othercity, TX 34567",
    joinDate: new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString(),
    totalOrders: 18,
    totalSpent: 372.20,
    lastOrder: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    status: "active",
    membershipLevel: "gold"
  },
  {
    id: 4,
    name: "Sophia Williams",
    email: "sophia.w@example.com",
    phone: "(555) 456-7890",
    address: "101 Cedar St, Anycity, FL 45678",
    joinDate: new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString(),
    totalOrders: 7,
    totalSpent: 147.65,
    lastOrder: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    status: "active",
    membershipLevel: "bronze"
  },
  {
    id: 5,
    name: "James Wilson",
    email: "jwilson@example.com",
    phone: "(555) 567-8901",
    address: "202 Maple Ln, Somewhere, WA 56789",
    joinDate: new Date(new Date().setMonth(new Date().getMonth() - 8)).toISOString(),
    totalOrders: 25,
    totalSpent: 512.35,
    lastOrder: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(),
    status: "inactive",
    membershipLevel: "gold"
  },
  {
    id: 6,
    name: "Olivia Martin",
    email: "olivia.m@example.com",
    phone: "(555) 678-9012",
    address: "303 Elm Dr, Nowhere, IL 67890",
    joinDate: new Date(new Date().setMonth(new Date().getMonth() - 4)).toISOString(),
    totalOrders: 10,
    totalSpent: 175.90,
    lastOrder: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(),
    status: "active",
    membershipLevel: "silver"
  },
  {
    id: 7,
    name: "Alexander Davis",
    email: "adavis@example.com",
    phone: "(555) 789-0123",
    address: "404 Birch Ct, Anyplace, AZ 78901",
    joinDate: new Date(new Date().setMonth(new Date().getMonth() - 5)).toISOString(),
    totalOrders: 15,
    totalSpent: 320.50,
    lastOrder: new Date(new Date().setDate(new Date().getDate() - 8)).toISOString(),
    status: "active",
    membershipLevel: "silver"
  },
  {
    id: 8,
    name: "Emma Thompson",
    email: "eThompson@example.com",
    phone: "(555) 890-1234",
    address: "505 Spruce Way, Thatplace, OH 89012",
    joinDate: new Date(new Date().setMonth(new Date().getMonth() - 9)).toISOString(),
    totalOrders: 30,
    totalSpent: 615.25,
    lastOrder: new Date(new Date().setDate(new Date().getDate() - 15)).toISOString(),
    status: "active",
    membershipLevel: "gold"
  },
  {
    id: 9,
    name: "Daniel White",
    email: "dwhite@example.com",
    phone: "(555) 901-2345",
    address: "606 Juniper St, Someplace, MI 90123",
    joinDate: new Date(new Date().setMonth(new Date().getMonth() - 7)).toISOString(),
    totalOrders: 21,
    totalSpent: 430.75,
    lastOrder: new Date(new Date().setDate(new Date().getDate() - 12)).toISOString(),
    status: "inactive",
    membershipLevel: "silver"
  },
  {
    id: 10,
    name: "Ava Garcia",
    email: "agarcia@example.com",
    phone: "(555) 012-3456",
    address: "707 Aspen Ave, Anotherplace, CO 01234",
    joinDate: new Date(new Date().setMonth(new Date().getMonth() - 10)).toISOString(),
    totalOrders: 35,
    totalSpent: 720.15,
    lastOrder: new Date(new Date().setDate(new Date().getDate() - 20)).toISOString(),
    status: "active",
    membershipLevel: "gold"
  }
];

// Helper function to search customers
export const searchCustomers = (query) => {
  if (!query) return sampleCustomers;
  
  const lowercaseQuery = query.toLowerCase();
  return sampleCustomers.filter(customer => 
    customer.name.toLowerCase().includes(lowercaseQuery) ||
    customer.email.toLowerCase().includes(lowercaseQuery) ||
    customer.phone.includes(query)
  );
};

// Helper function to filter customers by status
export const filterCustomersByStatus = (status) => {
  if (status === 'all') return sampleCustomers;
  return sampleCustomers.filter(customer => customer.status === status);
};

// Helper function to filter customers by membership level
export const filterCustomersByMembership = (level) => {
  if (level === 'all') return sampleCustomers;
  return sampleCustomers.filter(customer => customer.membershipLevel === level);
}; 