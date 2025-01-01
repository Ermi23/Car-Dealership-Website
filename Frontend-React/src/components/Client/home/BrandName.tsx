import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiClient from '../../../api/axios';

interface BrandName {
    id: number;
    name: string;
    description: string;
}

interface PaginatedResponse {
    current_page: number;
    data: BrandName[];
    last_page: number;
    total: number;
}

const BrandNames: React.FC = () => {
    const [brandNames, setBrandNames] = useState<BrandName[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        const fetchBrandNames = async () => {
            try {
                const response = await apiClient.get(`/brand-names?page=${currentPage}`);
                const data: PaginatedResponse = response.data;
                setBrandNames(data.data);
                setTotalPages(data.last_page);
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    console.error('Error fetching brand names:', error.response?.data || error.message);
                } else {
                    console.error('Unexpected error:', error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBrandNames();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Brand Names</h1>
            <ul>
                {brandNames.map((brand) => (
                    <li key={brand.id}>
                        {brand.name} - {brand.description}
                    </li>
                ))}
            </ul>
            <div>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span> Page {currentPage} of {totalPages} </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default BrandNames;