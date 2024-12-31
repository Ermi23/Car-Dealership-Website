import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import FeaturedCars from './components/home/FeaturedCars';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import ContactUs from './pages/contactUs';
import AboutUs from './pages/aboutUs';
import CarShow from './pages/Carshow';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import AdminDashboard from './pages/Admin/dashboard/AdminDashboard';

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

            <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
    );
};

export default AppRoutes;