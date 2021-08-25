import { useState, useEffect, useRef, useContext } from 'react'
import { StoreContext } from '../providers/StoreContext'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'


const Nav = ({ loggedIn }) => {
    
    const router = useRouter()
    const container = useRef(null)
    const { setLoggedIn, setLoadingScreen, profileImage, store, setStore }   = useContext(StoreContext)
    const [mobileMenu, setMobileMenu] = useState(false)
    const [userMenu, setUserMenu] = useState(false)
    const [dropDownMenu, setDropDownMenu] = useState(false)

    console.log('container', container)
    useEffect(() => {
        const handleOutsideClick = () => {
            if (!container.current || container.current) { //container.current.contains(e.target) //error Cannot read the property 'contains' of null
                if (!userMenu && !dropDownMenu)
                return
                    setUserMenu(false)
                    setDropDownMenu(false)
            }
        }
        window.addEventListener("click", handleOutsideClick)
        return () => window.removeEventListener("click", handleOutsideClick)
    }, [userMenu, dropDownMenu, container])

   // Allow to use the `esc` key
    useEffect(() => {
        const handleEscape = e => {
            if (!userMenu && !dropDownMenu)
            return
            if (e.key === "Escape") {
                setUserMenu(false)
                setDropDownMenu(false)
            }
        }
        document.addEventListener("keyup", handleEscape)
        return () => document.removeEventListener("keyup", handleEscape)
    }, [userMenu, dropDownMenu])

    const handleLogout = e => {
        e.preventDefault();
        localStorage.removeItem('emailAddress')
        localStorage.removeItem('idLogon')
        localStorage.removeItem('idLogonType')
        localStorage.removeItem('name')
        localStorage.removeItem('idAccount')
        //localStorage.removeItem('loggedIn')
        //localStorage.removeItem('sessionId')
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
        //window.location.href = '/login'
        setLoadingScreen(true)
        setLoggedIn(false)
        //router.push('/login') //removed because of new way of auth -- 23/08/2021
        router.push(router.asPath) //after new auth - this line will keep user on the same page once logout
    }

    // useEffect(() => {
    //     // if (!store.sessionId && router.pathname === '/dashboard') {
    //     //     router.push('/login')
    //     //     setLoggedIn(false)
    //     //     setLoadingScreen(true)
    //     // }
    //     if (!store.sessionId && router.pathname === '/login') { //if no sessionId and i am leaving the dahsboard page or i am in login page
    //         setLoggedIn(false)
    //         setLoadingScreen(false)
    //     }
    // }, [store.sessionId])
    
    return (
        <header ref={container}>
            <nav style={{background: '#2bbc9c'}}>
                    <div className="w-full mx-auto px-2 sm:px-12 lg:px-12">
                    <div className="relative flex items-center justify-between h-16">
                        {!loggedIn ?
                            <h1 className="text-white text-3xl font-semibold ml-2 sm:-ml-2">CATS</h1>
                            :
                            <>
                                <div className="absolute flex items-center justify-center sm:hidden w-full inset-0">
                                    <button onClick={() => setMobileMenu(!mobileMenu)} type="button" className="inline-flex items-center justify-center focus:outline-none p-2" aria-controls="mobile-menu" aria-expanded={mobileMenu}>
                                        <span className="sr-only">Open main menu</span>
                                        <img alt="mobile icon" className="block" src="/mobileHamberg.svg" />
                                    </button>
                                </div>
                                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="hidden sm:block sm:ml-6">
                                        <div style={{width: '22rem'}} className="flex items-center justify-around">
                                            <Link href="/dashboard">
                                                <a
                                                    className={`${router.pathname == '/dashboard' ? `bg-gray-900` : 'bg-transparent'}  text-white hover:bg-gray-900 transition-all ease-in-out duration-300 uppercase px-3 py-2 rounded-md text-sm font-medium`}
                                                >
                                                    Dashboard
                                                </a>
                                            </Link>
                                            <Link href="/dashboard/file-browser">
                                                <a
                                                    className={`${router.pathname == '/dashboard/file-browser' ? `bg-gray-900` : 'bg-transparent'} text-white hover:bg-gray-900 transition-all ease-in-out duration-300 uppercase px-3 py-2 rounded-md text-sm font-medium`}
                                                >
                                                    File Browser
                                                </a>
                                            </Link>
                                            <div className="relative inline-block text-left">
                                                <div>
                                                    <button onClick={() => { setDropDownMenu(!dropDownMenu)}} type="button" className={`transition-all ease-in-out duration-300 uppercase inline-flex justify-center px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-900 focus:outline-none`} id="drop-menu" aria-expanded={dropDownMenu} aria-haspopup="true">
                                                    Admin
                                                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                    </button>
                                                </div>
                                                <div className={`${dropDownMenu ? 'opacity-100 z-40' : 'opacity-0'} bg-white transition-all ease-in-out duration-300 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-0`}
                                                    role="menu"
                                                    aria-orientation="vertical"
                                                    aria-labelledby="drop-menu"
                                                >
                                                    <div className="py-1" role="none" onClick={() => setDropDownMenu(false)}>
                                                        <Link href="/dashboard/account-management">
                                                            <a
                                                                className={`${router.pathname == '/dashboard/account-management' ? `bg-gray-900 text-white hover:bg-gray-900` : 'bg-transparent text-gray-700 hover:text-gray-700 hover:bg-gray-100'} block mx-2 my-1 rounded-md px-4 py-2 text-sm`}
                                                                role="menuitem"
                                                            >
                                                                Account Management
                                                            </a>
                                                        </Link>
                                                        <Link href="/dashboard/installation-properties">
                                                            <a className={`${router.pathname == '/dashboard/installation-properties' ? `bg-gray-900 text-white hover:bg-gray-900` : 'bg-transparent text-gray-700 hover:text-gray-700 hover:bg-gray-100'} block mx-2 my-1 rounded-md px-4 py-2 text-sm`} 
                                                                role="menuitem"
                                                            >
                                                                Installation Properties
                                                            </a>
                                                        </Link>
                                                        <Link href="/dashboard/metrics">
                                                            <a className={`${router.pathname == '/dashboard/metrics' ? `bg-gray-900 text-white hover:bg-gray-900` : 'bg-transparent text-gray-700 hover:text-gray-700 hover:bg-gray-100'} block mx-2 my-1 rounded-md px-4 py-2 text-sm`} 
                                                                role="menuitem"
                                                            >
                                                                Metrics
                                                            </a>
                                                        </Link>
                                                        <Link href="/dashboard/rule-sets">
                                                            <a className={`${router.pathname == '/dashboard/rulte-sets' ? `bg-gray-900 text-white hover:bg-gray-900` : 'bg-transparent text-gray-700 hover:text-gray-700 hover:bg-gray-100'} block mx-2 my-1 rounded-md px-4 py-2 text-sm`} 
                                                                role="menuitem"
                                                            >
                                                                Rule Sets
                                                            </a>
                                                        </Link>
                                                        <Link href="/dashboard/data-message-definitions">
                                                            <a className={`${router.pathname == '/dashboard/data-message-definitions' ? `bg-gray-900 text-white hover:bg-gray-900` : 'bg-transparent text-gray-700 hover:text-gray-700 hover:bg-gray-100'} block mx-2 my-1 rounded-md px-4 py-2 text-sm`}
                                                                role="menuitem"
                                                            >
                                                                Data Message Definitions
                                                            </a>
                                                        </Link>
                                                        <Link href="/dashboard/support">
                                                            <a 
                                                                className={`${router.pathname == '/dashboard/support' ? `bg-gray-900 text-white hover:bg-gray-900` : 'bg-transparent text-gray-700 hover:text-gray-700 hover:bg-gray-100'} block mx-2 my-1 rounded-md px-4 py-2 text-sm`} 
                                                                role="menuitem"
                                                            >
                                                                Support Dashboard
                                                            </a>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-3 relative">
                                    <div>
                                        <button onClick={() => setUserMenu(!userMenu)} type="button" className={`${userMenu ? 'sm:bg-gray-900' : ''} transition-all ease-in-out duration-300 sm:hover:bg-gray-900 hover:text-white py-4 px-2 w-full sm:w-44 flex items-center justify-between flex-row text-xs focus:outline-none border-0`} id="user-menu" aria-expanded={userMenu} aria-haspopup="true">
                                            <span className="sr-only">Open user menu</span>
                                            <img alt="User Photo" className="w-8 h-auto" src={`${profileImage || '/user.svg'}`} />
                                            <p className="pl-2 text-white uppercase text-left w-24 hidden sm:block">Welcome, {store.name}</p>
                                            <svg className="-ml-1 h-5 w-5 hidden sm:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" aria-hidden="true">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div
                                        onClick={() => setUserMenu(false)}
                                        className={`${userMenu ? 'opacity-100 z-40' : 'opacity-0'} bg-white transition-all ease-in-out duration-300 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 focus:outline-none z-0`} 
                                        role="menu" 
                                        aria-orientation="vertical" 
                                        aria-labelledby="user-menu"
                                    >
                                        {/* <p className="px-4 py-2 text-gray-700 uppercase text-xs text-left block sm:hidden">Welcome, <span className="capitalize">{store.name}</span></p> */}
                                        <Link href="/dashboard/profile">
                                            <a 
                                                className={`${router.pathname == '/dashboard/profile' ? `bg-gray-900 text-white hover:bg-gray-900` : 'bg-transparent text-gray-700 hover:text-gray-700 hover:bg-gray-100'} block mx-2 my-1 px-4 py-2 text-sm rounded-md`} 
                                                role="menuitem"
                                            >
                                                Your Profile
                                            </a>
                                        </Link>
                                        <Link href="/dashboard/client">
                                            <a 
                                                className={`${router.pathname == '/dashboard/client' ? `bg-gray-900 text-white hover:bg-gray-900` : 'bg-transparent text-gray-700 hover:text-gray-700 hover:bg-gray-100'} block mx-2 my-1 px-4 py-2 text-sm rounded-md`}
                                                role="menuitem"
                                            >
                                                Client Download
                                            </a>
                                        </Link>
                                        <div onClick={handleLogout} className="cursor-pointer block mx-2 my-1 rounded-md text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none" role="menuitem">
                                            <button className="flex items-center justify-between w-full">
                                                Sign out
                                                <img alt="Sign Out" className="w-4 h-4" src="/logout.svg" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                        </div>
                </div>
                { loggedIn ?
                    <div className={`${mobileMenu && dropDownMenu ? 'h-auto' : mobileMenu ? 'h-40' : ''} h-0 transition-all ease-in-out duration-300 block sm:hidden`} id="mobile-menu">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link href="/dashboard">
                                <a 
                                    className={`${router.pathname == "/dashboard" ? `bg-gray-900` : 'bg-transparent'} block text-white hover:bg-gray-900 transition-all ease-in-out duration-300 uppercase px-3 py-2 rounded-md text-sm font-medium`}
                                    aria-current="page"
                                >
                                    Dashboard
                                </a>
                            </Link>
                            <Link href="/dashboard/file-browser">
                                <a 
                                    className={`${router.pathname == "/dashboard/file-browser" ? `bg-gray-900` : 'bg-transparent'} block text-white hover:bg-gray-900 transition-all ease-in-out duration-300 uppercase px-3 py-2 rounded-md text-sm font-medium`}
                                >
                                    File Browser
                                </a>
                            </Link>
                            <div className="relative">
                                <button onClick={() => setDropDownMenu(!dropDownMenu)} type="button" className={`${dropDownMenu ? 'bg-gray-900' : ''} block w-full text-left transition-all ease-in-out duration-300 uppercase px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-900 focus:outline-none`} id="drop-menu" aria-expanded={dropDownMenu} aria-haspopup="true">
                                    Admin
                                    <svg className="ml-20 mt-2 h-5 w-5 absolute left-0 top-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#fff" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <div className={`${dropDownMenu ? 'h-56 z-40' : 'h-0 opacity-0'}  text-white text-sm transition-all ease-in-out duration-300 w-full focus:outline-none z-0`}
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="drop-menu"
                                >
                                    <div className="py-2" role="none">
                                        <Link href="/dashboard/account-management">
                                            <a 
                                                className={`${router.pathname == "/dashboard/account-management" ? `bg-gray-900` : 'bg-transparent'} block text-white hover:bg-gray-900 transition-all ease-in-out duration-300 px-4 py-2 rounded-md`}
                                                role="menuitem">
                                                Account Management
                                            </a>
                                        </Link>
                                        <Link href="/dashboard/installation-properties">
                                            <a 
                                                className={`${router.pathname == "/dashboard/installation-properties" ? `bg-gray-900` : 'bg-transparent'} block text-white hover:bg-gray-900 transition-all ease-in-out duration-300 px-4 py-2 rounded-md`}
                                                role="menuitem">
                                                Installation Properties
                                            </a>
                                        </Link>
                                        <Link href="/dashboard/metrics">
                                            <a 
                                                className={`${router.pathname == "/dashboard/metrics" ? `bg-gray-900` : 'bg-transparent'} block text-white hover:bg-gray-900 transition-all ease-in-out duration-300 px-4 py-2 rounded-md`}
                                                role="menuitem">
                                                Metrics
                                            </a>
                                        </Link>
                                        <Link href="/dashboard/rule-sets">
                                            <a 
                                                className={`${router.pathname == "/dashboard/rule-sets" ? `bg-gray-900` : 'bg-transparent'} block text-white hover:bg-gray-900 transition-all ease-in-out duration-300 px-4 py-2 rounded-md`}
                                                role="menuitem">
                                                Rule Sets
                                            </a>
                                        </Link>
                                        <Link href="/dashboard/data-message-definitions">
                                            <a 
                                                className={`${router.pathname == "/dashboard/data-message-definitions" ? `bg-gray-900` : 'bg-transparent'} block text-white hover:bg-gray-900 transition-all ease-in-out duration-300 px-4 py-2 rounded-md`}
                                                role="menuitem">
                                                Data Message Definitions
                                            </a>
                                        </Link>
                                        <Link href="/dashboard/support">
                                            <a 
                                                className={`${router.pathname == "/dashboard/support" ? `bg-gray-900` : 'bg-transparent'} block text-white hover:bg-gray-900 transition-all ease-in-out duration-300 px-4 py-2 rounded-md`} 
                                                role="menuitem">
                                                Support Dashboard
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    ''
                }
            </nav>
        </header>
    )
}
export default Nav