import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import FeaturedCars from './components/Client/home/FeaturedCars';
import Home from './pages/Client/Home';
import Inventory from './pages/Client/Inventory';
import ContactUs from './pages/Client/contactUs';
import AboutUs from './pages/Client/aboutUs';
import CarShow from './pages/Client/Carshow';
import Login from './pages/Login';
import SignUp from './pages/Signup';

// import Dashboard from './pages/Admin/dashboard/Dashboard';

const AppRoutes: React.FC = () => {

    return (
        <Routes>

            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/aboutus" element={<AboutUs />} />
            {/* <Route path="/car-details/${id}" element={<CarShow />} />
             */}
            <Route path="/car-detail/:id" element={<CarShow />} />


            //Admin Routes

        </Routes>
    );
};

export default AppRoutes;