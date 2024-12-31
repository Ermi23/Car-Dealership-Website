'use client'

import React from 'react'
import { MessageCircle, Car, Zap, CarFront, Truck, CarTaxiFront } from 'lucide-react'
import { motion } from 'framer-motion'
// import imageSrc from '.../assets/pexels-tdcat-70912.jpg'; // Adjust the path as necessary
import imageSrc from '../../assets/pexels-tdcat-70912.jpg';

interface VehicleCategory {
    icon: React.ReactNode
    label: string
    delay: number
}

const HeroSection: React.FC = () => {
    const categories: VehicleCategory[] = [
        { icon: <Car className="w-8 h-8" />, label: 'Sedan', delay: 0.1 },
        { icon: <Zap className="w-8 h-8" />, label: 'EV', delay: 0.2 },
        { icon: <CarFront className="w-8 h-8" />, label: 'SUV', delay: 0.3 },
        { icon: <Truck className="w-8 h-8" />, label: 'Pickup', delay: 0.4 },
        { icon: <CarTaxiFront className="w-8 h-8" />, label: 'Hatchback', delay: 0.5 },
    ]

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            {/* <iframe
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="https://www.youtube-nocookie.com/embed/frGVWx3AdjE?autoplay=1&loop=1&playlist=frGVWx3AdjE&controls=0&rel=0&playsinline=1"
                title="Video Title"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{ pointerEvents: 'none' }}  // This disables user interactions
            ></iframe> */}
            <img
                src={imageSrc} // Use the imported image here
                alt="Solomon Auto-Sell"
                className="absolute top-0 left-0 w-full h-full object-cover" // Adjusted size and added rounded-full
            />

            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/70" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center mt-24">
                <motion.h2
                    className="text-4xl md:text-6xl font-bold text-white mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Find Your <span className="text-orange-500">Perfect</span> Car
                </motion.h2>

                <motion.p
                    className="text-xl md:text-2xl text-gray-300 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    United States Biggest car market us
                </motion.p>

                {/* Featured Categories */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: category.delay }}
                        >
                            <button
                                // variant="outline"
                                className="w-full h-24 flex flex-col items-center justify-center space-y-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/20 text-white transition-all"
                            >
                                {category.icon}
                                <span className="text-sm">{category.label}</span>
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Features */}
                <motion.div
                    className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                        <h3 className="text-xl font-semibold text-white mb-2">24/7 Support</h3>
                        <p className="text-gray-300">Expert assistance available around the clock</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                        <h3 className="text-xl font-semibold text-white mb-2">Verified Sellers</h3>
                        <p className="text-gray-300">All our sellers are thoroughly vetted</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                        <h3 className="text-xl font-semibold text-white mb-2">Secure Payments</h3>
                        <p className="text-gray-300">Safe and secure transaction process</p>
                    </div>
                </motion.div>

                {/* Chat button */}
                <motion.div
                    className="fixed bottom-8 left-8"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 1 }}
                >
                    <button
                        // size="lg"
                        className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-4"
                    >
                        <MessageCircle className="w-6 h-6" />
                    </button>
                </motion.div>
            </div>
        </div>
    )
}

export default HeroSection