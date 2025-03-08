import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './pages/Administrator/components/Layout';
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
import BrandNamesPage from './pages/Administrator/Brand-Names/brandName';
import Transmission from './pages/Administrator/Transmissions/Transmission';
import FuelTypesPage from './pages/Administrator/Fuel-Types/fuelType';
import AdminContactUs from './pages/Administrator/Contact-Us/ContactUs';
import CarFeatures from './pages/Administrator/Features/Normal-Features/car-features';
import SafetyFeatures from './pages/Administrator/Features/Safety-Features/safety-features';
import Cylinder from './pages/Administrator/Cylinders/Cylinders';
import DriveType from './pages/Administrator/DriveTypes/DriveTypes';

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


            <Route
                path="*"
                element={
                    <Layout>

                        <Routes>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/cars" element={<Cars />} />
                            <Route path="/users" element={<Users />} />
                            <Route path="/brendnames" element={<BrandNamesPage />} />
                            <Route path="/transmissions" element={<Transmission />} />
                            <Route path="/cylinders" element={<Cylinder />} />
                            <Route path="/drive-types" element={<DriveType />} />
                            <Route path="/fuel-types" element={<FuelTypesPage />} />
                            <Route path="/messages" element={<AdminContactUs />} />
                            <Route path="/features" element={<CarFeatures />} />
                            <Route path="/safty-features" element={<SafetyFeatures />} />
                        </Routes>

                    </Layout>
                }
            />
        </Routes>
    );
};

export default AppRoutes;