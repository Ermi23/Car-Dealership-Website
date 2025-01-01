import React, { useEffect, useState } from 'react';
import { Calendar, GitFork, Car } from 'lucide-react';
import { motion } from 'framer-motion';
import apiClient from '../../../api/axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead

interface CarImage {
    is_primary: boolean;
    image_url: string;
}

interface Transmission {
    name: string;
}

interface CarData {
    id: number;
    name: string;
    car_images: CarImage[];
    transmission: Transmission;
    year: number;
    mileage: number;
    price: number;
}

interface InventoryCarsProps {
    title?: string;
    filters: {
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
        page: number; // Add page to filters
    };
}

const FeaturedCars: React.FC<InventoryCarsProps> = ({ title = 'Top Picks', filters }) => {

    const [cars, setCars] = useState<CarData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [paginationMeta, setPaginationMeta] = useState<any>(null);
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    // Add currentPage state
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        const fetchCars = async () => {
            setLoading(true);
            try {
                const response = await apiClient.get('/featured-cars', { params: { ...filters, page: currentPage } });
                const data = response.data;
                const cleanedCars = data.data.map((car: any) => ({
                    ...car,
                    image: car.car_images.find((img: CarImage) => img.is_primary)?.image_url.replace(/\\\//g, '/')
                }));
                setCars(cleanedCars);
                setPaginationMeta(data.meta);
            } catch (error) {
                console.error('Error fetching cars:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, [filters, currentPage]); // Re-fetch when filters or currentPage change

    const handlePageChange = (url: string) => {
        const pageParam = new URL(url).searchParams.get('page');
        if (pageParam) {
            setCurrentPage(Number(pageParam)); // Update the current page
        }
    };

    // const handleViewDetails = async (carId: number) => {
    //     try {
    //         const response = await apiClient.get(`/car-detail/${carId}`);
    //         // Navigate to the car detail page
    //         navigate(`/car-detail/${carId}`); // Use navigate instead of history.push
    //     } catch (error) {
    //         console.error('Error fetching car details:', error);
    //         // Handle error (e.g., show a notification)
    //     }
    // };

    const handleViewDetails = async (carId: number) => {
        try {
            console.log('Attempting to fetch car details...');
            const response = await apiClient.get(`/car-detail/${carId}`);
            console.log('Response received:', response);

            if (response?.data?.message === 'Unauthenticated.') {
                console.log('Unauthenticated. Redirecting to login page.');
                navigate('/login');
            } else {
                navigate(`/car-detail/${carId}`); // Navigate to the car detail page
            }
        } catch (error: any) {
            console.error('Error fetching car details:', error);

            if (error?.response?.status === 401 || error?.response?.data?.message === 'Unauthenticated.') {
                console.log('Error indicates unauthentication. Redirecting to login page.');
                navigate('/login');
            } else {
                // Handle other types of errors (e.g., show a notification)
                console.error('Unexpected error:', error);
            }
        }
    };

    const renderPagination = () => {
        if (!paginationMeta) return null;

        return (
            <nav className="flex justify-center mt-8" aria-label="Pagination">
                <ul className="inline-flex items-center -space-x-px">
                    {paginationMeta.links.map((link: any, index: number) => (
                        <li key={index}>
                            <button
                                onClick={() => link.url && handlePageChange(link.url)}
                                className={`px-3 py-2 leading-tight ${link.active
                                    ? 'z-10 bg-orange-600 text-white border border-orange-600'
                                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                                    } ${index === 0 ? 'rounded-l-lg' : ''} ${index === paginationMeta.links.length - 1 ? 'rounded-r-lg' : ''
                                    }`}
                                disabled={!link.url}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        </li>
                    ))}
                </ul>
            </nav>
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-600"></div>
            </div>
        );
    }
    return (
        <section id="FeaturedCars" className="py-12 mt-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <motion.h2
                    className="text-3xl font-bold text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {title}
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cars.map((car, index) => (
                        <motion.div
                            key={car.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={car.car_images.find((img: CarImage) => img.is_primary)?.image_url.replace(/\\\//g, '/')}
                                    alt={car.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">{car.name}</h3>
                                <div className="flex flex-wrap gap-4 mb-4 text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-sm">{car.year}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <GitFork className="w-4 h-4" />
                                        <span className="text-sm">{car.mileage.toLocaleString()} km</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Car className="w-4 h-4" />
                                        <span className="text-sm">{car.transmission.name}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div className="text-orange-600 font-semibold">
                                        ${car.price.toLocaleString()}
                                    </div>
                                    <button
                                        onClick={() => handleViewDetails(car.id)} // Add onClick handler
                                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-300"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {renderPagination()}
            </div>
        </section>
    );
};

export default FeaturedCars;