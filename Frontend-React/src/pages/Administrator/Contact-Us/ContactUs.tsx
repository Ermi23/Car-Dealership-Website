import React, { useState, useEffect } from 'react';
import apiClient from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Pagination from '../components/pagination';
import { FolderOpen } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

interface ContactUs {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
}

export default function ContactUsPage() {
    const [contactus, setContactUs] = useState<ContactUs[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [paginationMeta, setPaginationMeta] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [deletMondal, setDeletMondal] = useState(false);
    const contactusPerPage = 10;
    const [currentContactUs, setCurrentContactUs] = useState({
        id: 0,
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        fetchContactUs();
    }, [currentPage]);

    const fetchContactUs = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get('/contact-us', { params: { page: currentPage } });
            setContactUs(response.data.data);
            setPaginationMeta(response.data.meta);
        } catch (error: any) {
            console.error('Error fetching contact us:', error);

            if (error?.response?.status === 401) {
                toast.error('Session expired. Please login again.');
                navigate('/login');
            } else if (error?.response?.data?.message?.includes('SQL')) {
                toast.error('An internal server error occurred. Please try again later.');
            } else {
                toast.error(error?.response?.data?.message || 'Failed to fetch Contact Us. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isEdit = currentContactUs.id !== 0;
        const endpoint = isEdit ? `/contact-us/${currentContactUs.id}` : '/contact-us';
        const method = isEdit ? 'put' : 'post';

        try {
            await apiClient[method](endpoint, {
                name: currentContactUs.name,
                message: currentContactUs.message,
                email: currentContactUs.email,
                subject: currentContactUs.subject,
            });

            toast.success(`FuelType ${isEdit ? 'updated' : 'created'} successfully!`, {
                position: "top-right",
                autoClose: 3000,
            });

            setTimeout(async () => {
                setIsOpen(false);
                setCurrentContactUs({ id: 0, name: '', message: '', email: '', subject: '' });
                await fetchContactUs();
            }, 1000);

        } catch (error: any) {
            console.error(`Error ${isEdit ? 'updating' : 'adding'} tansmission:`, error);

            if (error?.response?.status === 401) {
                toast.error('Session expired. Please login again.');
                navigate('/login');
            } else if (error?.response?.status === 422) {
                const validationErrors = error.response.data.errors;
                Object.values(validationErrors).forEach((errorMsg: any) => {
                    toast.error(errorMsg[0]);
                });
            } else if (error?.response?.data?.message?.includes('SQL')) {
                toast.error('An internal server error occurred. Please try again later.');
            } else {
                toast.error(error?.response?.data?.message || `Failed to ${isEdit ? 'update' : 'create'} brand name.`);
            }
        }
    };

    const handleDeleteSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await apiClient.delete(`/contact-us/${currentContactUs.id}`);

            toast.success('Contact deleted successfully!', {
                position: "top-right",
                autoClose: 3000,
            });

            setTimeout(async () => {
                setDeletMondal(false);
                setCurrentContactUs({ id: 0, name: '', email: '', subject: '', message: '' });

                const isLastItemOnPage = contactus.length === 1;
                const isNotFirstPage = currentPage > 1;

                if (isLastItemOnPage && isNotFirstPage) {
                    setCurrentPage(currentPage - 1);
                } else {
                    await fetchContactUs();
                }
            }, 1000);

        } catch (error: any) {
            console.error('Error deleting tansmission:', error);

            if (error?.response?.status === 401) {
                toast.error('Session expired. Please login again.');
                navigate('/login');
            } else if (error?.response?.data?.message?.includes('SQL')) {
                toast.error('An internal server error occurred. Please try again later.');
            } else {
                toast.error(error?.response?.data?.message || 'Failed to delete  contact us.');
            }
        }
    };

    const renderModal = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 m-4 relative transform transition-all">
                <h3 className="text-xl font-bold mb-4">
                    Contact Details
                </h3>

                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="px-3 bg-white text-gray-500 text-sm font-medium">
                            View Message
                        </span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Name</label>
                        <p className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-50">
                            {currentContactUs.name}
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Email</label>
                        <p className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-50">
                            {currentContactUs.email}
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Subject</label>
                        <p className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-50">
                            {currentContactUs.subject}
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Message</label>
                        <p className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-50 min-h-[100px] whitespace-pre-wrap">
                            {currentContactUs.message}
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        onClick={() => setIsOpen(false)}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );

    const renderDeleteModal = () => (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded shadow-lg w-full max-w-md p-6">
                <h3 className="text-xl font-bold mb-4"> Delete Contact </h3>

                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="px-3 bg-white text-gray-500 text-sm font-medium">
                            {'Delete Contact'}
                        </span>
                    </div>
                </div>

                <form onSubmit={handleDeleteSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium">
                                Are you shure you want to delete?
                            </label>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                            type="button"
                            className="py-2 px-4 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
                            onClick={() => setDeletMondal(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    const handlePageChange = (url: string) => {
        const pageParam = new URL(url).searchParams.get('page');
        if (pageParam) {
            const newPage = Number(pageParam);
            setCurrentPage(newPage);
        }
    };

    const renderEmptyState = () => (
        <div className="text-center py-12 px-4 bg-white rounded-lg">
            <FolderOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No Messages Found</h3>
            <p className="mt-2 text-sm text-gray-500">
                There are no contact messages at the moment.
            </p>
        </div>
    );

    const renderMobileCard = (contact: ContactUs, index: number) => (
        <div key={contact.id} className="bg-white p-4 rounded-lg shadow mb-4 border border-gray-200">
            <div className="space-y-3">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-medium text-gray-900">{contact.name}</p>
                        <p className="text-sm text-gray-500">{contact.email}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                        {new Date(contact.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </span>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-700">Subject:</p>
                    <p className="text-sm text-gray-900">{contact.subject}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-700">Message:</p>
                    <p className="text-sm text-gray-900 line-clamp-2">{contact.message}</p>
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                    <button
                        onClick={() => {
                            setIsOpen(true);
                            setCurrentContactUs(contact);
                        }}
                        className="inline-flex items-center px-3 py-1.5 bg-blue-50 border border-blue-300 
                        text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                    </button>
                    <button
                        onClick={() => {
                            setDeletMondal(true);
                            setCurrentContactUs(contact);
                        }}
                        className="inline-flex items-center px-3 py-1.5 bg-red-50 border border-red-300 
                        text-red-600 rounded-md text-sm font-medium hover:bg-red-100"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-gray-50 rounded-lg shadow-lg p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage and respond to contact form submissions
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-600"></div>
                    </div>
                ) : contactus.length === 0 ? (
                    renderEmptyState()
                ) : (
                    <>
                        <div className="hidden md:block overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">message</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contactus.map((contact, index) => (
                                        <tr key={contact.id} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {(currentPage - 1) * contactusPerPage + index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contact.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contact.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contact.subject}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contact.message}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {new Date(contact.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <div className="flex flex-wrap gap-2">
                                                    <button
                                                        className="inline-flex items-center px-3 py-1.5 bg-blue-50 border border-blue-300 text-blue-600 
                                                        rounded-md text-sm font-medium hover:bg-blue-100 transition-colors duration-200 
                                                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                        onClick={() => {
                                                            setIsOpen(true);
                                                            setCurrentContactUs({
                                                                id: contact.id,
                                                                name: contact.name,
                                                                email: contact.email,
                                                                subject: contact.subject,
                                                                message: contact.message,
                                                            });
                                                        }}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-4 w-4 mr-1.5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                            />
                                                        </svg>
                                                    </button>

                                                    <button
                                                        className="inline-flex items-center px-3 py-1.5 bg-red-50 border border-red-300 text-red-600 
                                                        rounded-md text-sm font-medium hover:bg-red-100 transition-colors duration-200
                                                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                        onClick={() => {
                                                            setDeletMondal(true);
                                                            setCurrentContactUs({
                                                                id: contact.id,
                                                                name: contact.name,
                                                                email: contact.email,
                                                                subject: contact.subject,
                                                                message: contact.message,
                                                            });
                                                        }}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="md:hidden space-y-4">
                            {contactus.map((contact, index) => renderMobileCard(contact, index))}
                        </div>

                        {contactus.length > 0 && (
                            <div className="mt-6">
                                <Pagination
                                    paginationMeta={paginationMeta}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        )}
                    </>
                )}

                {isOpen && renderModal()}
                {deletMondal && renderDeleteModal()}

                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick={true}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    limit={3}
                />
            </div>
        </div>
    );
}