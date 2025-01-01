import React, { useState } from 'react';
import Navbar from '../../components/Client/Layout/Navbar';
import InventoryCars from '../../components/Client/Inventory/InventoryCars';
import VehicleFilters from '../../components/Client/Inventory/car-filtters';
import Footer from '../../components/Client/Layout/Footer';

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