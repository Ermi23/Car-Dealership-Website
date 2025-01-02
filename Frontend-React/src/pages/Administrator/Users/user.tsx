import { useState, useEffect } from 'react';
import Layout from '../components/layout';
import apiClient from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// toast.configure();

interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [paginationMeta, setPaginationMeta] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [deletMondal, setDeletMondal] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        id: 0,
        name: '',
        email: '',
        password: '',
        confirm_password: '',
    });
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get('/users', { params: { page: currentPage } });
            setUsers(response.data.data);
            setPaginationMeta(response.data.meta);
        } catch (error: any) {
            console.error('Error fetching users:', error);
            if (error?.response?.status === 401) {
                navigate('/login');
            } else {
                toast.error('Failed to fetch users. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isEdit = currentUser.id !== 0;
        const endpoint = isEdit ? `/users/${currentUser.id}` : '/users';
        const method = isEdit ? 'put' : 'post';

        try {
            const response = await apiClient[method](endpoint, {
                name: currentUser.name,
                email: currentUser.email,
                password: currentUser.password,
                password_confirmation: currentUser.confirm_password,
            });

            toast.success(`User ${isEdit ? 'updated' : 'added'} successfully!`);
            fetchUsers();
            setIsOpen(false);
            setDeletMondal(false);
        } catch (error: any) {
            console.error(`Error ${isEdit ? 'updating' : 'adding'} user:`, error);
            if (error?.response?.status === 401 || error?.response?.data?.message === 'Unauthenticated.') {
                navigate('/login');
            } else {
                toast.error(error.response.data.message);
            }
        }
    };

    const handleDeletSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const endpoint = `/users/${currentUser.id}`;
        const method = 'delete';

        try {
            const response = await apiClient[method](endpoint);

            setDeletMondal(false);
        } catch (error: any) {
            console.error(`Error user:`, error);
            if (error?.response?.status === 401 || error?.response?.data?.message === 'Unauthenticated.') {
                navigate('/login');
            } else {
                toast.error(error.response.data.message);
            }
        }
    };

    const renderModal = () => (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded shadow-lg w-full max-w-md p-6">
                <h3 className="text-xl font-bold mb-4">
                    {currentUser.id === 0 ? 'Add User' : 'Edit User'}
                </h3>
                <br></br>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium">
                                User Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={currentUser.name}
                                onChange={(e) =>
                                    setCurrentUser({ ...currentUser, name: e.target.value })
                                }
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={currentUser.email}
                                onChange={(e) =>
                                    setCurrentUser({ ...currentUser, email: e.target.value })
                                }
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={currentUser.password}
                                onChange={(e) =>
                                    setCurrentUser({ ...currentUser, password: e.target.value })
                                }
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                                required={!currentUser.id}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirm_password" className="block text-sm font-medium">
                                Confirm Password
                            </label>
                            <input
                                id="confirm_password"
                                type="password"
                                value={currentUser.confirm_password}
                                onChange={(e) =>
                                    setCurrentUser({ ...currentUser, confirm_password: e.target.value })
                                }
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                                required={!currentUser.id}
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                            type="button"
                            className="py-2 px-4 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    const renderDeleteModal = () => (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded shadow-lg w-full max-w-md p-6">
                <h3 className="text-xl font-bold mb-4"> Delete User </h3>
                <br></br>
                <form onSubmit={handleDeletSubmit}>
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
            setCurrentPage(Number(pageParam)); // Update the current page
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
        <Layout>
            <div className="container mx-auto px-4 py-6">

                <div className="w-full overflow-x-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold tracking-tight">Users</h2>
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Search Users"
                                className="border border-gray-300 rounded py-2 px-4 mr-4 ml-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <button
                                className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 whitespace-nowrap"
                                onClick={() => {
                                    setIsOpen(true);
                                    setCurrentUser({ id: 0, name: '', email: '', password: '', confirm_password: '' });
                                }}
                            >
                                Add User
                            </button>
                        </div>
                    </div>

                    {isOpen && renderModal()}
                    {deletMondal && renderDeleteModal()}
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2 items-center">Name</th>
                                <th className="border border-gray-300 px-4 py-2 items-center">Email</th>
                                <th className="border border-gray-300 px-4 py-2 items-center">Created At</th>
                                <th className="border border-gray-300 px-4 py-2 items-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2 items-center">{user.name}</td>
                                    <td className="border border-gray-300 px-4 py-2 items-center">{user.email}</td>
                                    <td className="border border-gray-300 px-4 py-2 items-center">{user.created_at}</td>
                                    <td className="border border-gray-300 px-4 py-2 items-center">
                                        <button
                                            className="text-blue-700 hover:underline mr-2 items-center"
                                            onClick={() => {
                                                setIsOpen(true);
                                                setCurrentUser({
                                                    id: user.id,
                                                    name: user.name,
                                                    email: user.email,
                                                    password: '',
                                                    confirm_password: '',
                                                });
                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="text-red-500 hover:underline mr-2 items-center"
                                            onClick={() => {
                                                setDeletMondal(true);
                                                setCurrentUser({
                                                    id: user.id,
                                                    name: user.name,
                                                    email: user.email,
                                                    password: '',
                                                    confirm_password: '',
                                                });
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {renderPagination()}
            </div>
        </Layout>
    );
}
