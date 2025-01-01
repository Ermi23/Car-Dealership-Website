import React, { useState } from 'react';
import apiClient from '../../../api/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            setLoading(true);
            const response = await apiClient.post('/contact-us', formData);
            // Reset form
            setFormData({ name: '', email: '', subject: '', message: '' });
            // Show success toast
            toast.success(response.data.message);
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Failed to send message. Please try again later.');
        } finally {
            setLoading(false);
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-600"></div>
            </div>
        );
    }

    return (
        <div className="bg-white/20 shadow-md rounded-lg p-8">
            <ToastContainer />
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-gray-900">Send us a Message</h2>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-100 mb-1">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                            placeholder="Your Name"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-100 mb-1">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                            placeholder="your.email@example.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-100 mb-1">Subject</label>
                        <input
                            id="subject"
                            name="subject"
                            type="text"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                            placeholder="Message Subject"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-100 mb-1">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out resize-y"
                            placeholder="Your message here..."
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`mt-8 w-full bg-orange-600/20 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition duration-200 ease-in-out ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                        </span>
                    ) : (
                        'Send Message'
                    )}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;