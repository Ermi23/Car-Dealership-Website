'use client'

import { Link } from 'react-router-dom';
import { usePathname } from 'next/navigation'
import { Home, Users, Car } from 'lucide-react'

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Users', href: '/users', icon: Users },
    { name: 'Cars', href: '/cars', icon: Car },
]

interface SidebarProps {
    isOpen: boolean
}

export default function Sidebar({ isOpen }: SidebarProps) {
    const pathname = usePathname()

    return (
        <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
            <div className="flex items-center justify-center h-20 shadow-md">
                <h1 className="text-3xl font-bold text-white">Admin</h1>
            </div>
            <ul className="flex flex-col py-4">
                {navItems.map((item) => (
                    <li key={item.name}>
                        <Link to={item.href}
                            className={`flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-white ${pathname === item.href ? 'bg-gray-700 text-white' : ''
                                }`}>
                            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                                <item.icon className="h-5 w-5" />
                            </span>
                            <span className="text-sm font-medium">{item.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

