import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from '../styles/Nav.module.css'

const Nav = () => {

    const [mobileMenu, setMobileMenu] = useState(false)
    const [userMenu, setUserMenu] = useState(false)
    const [dropDownMenu, setDropDownMenu] = useState(false)
    const container = useRef(null)

    const handleMobileMenu = () => {
        setMobileMenu(!mobileMenu)
    }
    const handleUserMenu = () => {
        setUserMenu(!userMenu)
    }
    const handleDropDownMenu = () => {
        setDropDownMenu(!dropDownMenu)
    }

    // Allow for outside click - need to include nav bar ?
    useEffect(() => {
        const handleOutsideClick = e => {
            if (!container.current.contains(e.target)) {
            if(!userMenu) return
            setUserMenu(false)
            }
        }
        window.addEventListener("click", handleOutsideClick);
        return () => window.removeEventListener("click", handleOutsideClick);
    }, [userMenu, container])

   // Allow to use the `esc` key
    useEffect(() => {
        const handleEscape = e => {
        if (!userMenu) return;
            if (e.key === "Escape") {
                setUserMenu(false)
            }
        }
        document.addEventListener("keyup", handleEscape);
        return () => document.removeEventListener("keyup", handleEscape);
    }, [userMenu])
    
    return (
        <div ref={container}>
            <nav className={styles.customGreen}>
                <div className="w-full mx-auto px-2 sm:px-12 lg:px-12">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button onClick={handleMobileMenu} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            {/* <div className="flex-shrink-0 flex items-center">
                            <img className="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow"/>
                            <img className="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow"/>
                            </div> WORKFLOW LOGO */}
                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex space-x-4">
                                    <Link href="/dashboard">
                                        <a  className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Dashboard</a>
                                    </Link>
                                    <Link href="/dashboard/help">
                                        <a className="text-white hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Help</a>
                                    </Link>
                                </div>
                            </div>
                            <div className="ml-3 relative">
                                <a href="#" onClick={handleDropDownMenu} className="flex text-white hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    id="drop-menu" aria-expanded={dropDownMenu} aria-haspopup="true"
                                >
                                    Admin
                                </a>
                                <div 
                                    className={`${dropDownMenu ? 'block opacity-100' : ''} bg-white opacity-0 transition-all ease-in-out duration-300 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-30`} 
                                    role="menu" 
                                    aria-orientation="vertical" 
                                    aria-labelledby="drop-menu"
                                >
                                    <Link href="/dashboard/support">
                                        <a 
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                                            role="menuitem">
                                            support
                                        </a>
                                    </Link>
                                    <Link href="/dashboard/installation-properties">
                                        <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                                            role="menuitem">
                                            Installation Properties
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">View notifications</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button> NOTIFICATION ICON */}
                        <div className="ml-3 relative">
                            <div>
                                <button onClick={handleUserMenu} type="button" className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-expanded={userMenu} aria-haspopup="true">
                                <span className="sr-only">Open user menu</span>
                                <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                                </button>
                            </div>
                            <div 
                                className={`${userMenu ? 'block opacity-100' : ''} bg-white opacity-0 transition-all ease-in-out duration-300 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-30`} 
                                role="menu" 
                                aria-orientation="vertical" 
                                aria-labelledby="user-menu"
                            >
                                <a 
                                    href="#" 
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                                    role="menuitem"
                                >
                                    Your Profile
                                </a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${mobileMenu ? 'opacity-100 h-full block' : 'h-0'} opacity-0 transition-all ease-in-out duration-300 sm:hidden`} id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <a href="#" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Dashboard</a>
                        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Team</a>
                        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>
                        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Calendar</a>
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default Nav