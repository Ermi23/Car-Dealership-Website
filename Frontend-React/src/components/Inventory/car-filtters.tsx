'use client'

import React, { useState } from 'react';
import apiClient from '../../api/axios';

interface FilterState {
    make: string;
    model: string;
    type: string;
    minPrice: string;
    maxPrice: string;
    mileage: string;
    driveType: string;
    fuelType: string;
    transmission: string;
    color: string;
    door: string;
    cylinder: string;
    minYear: string;
    maxYear: string;
    vin: string;
}

interface VehicleFiltersProps {
    filters: FilterState;
    onFilterChange: (newFilters: FilterState) => void;
}

export default function VehicleFilters({ filters, onFilterChange }: VehicleFiltersProps) {
    const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({
        make: [],
        model: [],
        type: [],
        driveType: [],
        fuelType: [],
        transmission: [],
        cylinder: [],
    });

    const handleClearAll = () => {
        const clearedFilters = {
            make: '',
            model: '',
            type: '',
            driveType: '',
            fuelType: '',
            transmission: '',
            minPrice: '',
            maxPrice: '',
            mileage: '',
            color: '',
            door: '',
            cylinder: '',
            minYear: '',
            maxYear: '',
            vin: ''
        };

        onFilterChange(clearedFilters);
        setDropdownData({
            make: [],
            model: [],
            type: [],
            driveType: [],
            fuelType: [],
            transmission: [],
            cylinder: [],
        });
    };

    const fetchOptions = async (endpoint: string) => {
        try {
            const response = await apiClient.get(`/${endpoint}`);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch ${endpoint}:`, error);
            return [];
        }
    };

    const handleDropdownClick = async (field: string, endpoint: string) => {
        if (dropdownData[field].length === 0) {
            try {
                const data = await fetchOptions(endpoint);
                setDropdownData((prev) => ({ ...prev, [field]: data.data }));
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleInputChange = (field: string, value: string) => {
        const updatedFilters = { ...filters, [field]: value };
        onFilterChange(updatedFilters); // Update filters in the parent
    };

    const handleFilterChange = async (field: string, value: string | number) => {
        const updatedFilters = { ...filters, [field]: value };
        onFilterChange(updatedFilters); // Update filters in the parent
    };

    return (
        <div className="w-full max-w-7xl mx-auto space-y-4 bg-white rounded-lg shadow-sm mt-28">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <select
                    value={filters.make}
                    onClick={() => handleDropdownClick('make', 'brand-names')}
                    onChange={(e) => handleFilterChange('make', e.target.value)}
                    className="w-full border rounded p-2"
                >
                    <option value="" disabled>Brands</option>
                    {dropdownData.make.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>

                <select
                    value={filters.model}
                    onClick={() => handleDropdownClick('model', 'vehicle-models')}
                    onChange={(e) => handleFilterChange('model', e.target.value)}
                    className="w-full border rounded p-2"
                >
                    <option value="" disabled>Model</option>
                    {dropdownData.model.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>

                <select
                    value={filters.type}
                    onClick={() => handleDropdownClick('type', 'types')}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="w-full border rounded p-2"
                >
                    <option value="" disabled>Type</option>
                    {dropdownData.type.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>

                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Min Price"
                        value={filters.minPrice}
                        onChange={(e) => handleInputChange('minPrice', e.target.value)}
                        className="w-full border rounded p-2"
                    />
                    <input
                        type="number"
                        placeholder="Max Price"
                        value={filters.maxPrice}
                        onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                        className="w-full border rounded p-2"
                    />
                </div>

                <select
                    value={filters.driveType}
                    onClick={() => handleDropdownClick('driveType', 'drive-types')}
                    onChange={(e) => handleFilterChange('driveType', e.target.value)}
                    className="w-full border rounded p-2"
                >
                    <option value="" disabled>Drive Type</option>
                    {dropdownData.driveType.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">

                <select
                    value={filters.cylinder}
                    onClick={() => handleDropdownClick('cylinder', 'cylinders')}
                    onChange={(e) => handleFilterChange('cylinder', e.target.value)}
                    className="w-full border rounded p-2"
                >
                    <option value="" disabled>Cylinder</option>
                    {dropdownData.cylinder.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>

                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Min Year"
                        value={filters.minYear}
                        onChange={(e) => handleInputChange('minYear', e.target.value)}
                        className="w-full border rounded p-2"
                    />
                    <input
                        type="number"
                        placeholder="Max Year"
                        value={filters.maxYear}
                        onChange={(e) => handleInputChange('maxYear', e.target.value)}
                        className="w-full border rounded p-2"
                    />
                </div>

                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Door"
                        value={filters.door}
                        onChange={(e) => handleInputChange('door', e.target.value)}
                        className="w-full border rounded p-2"
                    />
                    <input
                        // type="number"
                        placeholder="color"
                        value={filters.color}
                        onChange={(e) => handleInputChange('color', e.target.value)}
                        className="w-full border rounded p-2"
                    />
                </div>

            </div>




            <div className="flex justify-end gap-4">
                <button onClick={handleClearAll} className="bg-red-500 text-white rounded p-2">
                    Clear all
                </button>
                {/* <button className="flex items-center gap-2">
                    Less filters
                    <ChevronUp className="h-4 w-4" />
                </button> */}
            </div>
        </div>
    );
}

// Debounce Function
function debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}