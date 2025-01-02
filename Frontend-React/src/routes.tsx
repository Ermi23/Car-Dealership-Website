import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Client/Home';
import Inventory from './pages/Client/Inventory';
import ContactUs from './pages/Client/contactUs';
import AboutUs from './pages/Client/aboutUs';
import CarShow from './pages/Client/Carshow';
import Login from './pages/Login';
import SignUp from './pages/Signup';

import Dashboard from './pages/Administrator/Dashboard';
import Cars from './pages/Administrator/Cars/cars';
import Users from './pages/Administrator/Users/user';

const AppRoutes: React.FC = () => {

    return (
        <Routes>

            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/car-detail/:id" element={<CarShow />} />


            //Admin Routes
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/users" element={<Users />} />

        </Routes>
    );
};

export default AppRoutes;