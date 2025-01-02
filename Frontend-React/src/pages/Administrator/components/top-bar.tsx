import React, { useState } from 'react';
import { Bell } from 'lucide-react';

export default function TopBar({ children }: { children?: React.ReactNode }) {
    const [notifications] = useState([
        { id: 1, message: 'New user registered' },
        { id: 2, message: 'New car added' },
    ]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const username = 'John Doe';

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    };

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b-1 border-gray-200">
            {children}
            <h1 className="text-xl font-semibold text-gray-800">Solomon Auto-Sell</h1>
            <div className="flex items-center relative">
                <div className="mr-4">
                    <Bell className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer" onClick={toggleNotifications} />
                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg z-10">
                            <div className="p-2 font-semibold">Notifications</div>
                            <div className="border-t border-gray-200"></div>
                            {notifications.map((notification) => (
                                <div key={notification.id} className="p-2 hover:bg-gray-100 cursor-pointer">
                                    {notification.message}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div>
                    <div className="flex items-center cursor-pointer" onClick={toggleProfileMenu}>
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white">{username.charAt(0)}</div>
                    </div>
                    {showProfileMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg z-10">
                            <div className="p-2 font-semibold">{username}</div>
                            <div className="border-t border-gray-200"></div>
                            <div className="p-2 hover:bg-gray-100 cursor-pointer">Profile</div>
                            <div className="p-2 hover:bg-gray-100 cursor-pointer">Settings</div>
                            <div className="p-2 hover:bg-gray-100 cursor-pointer">Logout</div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}