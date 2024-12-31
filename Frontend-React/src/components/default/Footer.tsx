import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import imageSrc from '../../assets/image.png';
import { Phone, Mail, MapPin } from 'lucide-react'; // Import icons

const Footer: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Newsletter signup:', email);
        setEmail('');
    };

    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    {/* Logo and Company Info */}
                    <div className="col-span-1">
                        <img
                            src={imageSrc}
                            alt="Company Logo"
                            className="mb-4 w-32 h-32 rounded-full object-cover"
                        />
                        <p className="text-sm mb-4">Your trusted partner in innovation and excellence.</p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-blue-400"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-blue-400"><Twitter size={20} /></a>
                            <a href="#" className="hover:text-blue-400"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-blue-400"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="hover:text-blue-400">Home</a></li>
                            <li><a href="/aboutus" className="hover:text-blue-400">About Us</a></li>
                            <li><a href="/inventory" className="hover:text-blue-400">Inventory</a></li>
                            <li><a href="/contactus" className="hover:text-blue-400">Contact</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="col-span-1">
                        <h3 className="text-lg font-semibold mb-4">Our Services</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-blue-400">New Car Sales</a></li>
                            <li><a href="#" className="hover:text-blue-400">Used Car Sales</a></li>
                            <li><a href="#" className="hover:text-blue-400">Trade-In Services</a></li>
                            <li><a href="#" className="hover:text-blue-400">Special Offers and Promotions</a></li>
                        </ul>
                    </div>

                    {/* Get in Touch */}
                    <div className="col-span-1">
                        <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <Phone className="mr-2" size={20} /> +1-423-456-788
                            </li>
                            <li className="flex items-center">
                                <Phone className="mr-2" size={20} /> +1-098-765-432
                            </li>
                            <li className="flex items-center">
                                <Mail className="mr-2" size={20} /> solomon@gmail.com
                            </li>
                            <li className="flex items-center">
                                <MapPin className="mr-2" size={20} /> Texas, United States
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Signup */}
                    <div className="col-span-1">
                        <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
                        <p className="text-sm mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center">
                    <p>&copy; {new Date().getFullYear()} Solomon Auto Sell. All rights reserved.</p>
                    <div className="mt-2 space-x-4">
                        <a href="/privacy-policy" className="hover:text-blue-400">Privacy Policy</a>
                        <a href="/terms-of-service" className="hover:text-blue-400">Terms of Service</a>

                        <a
                            href="https://www.linkedin.com/in/ermias-tadesse-3669a0248/"
                            className="hover:text-blue-400"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Developed by Ermias
                        </a>

                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;