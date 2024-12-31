import React, { useState } from 'react';
import Navbar from '../components/default/Navbar';
import InventoryCars from '../components/Inventory/InventoryCars';
import VehicleFilters from '../components/Inventory/car-filtters';
import Footer from '../components/default/Footer';

const Inventory: React.FC = () => {
    const [filters, setFilters] = useState({
        make: '',
        model: '',
        type: '',
        minPrice: '',
        maxPrice: '',
        mileage: '',
        driveType: '',
        fuelType: '',
        features: '',
        transmission: '',
        color: '',
        door: '',
        safetyFeatures: '',
        cylinder: '',
        minYear: '',
        maxYear: '',
        vin: '',
        page: 1, // Add this line
    });

    const handleFilterChange = (newFilters: any) => {
        setFilters(newFilters);
    };

    return (
        <div>
            <Navbar />
            <VehicleFilters filters={filters} onFilterChange={handleFilterChange} />
            <InventoryCars filters={filters} />
            <Footer />
        </div>
    );
};

export default Inventory;