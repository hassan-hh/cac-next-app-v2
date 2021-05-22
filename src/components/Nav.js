import { useState, useEffect, useRef, useContext } from 'react'
import { StoreContext } from '../providers/StoreContext'
import Link from 'next/link'
import Cookies from 'js-cookie'

const Nav = ({loggedIn}) => {

    const { store, setStore }   = useContext(StoreContext)
    const [mobileMenu, setMobileMenu] = useState(false)
    const [userMenu, setUserMenu] = useState(false)
    const [dropDownMenu, setDropDownMenu] = useState(false)
    const container = useRef(null)

    // Allow for outside click - need to include nav bar ?
    useEffect(() => {
        const handleOutsideClick = e => {
            if (!container.current.contains(e.target)) {
            if(!userMenu && !dropDownMenu) return
                setUserMenu(false)
                setDropDownMenu(false)
            }
        }
        window.addEventListener("click", handleOutsideClick);
        return () => window.removeEventListener("click", handleOutsideClick);
    }, [userMenu, dropDownMenu, container])

   // Allow to use the `esc` key
    useEffect(() => {
        const handleEscape = e => {
        if (!userMenu && !dropDownMenu) return;
            if (e.key === "Escape") {
                setUserMenu(false)
                setDropDownMenu(false)
            }
        }
        document.addEventListener("keyup", handleEscape);
        return () => document.removeEventListener("keyup", handleEscape);
    }, [userMenu, dropDownMenu])

    const handleLogout = e => {
        e.preventDefault();
        localStorage.removeItem('emailAddress')
        localStorage.removeItem('idLogon')
        localStorage.removeItem('idLogonType')
        localStorage.removeItem('name')
        localStorage.removeItem('idAccount')
        //localStorage.removeItem('loggedIn')
        Cookies.remove('sessionId')
        //Cookies.remove('JSESSIONID') //we need to remove the cookie was generated by the api backend itself
        setStore({
            ...store,
            emailAddress: '',
            idLogon: '',
            idLogonType: '',
            name: '',
            idAccount: '',
            //loggedIn: '',
            sessionId: '',
            //JSESSIONID: '',
        })
        window.location.href = '/login'
        //setLoggedIn(false)
    }
    
    return (
        <div ref={container}>
            <nav style={{background: '#2bbc9c'}}>
                    <div className="w-full mx-auto px-2 sm:px-12 lg:px-12">
                    <div className="relative flex items-center justify-between h-16">
                        {!loggedIn ?
                            <h1 className="text-white text-3xl font-semibold ml-2 sm:-ml-2">CATS</h1>
                            :
                            <>
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    <button onClick={() => setMobileMenu(!mobileMenu)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded={mobileMenu}>
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
                                                <a  className="bg-gray-900 text-white transition-all ease-in-out duration-300 uppercase px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Dashboard</a>
                                            </Link>
                                            <Link href="/dashboard/file-browser">
                                                <a className="text-white hover:bg-gray-900 transition-all ease-in-out duration-300 uppercase px-3 py-2 rounded-md text-sm font-medium">File Browser</a>
                                            </Link>
                                            <div className="relative inline-block text-left">
                                                <div>
                                                    <button onClick={() => setDropDownMenu(!dropDownMenu)} type="button" className={`${dropDownMenu ? 'bg-gray-900' : ''} transition-all ease-in-out duration-300 uppercase inline-flex justify-center px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-900 focus:outline-none`} id="drop-menu" aria-expanded={dropDownMenu} aria-haspopup="true">
                                                    Admin
                                                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                    </button>
                                                </div>
                                                <div className={`${dropDownMenu ? 'opacity-100 z-40' : 'opacity-0'} bg-white transition-all ease-in-out duration-300 origin-top-right absolute right-0 mt-2 w-52 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-0`}
                                                    role="menu"
                                                    aria-orientation="vertical"
                                                    aria-labelledby="drop-menu"
                                                >
                                                    <div className="py-1" role="none" onClick={() => setDropDownMenu(false)}>
                                                        <Link href="/dashboard/account-management">
                                                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                                                                role="menuitem">
                                                                Account Management
                                                            </a>
                                                        </Link>
                                                        <Link href="/dashboard/installation-properties">
                                                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                                                                role="menuitem">
                                                                Installation Properties
                                                            </a>
                                                        </Link>
                                                        <Link href="/dashboard/metrics">
                                                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                                                                role="menuitem">
                                                                Metrics
                                                            </a>
                                                        </Link>
                                                        <Link href="/dashboard/rule-sets">
                                                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                                                                role="menuitem">
                                                                Rule Sets
                                                            </a>
                                                        </Link>
                                                        <Link href="/dashboard/data-message-definitions">
                                                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                                                                role="menuitem">
                                                                Data Message Definitions
                                                            </a>
                                                        </Link>
                                                        <Link href="/dashboard/support">
                                                            <a 
                                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                                                                role="menuitem">
                                                                Support Dashboard
                                                            </a>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
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
                                        <button onClick={() => setUserMenu(!userMenu)} type="button" className={`${userMenu ? 'bg-gray-900' : ''} transition-all ease-in-out duration-300 hover:bg-gray-900 hover:text-white py-4 px-2 w-44 flex items-center justify-between flex-row text-xs focus:outline-none`} id="user-menu" aria-expanded={userMenu} aria-haspopup="true">
                                            <span className="sr-only">Open user menu</span>
                                            <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                                            <p className="text-white uppercase text-left w-24">Welcome, Cats Support</p>
                                            <svg className="-ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" aria-hidden="true">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div
                                        onClick={() => setUserMenu(false)}
                                        className={`${userMenu ? 'opacity-100 z-40' : 'opacity-0'} bg-white transition-all ease-in-out duration-300 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-0`} 
                                        role="menu" 
                                        aria-orientation="vertical" 
                                        aria-labelledby="user-menu"
                                    >
                                        <Link href="/dashboard/profile">
                                            <a 
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                                                role="menuitem"
                                            >
                                                Your Profile
                                            </a>
                                        </Link>
                                        <Link href="/dashboard/client">
                                            <a 
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                                                role="menuitem"
                                            >
                                                Client Download
                                            </a>
                                        </Link>
                                        <form method="POST" action="#" role="none">
                                            <button type="submit" onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                                Sign out
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </>
                        }
                        </div>
                </div>
                { loggedIn ?
                    <div className={`${mobileMenu ? 'h-48' : 'h-0'} transition-all ease-in-out duration-300 sm:hidden`} id="mobile-menu">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <a href="#" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Dashboard</a>
                            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Team</a>
                            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>
                            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Calendar</a>
                        </div>
                    </div>
                    :
                    ''
                }
            </nav>
        </div>
    )
}
export default Nav