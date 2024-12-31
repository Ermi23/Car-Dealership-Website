import React, { useState } from 'react';
import { Car, DollarSign, Package, ShoppingCart, AlertTriangle } from 'lucide-react';
import { formatCurrency } from './format-currency';

// This would typically come from an API call
const dashboardData = {
    totalRevenue: 1250000,
    totalSales: 45,
    averagePrice: 27777,
    inventoryValue: 3500000,
    recentSales: [
        { date: '2023-06-01', amount: 35000 },
        { date: '2023-06-02', amount: 28000 },
        { date: '2023-06-03', amount: 42000 },
        { date: '2023-06-04', amount: 31000 },
        { date: '2023-06-05', amount: 38000 },
        { date: '2023-06-06', amount: 40000 },
        { date: '2023-06-07', amount: 35000 },
    ],
    topSellingModels: [
        { name: 'Model A', sales: 12 },
        { name: 'Model B', sales: 10 },
        { name: 'Model C', sales: 8 },
        { name: 'Model D', sales: 7 },
        { name: 'Model E', sales: 5 },
    ],
    inventoryStatus: [
        { id: '1', name: 'Sedan X', category: 'Sedan', price: 25000, status: 'In Stock' },
        { id: '2', name: 'SUV Y', category: 'SUV', price: 35000, status: 'Low Stock' },
        { id: '3', name: 'Truck Z', category: 'Truck', price: 40000, status: 'Out of Stock' },
        { id: '4', name: 'Compact A', category: 'Compact', price: 20000, status: 'In Stock' },
        { id: '5', name: 'Luxury B', category: 'Luxury', price: 55000, status: 'In Stock' },
    ],
};

export default function AdminDashboard() {
    const [selectedTimeRange, setSelectedTimeRange] = useState('7d');

    return (
        <div className="container mx-auto p-4 space-y-6">
            <h1 className="text-3xl font-bold">Dealer Admin Dashboard</h1>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { title: 'Total Revenue', value: formatCurrency(dashboardData.totalRevenue), icon: <DollarSign /> },
                    { title: 'Total Sales', value: dashboardData.totalSales, icon: <ShoppingCart /> },
                    { title: 'Average Price', value: formatCurrency(dashboardData.averagePrice), icon: <Car /> },
                    { title: 'Inventory Value', value: formatCurrency(dashboardData.inventoryValue), icon: <Package /> },
                ].map((stat, index) => (
                    <div key={index} className="border p-4 rounded-lg shadow-md">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{stat.title}</span>
                            {stat.icon}
                        </div>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-gray-500">+{(Math.random() * 10).toFixed(1)}% from last month</p>
                    </div>
                ))}
            </div>

            {/* Sales Chart */}
            {/* <div className="border rounded-lg shadow-md p-4">
                <h2 className="text-lg font-bold">Sales Overview</h2>
                <div className="flex space-x-2 mb-4">
                    {['7d', '30d', '90d'].map(range => (
                        <button
                            key={range}
                            className={`py-1 px-3 rounded ${selectedTimeRange === range ? 'bg-gray-300' : 'bg-gray-200'}`}
                            onClick={() => setSelectedTimeRange(range)}
                        >
                            {range}
                        </button>
                    ))}
                </div>
                <div className="h-64"> */}
            {/* Placeholder for the Bar Chart */}
            {/* <p>Bar chart goes here (You can use a chart library if needed)</p>
                </div>
            </div> */}

            {/* Top Selling Models and Inventory Status */}
            <div className="grid gap-4 md:grid-cols-2">
                <div className="border rounded-lg shadow-md p-4">
                    <h2 className="text-lg font-bold">Top Selling Models</h2>
                    <table className="w-full mt-2">
                        <thead>
                            <tr>
                                <th className="text-left">Model</th>
                                <th className="text-right">Sales</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.topSellingModels.map(model => (
                                <tr key={model.name}>
                                    <td>{model.name}</td>
                                    <td className="text-right">{model.sales}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="border rounded-lg shadow-md p-4">
                    <h2 className="text-lg font-bold">Inventory Status</h2>
                    <table className="w-full mt-2">
                        <thead>
                            <tr>
                                <th>Model</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.inventoryStatus.map(item => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.category}</td>
                                    <td>{formatCurrency(item.price)}</td>
                                    <td>
                                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${item.status === 'In Stock' ? 'bg-green-100 text-green-700' : item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                            {item.status === 'Out of Stock' && <AlertTriangle className="mr-1 h-3 w-3" />}
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="border rounded-lg shadow-md p-4">
                <h2 className="text-lg font-bold">Quick Actions</h2>
                <div className="flex flex-wrap gap-4 mt-2">
                    {['Add New Vehicle', 'Generate Sales Report', 'Manage Inventory', 'View All Sales'].map(action => (
                        <button key={action} className="py-2 px-4 border rounded">
                            {action}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}