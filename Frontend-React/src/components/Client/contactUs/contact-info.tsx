import React from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const ContactInfo: React.FC = () => {
    return (
        <div className="bg-white/20 shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="space-y-4">
                <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-orange-600 mr-4 mt-1" />
                    <div>
                        <h3 className="font-medium">Address</h3>
                        <p className="text-gray-100">123 Car Street, Addis Ababa, Ethiopia</p>
                    </div>
                </div>
                <div className="flex items-start">
                    <Phone className="w-6 h-6 text-orange-600 mr-4 mt-1" />
                    <div>
                        <h3 className="font-medium">Phone</h3>
                        <p className="text-gray-100">+251 11 234 5678</p>
                    </div>
                </div>
                <div className="flex items-start">
                    <Mail className="w-6 h-6 text-orange-600 mr-4 mt-1" />
                    <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-gray-100">info@ethiopiancarmarket.com</p>
                    </div>
                </div>
                <div className="flex items-start">
                    <Clock className="w-6 h-6 text-orange-600 mr-4 mt-1" />
                    <div>
                        <h3 className="font-medium">Business Hours</h3>
                        <p className="text-gray-100">Monday - Friday: 9am - 6pm</p>
                        <p className="text-gray-100">Saturday: 10am - 4pm</p>
                        <p className="text-gray-100">Sunday: Closed</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactInfo

