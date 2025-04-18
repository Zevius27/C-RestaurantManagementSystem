// Sample data for orders with dates, amounts, and order details
export const sampleOrders = [
  // Today
  {
    id: "ORD-1092",
    date: "2023-10-15T10:30:00",
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
    date: "2023-10-15T09:15:00",
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
    date: "2023-10-14T18:45:00",
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
    date: "2023-10-14T12:30:00",
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
    date: "2023-10-10T19:20:00",
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
    date: "2023-10-09T14:15:00",
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
    date: "2023-10-08T20:30:00",
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
    date: "2023-10-03T13:40:00",
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
    date: "2023-10-02T11:25:00",
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
    date: "2023-10-01T17:50:00",
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