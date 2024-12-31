
// Home.tsx
import React, { useState } from 'react';
import Navbar from '../components/default/Navbar';
import FeaturedCars from '../components/home/FeaturedCars';
import LocationMap from '../components/default/LocationMap';
import Intro from '../components/home/Intro';
import Footer from '../components/default/Footer';
import BrandNames from '../components/home/BrandName';


const Home: React.FC = () => {
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
            {/* <BrandNames /> */}
            <Navbar />
            <Intro />
            <FeaturedCars filters={filters} />
            <LocationMap googleMapsUrl="https://maps.app.goo.gl/EjSfQNL6LRKn9wVr9" />
            <Footer />
        </div>
    );
};

export default Home;
