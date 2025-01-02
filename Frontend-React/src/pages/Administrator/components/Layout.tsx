import React, { useState, useEffect, useCallback } from 'react'
import Sidebar from './sidebar'
import TopBar from './top-bar'
import { Menu } from 'lucide-react'

export default function Layout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

    const closeSidebarOnMobile = useCallback(() => {
        if (window.innerWidth < 768) {
            setSidebarOpen(false)
        }
    }, [])

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768)
            setSidebarOpen(window.innerWidth >= 768)
        }

        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)

        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    const toggleSidebar = useCallback(() => {
        setSidebarOpen(prev => !prev)
    }, [])

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar isOpen={sidebarOpen} closeSidebarOnMobile={closeSidebarOnMobile} />
            <div className="flex flex-col flex-1 overflow-hidden">
                <TopBar>
                    <button
                        className="md:hidden"
                        onClick={toggleSidebar}
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </TopBar>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100" onClick={closeSidebarOnMobile}>
                    <div className="container mx-auto px-6 py-8">
                        {children}
                    </div>
                </main>
            </div>
            <button
                className={`fixed bottom-4 ${sidebarOpen ? 'left-64' : 'left-4'} z-50 rounded-full shadow-md transition-all duration-300 ease-in-out hidden md:flex`}
                onClick={toggleSidebar}
            >
                {sidebarOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                )}
            </button>
        </div>
    )
}



