import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// import imageSrc from '.../assets/image.png'; // Adjust the path as necessary
import imageSrc from '../../../assets/image.png';
import { Facebook, Twitter, Instagram, MessageCircle, Linkedin, Menu, X } from 'lucide-react';

interface NavbarProps {
    onFeaturedCarsClick: () => void;
}

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);

    };

    const location = useLocation();

    useEffect(() => {
        if (location.hash === '#FeaturedCars') {
            const target = document.getElementById('FeaturedCars');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        // <nav className="bg-neutral-100 text-white py-2 fixed top-0 left-0 w-full z-50 fixed-navbar">
        // <nav className="bg-neutral-100 text-white py-2">
        // <nav className="bg-gray-900 text-black py-2 top-0 left-0 w-full z-50">
        <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-white py-2">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">

                    {/* Logo */}
                    <a href="/" className="flex-shrink-0">
                        <img
                            src={imageSrc} // Use the imported image here
                            alt="Solomon Auto-Sell"
                            className="w-16 h-16 rounded-full" // Adjusted size and added rounded-full
                        />
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-6 flex-grow justify-center">
                        <div className="flex space-x-6"> {/* Remove the ul and li */}
                            <a href="/" className="font-bold text-white hover:text-orange-600 hover:font-bold">Home</a>
                            {/* <a href="/#FeaturedCars" className="font-bold text-white hover:text-orange-600 hover:font-bold">Featured Cars</a>
                             */}
                            <Link to="/#FeaturedCars" className="font-bold text-white hover:text-orange-600 hover:font-bold">Featured Cars</Link>
                            <a href="/inventory" className="font-bold text-white hover:text-orange-600 hover:font-bold">Inventory</a>
                            <a href="/contactus" className="font-bold text-white hover:text-orange-600 hover:font-bold">Contact Us</a>
                            <a href="/aboutus" className="font-bold text-white hover:text-orange-600 hover:font-bold">About Us</a>
                        </div>
                    </div>
                    <div className="hidden md:flex space-x-4">
                        <div className="flex space-x-6">
                            <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-500 hover:bg-orange-600 transition duration-200 text-sm font-bold">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-500 hover:bg-orange-600 transition duration-200 text-sm font-bold">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-500 hover:bg-orange-600 transition duration-200 text-sm font-bold">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-500 hover:bg-orange-600 transition duration-200 text-sm font-bold">
                                <MessageCircle size={20} />
                            </a>
                            <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-500 hover:bg-orange-600 transition duration-200 text-sm font-bold">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="bg-gray-500 hover:bg-orange-600 transition duration-200 text-white p-2 focus:outline-none">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="mt-4 md:hidden">
                        <div className="flex justify-center space-x-4 mb-4">
                            <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-500 hover:bg-orange-600 transition duration-200 text-sm font-bold">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-500 hover:bg-orange-600 transition duration-200 text-sm font-bold">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-500 hover:bg-orange-600 transition duration-200 text-sm font-bold">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-500 hover:bg-orange-600 transition duration-200 text-sm font-bold">
                                <MessageCircle size={20} />
                            </a>
                            <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-500 hover:bg-orange-600 transition duration-200 text-sm font-bold">
                                <Linkedin size={20} />
                            </a>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Link to="/#FeaturedCars" className="font-bold text-white hover:text-orange-600 hover:font-bold">Home</Link>
                            <Link to="/inventory" className="font-bold text-white hover:text-orange-600 hover:font-bold">Inventory</Link>
                            <Link to="/contactus" className="font-bold text-white hover:text-orange-600 hover:font-bold">Contact Us</Link>
                            <Link to="/aboutus" className="font-bold text-white hover:text-orange-600 hover:font-bold">About Us</Link>
                        </div>
                    </div>
                )}
            </div>
        </nav >
    );
};

export default Navbar;