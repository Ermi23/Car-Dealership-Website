export interface SalesData {
    date: string;
    amount: number;
  }
  
  export interface InventoryItem {
    id: string;
    name: string;
    category: string;
    price: number;
    status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  }
  
  export interface DashboardData {
    totalRevenue: number;
    totalSales: number;
    averagePrice: number;
    inventoryValue: number;
    recentSales: SalesData[];
    topSellingModels: { name: string; sales: number }[];
    inventoryStatus: InventoryItem[];
  }
  
  