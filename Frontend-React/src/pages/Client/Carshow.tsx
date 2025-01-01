import React, { useState } from 'react';
import Navbar from '../../components/Client/Layout/Navbar';
import CarDetailsPage from '../../components/Client/CarDetails/car-details';
import Footer from '../../components/Client/Layout/Footer';
import { useParams } from 'react-router-dom';

const CarShow: React.FC = () => {
    const { id } = useParams(); // Get the id from the URL

    return (
        <div>
            <Navbar />
            <CarDetailsPage id={Number(id)} /> {/* Pass id as a prop if needed */}
            <Footer />
        </div>
    );
};

export default CarShow;
